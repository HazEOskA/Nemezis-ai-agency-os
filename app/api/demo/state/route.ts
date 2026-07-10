import {getDemoState} from '../../../../lib/demo-store';

export const runtime = 'nodejs';

export async function GET() {
  return Response.json(
    {ok: true, data: getDemoState()},
    {headers: {'Cache-Control': 'no-store'}}
  );
}
