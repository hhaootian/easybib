import * as config from './config';
import * as vscode from 'vscode';

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

export default getFields;
