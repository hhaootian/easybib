import axios from "axios";
import writeBib from "./write_bib";
import pasteCursor from "./paste_cursor";

/**
 * Get DOI with given title.
 * @param title 
 */
function getDOI(title: string) {
    let crossref = "https://api.crossref.org/works?query.bibliographic=";
    let url = crossref + `"${title}"`;

    axios.get(url)
    .then(function (response) {
        let message = response.data['message']['items'][0];
        let doi = message['DOI'];

        // if it is preprint
        // try to use journal DOI instead
        if (message.hasOwnProperty("relation") && 
            message['relation'].hasOwnProperty("is-preprint-of")
        ) {
            doi = message['relation']['is-preprint-of']['0']['id'];
        }

        doiToBib(doi);

    });
}

/**
 * Convert DOI to BibTeX.
 * @param doi 
 */
function doiToBib(doi: string) {
        let url = `http://api.crossref.org/works/${doi}/` +
                      `transform/application/x-bibtex`;

        axios.get(url, {timeout: 500})
        .then(function (response) {
            let bibtex = response.data;
            bibtex = bibtex.replace("%2F", "/");
            let citekey = bibtex.split(",")[0].split("{")[1];

            pasteCursor(citekey);
            writeBib(bibtex);
        })
        .catch(function () {
            // if timeout keep refreshing
            doiToBib(doi);
        });
}

export default getDOI;
