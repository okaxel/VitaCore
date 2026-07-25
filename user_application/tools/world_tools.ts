import { signRequest } from "@worldcoin/idkit-core/signing";
import { getAppId, getRpId, getSignerKey } from "./env_tools";
import { formatError } from "./error_tools";

type SignDataObject = {
    appId: string,
    rpId: string,
    nonce: string,
    createdAt: number,
    expiresAt: number
}

export function getSignData(): SignDataObject {

    try {
        const { nonce, createdAt, expiresAt } = signRequest({
            signingKeyHex: getSignerKey()
        });
        return {
            appId: getAppId(),
            rpId: getRpId(),
            nonce,
            createdAt,
            expiresAt
        };
    } catch {
        return {
            appId: "",
            rpId: "",
            nonce: "",
            createdAt: 0,
            expiresAt: 0
        };
    }

}

export function sign(): object | string {

    try {
        const { sig, nonce, createdAt, expiresAt } = signRequest({
            signingKeyHex: getSignerKey()
        });
        return {
            appId: getAppId(),
            rpId: getRpId(),
            sig,
            nonce,
            createdAt,
            expiresAt
        };
    } catch (e) {
        return formatError(e)
    }

}