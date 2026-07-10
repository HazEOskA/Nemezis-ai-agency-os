import {reviewLeaveRequest} from '../../../../../lib/demo-store';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ok: false, error: 'INVALID_JSON'}, {status: 400, headers: {'Cache-Control': 'no-store'}});
  }

  if (!body || typeof body !== 'object') {
    return Response.json({ok: false, error: 'INVALID_LEAVE_REVIEW'}, {status: 400, headers: {'Cache-Control': 'no-store'}});
  }

  const input = body as {requestId?: unknown; status?: unknown; confirmed?: unknown};
  if (typeof input.requestId !== 'string' || (input.status !== 'approved' && input.status !== 'rejected') || input.confirmed !== true) {
    return Response.json({ok: false, error: 'LEAVE_REVIEW_CONFIRMATION_REQUIRED'}, {status: 400, headers: {'Cache-Control': 'no-store'}});
  }

  const result = reviewLeaveRequest(input.requestId, input.status);
  if (result.reason === 'LEAVE_REQUEST_NOT_FOUND') {
    return Response.json({ok: false, ...result}, {status: 404, headers: {'Cache-Control': 'no-store'}});
  }

  return Response.json({ok: true, ...result}, {status: 200, headers: {'Cache-Control': 'no-store'}});
}
