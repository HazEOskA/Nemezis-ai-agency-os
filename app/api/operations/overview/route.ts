import {getDemoState} from '../../../../lib/demo-store';

export const runtime = 'nodejs';

export async function GET() {
  const state = getDemoState();

  return Response.json(
    {
      ok: true,
      data: {
        agency: state.agency,
        kernel: state.kernel,
        operations: state.operations,
        owner: state.owner,
        case: state.case,
        events: state.events
      }
    },
    {headers: {'Cache-Control': 'no-store'}}
  );
}
