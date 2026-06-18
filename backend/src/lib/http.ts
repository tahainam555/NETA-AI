import { NextResponse } from "next/server";

function corsHeaders(request: Request) {
  const origins = (process.env.FRONTEND_URL ?? "")
    .split(",")
    .map((value) => value.trim().replace(/\/$/, ""))
    .filter(Boolean);
  const requestOrigin = request.headers.get("origin")?.replace(/\/$/, "");
  const allowedOrigin = requestOrigin && origins.includes(requestOrigin) ? requestOrigin : origins[0] ?? "*";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export function jsonResponse(request: Request, body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: corsHeaders(request) });
}

export function optionsResponse(request: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) });
}
