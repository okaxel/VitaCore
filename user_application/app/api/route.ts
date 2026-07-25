import { NextResponse } from "next/server";
import { sign } from "../../tools/world_tools";
import { allEnvKeysSet, getActionId, getRpId } from "../../tools/env_tools";

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

async function makeVerifyRequest(proof: object): Promise<Response> {    

    const action = getActionId();
    const rp_id = getRpId();
    const result = await fetch(`https://developer.world.org/api/v4/verify/${rp_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...proof,
        action,
      }),
    });
    const data = await result.json();
    if (!result.ok) {
        return NextResponse.json({
            status: 500,
            result: null,
            error: data});
    }
    if (!data.hasOwnProperty('nullifier_hash')) {
        return NextResponse.json({
            status: 500,
            result: null,
            error: data});
    }
    return NextResponse.json({
        status: 200,
        result: {userId: data.nullifier_hash},
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
            if (!body.proof) {
                return NextResponse.json({
                    status: 400,
                    result: null,
                    error: "Missing proof."});
            }
            return await makeVerifyRequest(body.proof);
        default:
            return NextResponse.json({
                status: 400,
                result: null,
                error: "Unknown endpoint."});
    }

}