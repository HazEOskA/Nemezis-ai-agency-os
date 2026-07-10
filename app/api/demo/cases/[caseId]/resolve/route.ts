import {resolveTransportCase} from '../../../../../../lib/demo-store';

export const runtime = 'nodejs';

export async function POST(
  request: Request,
  {params}: {params: Promise<{caseId: string}>}
) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {ok: false, error: 'INVALID_JSON'},
      {status: 400, headers: {'Cache-Control': 'no-store'}}
    );
  }

  if (!body || typeof body !== 'object' || (body as {confirmed?: unknown}).confirmed !== true) {
    return Response.json(
      {ok: false, error: 'ACTION_CONFIRMATION_REQUIRED'},
      {status: 400, headers: {'Cache-Control': 'no-store'}}
    );
  }

  const {caseId} = await params;
  const result = resolveTransportCase(caseId);

  if (result.reason === 'CASE_NOT_FOUND') {
    return Response.json(
      {ok: false, error: result.reason, data: result.state},
      {status: 404, headers: {'Cache-Control': 'no-store'}}
    );
  }

  return Response.json(
    {ok: true, ...result},
    {status: 200, headers: {'Cache-Control': 'no-store'}}
  );
}
