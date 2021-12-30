import { workspace, WorkspaceConfiguration } from 'vscode';

export const EXTENSION_NAME = "easybib";

function getConfig(): WorkspaceConfiguration {
    return workspace.getConfiguration(EXTENSION_NAME);
}

export function getEntryLimit(): number | undefined {
    return getConfig().get("entryLimit");
}

export function getTitleField(): boolean | undefined {
    return getConfig().get("includeTitleField");
}

export function getAuthorField(): boolean | undefined {
    return getConfig().get("includeAuthorField");
}

export function getAbstractField(): boolean | undefined {
    return getConfig().get("includeAbstractField");
}

export function getYearField(): boolean | undefined {
    return getConfig().get("includeYearField");
}

export function getBibName(): string | undefined {
    return getConfig().get("bibName");
}
