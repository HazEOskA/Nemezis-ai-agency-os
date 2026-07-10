import {sendAgencyMessage} from '../../../../lib/demo-store';
import type {MessageActor} from '../../../../lib/agency-domain';

export const runtime = 'nodejs';

const allowedActors: MessageActor[] = ['worker', 'coordinator', 'hr', 'boss'];

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ok: false, error: 'INVALID_JSON'}, {status: 400, headers: {'Cache-Control': 'no-store'}});
  }

  if (!body || typeof body !== 'object') {
    return Response.json({ok: false, error: 'INVALID_MESSAGE'}, {status: 400, headers: {'Cache-Control': 'no-store'}});
  }

  const input = body as {
    body?: unknown;
    actor?: unknown;
    sender?: unknown;
    recipient?: unknown;
    recipientRole?: unknown;
  };

  if (typeof input.body !== 'string' || !input.body.trim()) {
    return Response.json({ok: false, error: 'EMPTY_MESSAGE'}, {status: 400, headers: {'Cache-Control': 'no-store'}});
  }

  if (!allowedActors.includes(input.actor as MessageActor) || typeof input.sender !== 'string' || typeof input.recipient !== 'string' || !allowedActors.includes(input.recipientRole as MessageActor)) {
    return Response.json({ok: false, error: 'UNSUPPORTED_MESSAGE_PARTICIPANT'}, {status: 400, headers: {'Cache-Control': 'no-store'}});
  }

  const result = sendAgencyMessage({
    body: input.body,
    actor: input.actor as MessageActor,
    sender: input.sender,
    recipient: input.recipient,
    recipientRole: input.recipientRole as MessageActor
  });

  return Response.json({ok: true, ...result}, {status: 201, headers: {'Cache-Control': 'no-store'}});
}
