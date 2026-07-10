import {resetDemoState} from '../../../../lib/demo-store';

export const runtime = 'nodejs';

export async function POST() {
  return Response.json(
    {ok: true, data: resetDemoState()},
    {headers: {'Cache-Control': 'no-store'}}
  );
}
