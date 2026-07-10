import {createTransportCase} from '../../../../lib/demo-store';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {ok: false, error: 'INVALID_JSON'},
      {status: 400, headers: {'Cache-Control': 'no-store'}}
    );
  }

  if (!body || typeof body !== 'object' || (body as {category?: unknown}).category !== 'transport') {
    return Response.json(
      {ok: false, error: 'UNSUPPORTED_CASE_CATEGORY'},
      {status: 400, headers: {'Cache-Control': 'no-store'}}
    );
  }

  if ((body as {confirmed?: unknown}).confirmed !== true) {
    return Response.json(
      {ok: false, error: 'ACTION_CONFIRMATION_REQUIRED'},
      {status: 400, headers: {'Cache-Control': 'no-store'}}
    );
  }

  if ((body as {source?: unknown}).source !== 'Worker Buddy') {
    return Response.json(
      {ok: false, error: 'UNSUPPORTED_CASE_SOURCE'},
      {status: 400, headers: {'Cache-Control': 'no-store'}}
    );
  }

  const result = createTransportCase();

  return Response.json(
    {ok: true, ...result},
    {status: result.created ? 201 : 200, headers: {'Cache-Control': 'no-store'}}
  );
}
