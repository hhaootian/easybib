import showList from "./ShowList";

/**
 * Do web scraping with search query.
 * @param searchQuery 
 */
function webScraping(searchQuery) {
    const https = require('https');
    var titleList = new Map();

    var options = {
        host: 'api.semanticscholar.org',
        path: `/graph/v1/paper/search?query=${searchQuery}&fields=title`,
        method: 'GET'
    };

    var request = https.request(options, function(response) {
        response.setEncoding('utf8');
        let htmls = "";

        response.on('data', function (chunk) {
            htmls += chunk;
        });

        response.on('end', function () {
            let exp = '"title": ".*?"';
            const regexp = new RegExp(exp, 'g');
            const matches = htmls.matchAll(regexp);
            let idx = 1;

            for (const match of matches) {
                let htmlPiece = match[0];
                let splits = htmlPiece.split('\"');
                var title = splits[splits.length - 2];
                titleList[idx] = title.valueOf();
                idx ++;
            }

            showList(titleList);

        });
    });

    request.end();

};

export default webScraping;
