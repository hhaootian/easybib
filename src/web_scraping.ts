import * as vscode from 'vscode';
import showList from "./show_list";
import * as config from './config';

/**
 * Do web scraping with search query.
 * @param searchQuery 
 */
function webScraping(searchQuery) {
    const https = require('https');
    var titleList = new Map();
    var authorList = new Map();
    var venueList = new Map();

    let fields = getFields();
    if (fields === ""){
        return;
    }

    var options = {
        host: 'api.semanticscholar.org',
        path: `/graph/v1/paper/search?query=${searchQuery}` + 
                  `&fields=${fields}&limit=${config.getEntryLimit()}`,
        method: 'GET'
    };

    var request = https.request(options, function(response) {
        response.setEncoding('utf8');
        let htmls = "";

        response.on('data', function (chunk) {
            htmls += chunk;
        });

        response.on('end', async function () {
            let data = JSON.parse(htmls);

            for (let idx = 0; idx < data['data'].length; idx++) {
                titleList[idx] = data['data'][idx]['title'].valueOf();
                let paperID = data['data'][idx]['paperId'].valueOf();

                var options = {
                    host: 'api.semanticscholar.org',
                    path: `/graph/v1/paper/${paperID}?fields=authors,venue`,
                    method: 'GET'
                };

                let returns = await getDetails(options);
                let splits = String(returns).split("|");
                authorList[idx] = splits[0];
                venueList[idx] = splits[1];
            }

            showList(titleList, authorList, venueList);

        });
    });

    request.end();

};

/**
 * Get search fields.
 * @returns 
 */
function getFields() {
    let fields = "";
    if (config.getTitleField()) {
        fields += "title";
    } else {
        vscode.window.showWarningMessage(
            "It is suggested to include the title field."
        );
    }

    if (config.getAuthorField()) {
        if (fields !== "") {
            fields += ",";
        }
        fields += "authors";
    }

    if (config.getAbstractField()) {
        if (fields !== "") {
            fields += ",";
        }
        fields += "abstract";
    }

    if (config.getYearField()) {
        if (fields !== "") {
            fields += ",";
        }
        fields += "year";
    }

    if (fields === "") {
        vscode.window.showErrorMessage(
            "Empty search field. Please check config!"
        );
    }

    return fields;
}


function getDetails(options) {
    return new Promise((resolve, reject) => {
        const https = require('https');

        let request = https.request(options, function(response) {
            response.setEncoding('utf8');
            let htmls = "";

            response.on('data', function (chunk) {
                htmls += chunk;
            });

            response.on('end', function () {
                try {
                    let data = JSON.parse(htmls);
                    let authors = "";
                    let venue = data['venue'];

                    for (let idx = 0; idx < data['authors'].length; idx++) {
                        authors += data['authors'][idx]['name'] + "; ";
                    }
                    authors = authors.substring(0, authors.length - 2);

                    resolve(authors + "|" + venue);
                } catch (e) {
                    reject(e);
                }
            });

            response.on('error', (err) => {
                reject(err);
            });

        });

        request.end();
    });
}


export default webScraping;
