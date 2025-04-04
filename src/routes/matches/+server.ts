import type { RequestHandler } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ request, platform }) {
  let result = await platform.env.mDB.prepare(
    "SELECT * FROM match ORDER BY id LIMIT 500",
  ).run();
  return new Response(JSON.stringify(result.results));}