export async function GET() {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return Response.json(
      { ok: false, error: "BACKEND_URL is missing" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`${backendUrl}/health`, { cache: "no-store" });

    return Response.json(
      { ok: response.ok },
      { status: response.ok ? 200 : 503 },
    );
  } catch {
    return Response.json({ ok: false }, { status: 503 });
  }
}
