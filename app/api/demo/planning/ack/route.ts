import {acknowledgePlanning} from '../../../../../lib/demo-store';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ok: false, error: 'INVALID_JSON'}, {status: 400, headers: {'Cache-Control': 'no-store'}});
  }

  if (!body || typeof body !== 'object' || (body as {confirmed?: unknown}).confirmed !== true || typeof (body as {shiftId?: unknown}).shiftId !== 'string') {
    return Response.json({ok: false, error: 'PLANNING_CONFIRMATION_REQUIRED'}, {status: 400, headers: {'Cache-Control': 'no-store'}});
  }

  const result = acknowledgePlanning((body as {shiftId: string}).shiftId);

  if (result.reason === 'SHIFT_NOT_FOUND') {
    return Response.json({ok: false, ...result}, {status: 404, headers: {'Cache-Control': 'no-store'}});
  }

  return Response.json({ok: true, ...result}, {status: 200, headers: {'Cache-Control': 'no-store'}});
}
