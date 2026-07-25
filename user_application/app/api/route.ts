import { NextResponse } from "next/server";
import { signRequest } from "@worldcoin/idkit-core/signing";
import { allEnvKeysSet, getAppId, getRpId, getSignerKey } from "../../tools/env_tools";
import { formatError } from "../../tools/error_tools";

function makeSignRequest(): Response {

    try {
        const { sig, nonce, createdAt, expiresAt } = signRequest({
            signingKeyHex: getSignerKey()
        });
        return NextResponse.json({
            status: 200,
            result: {
                appId: getAppId(),
                rpId: getRpId(),
                sig,
                nonce,
                createdAt,
                expiresAt,
            },
            error: null,
        });
    } catch (e) {
        return NextResponse.json({
            status: 500,
            result: null,
            error: formatError(e)});
    }

}

function makeVerifyRequest(): Response {    

    return NextResponse.json({
        status: 200,
        result: null,
        error: null,
    })

}

export async function POST(request: Request): Promise<Response> {

    if (!allEnvKeysSet()) {
        return NextResponse.json({
            status: 500,
            result: null,
            error: "Missing environment variables"});
    }
    const body = await request.json();
    if (!body) {
        return NextResponse.json({
            status: 400,
            result: null,
            error: "Missing request body"});
    }
    if (!body.endpoint) {
        return NextResponse.json({
            status: 400,
            result: null,
            error: "Missing endpoint."});
    }
    switch (body.endpoint) {
        case 'sign':
            return makeSignRequest();
        case 'verify':
            return makeVerifyRequest();
        default:
            return NextResponse.json({
                status: 400,
                result: null,
                error: "Unknown endpoint."});
    }

}