import { NextResponse } from "next/server";
import { sign } from "../../tools/world_tools";
import { allEnvKeysSet } from "../../tools/env_tools";

function makeSignRequest(): Response {

    const result = sign();
    if (typeof result === "string") {
        return NextResponse.json({
            status: 500,
            result: null,
            error: result});
    }
    return NextResponse.json({
        status: 200,
        result: result,
        error: null,
    })

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