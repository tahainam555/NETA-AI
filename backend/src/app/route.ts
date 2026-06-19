export function GET() {
  return Response.json({
    ok: true,
    service: "NETA AI API",
    message: "Backend is running.",
  });
}
