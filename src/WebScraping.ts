import showList from "./ShowList";

function webScraping(searchQuery) {
    const https = require('https');
    var titleList = new Map();

    var options = {
        host: 'scholar.google.com',
        path: `/scholar?hl=en&q=${searchQuery}`,
        method: 'GET'
    };

    var request = https.request(options, function(response) {
        response.setEncoding('utf8');
        let htmls = "";

        response.on('data', function (chunk) {
            htmls += chunk;
        });

        response.on('end', function () {
            let exp = '<h3 class=".*?" ontouchstart=".*?">' +
            '.*?<a id=.*? href=".*?">.*?</a></h3>';
            const regexp = new RegExp(exp, 'g');
            const matches = htmls.matchAll(regexp);
            let idx = 1;

            for (const match of matches) {
                let htmlPiece = match[0];

                let tags = ["<b>", "</b>", "<i>", "</i>"];
                for (const tag of tags) {
                    htmlPiece = htmlPiece.replaceAll(tag, "");
                }

                // remove "</a></h3>"
                htmlPiece = htmlPiece.substring(0, htmlPiece.length - 9);
                let splits = htmlPiece.split(">");

                var title = splits[splits.length - 1];
                titleList[idx] = title.valueOf();

                idx ++;
            }

            showList(titleList);

        });
    });

    request.end();

};

export default webScraping;
