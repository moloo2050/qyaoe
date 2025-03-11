// @ts-ignore
export async function GET(context) {
  // Create a prepared statement with our query
  const ps = context.env.mDB.prepare("SELECT * from qyplayers");
  const data = await ps.first();

  return Response.json(data);
}