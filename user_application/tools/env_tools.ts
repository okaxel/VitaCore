export function allEnvKeysSet(): boolean {

    let value = process.env.SIGNER_KEY;
    if (value === undefined || value === null || value.trim() === "") {
        return false;
    }
    value = process.env.APP_ID;
    if (value === undefined || value === null || value.trim() === "") {
        return false;
    }
    value = process.env.RP_ID;
    if (value === undefined || value === null || value.trim() === "") {
        return false;
    }
    value = process.env.ACTION_ID;
    if (value === undefined || value === null || value.trim() === "") {
        return false;
    }
    return true;

}

export function getActionId(): string {

    return process.env.ACTION_ID || "";

}

export function getAppId(): string {

    return process.env.APP_ID || "";

}

export function getRpId(): string {

    return process.env.RP_ID || "";

}

export function getSignerKey(): string {

    return process.env.SIGNER_KEY || "";

}

