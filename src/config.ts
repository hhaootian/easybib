import { workspace, WorkspaceConfiguration } from 'vscode';

export const EXTENSION_NAME = "easybib";
const getConfig = (): WorkspaceConfiguration => workspace.getConfiguration(EXTENSION_NAME);

export function getEntryLimit(): number | undefined {
    return getConfig().get("entryLimit");
}

export function getTitleField(): boolean | undefined {
    return getConfig().get("includeTitleField");
}

export function getAuthorField(): boolean | undefined {
    return getConfig().get("includeAuthorField");
}
