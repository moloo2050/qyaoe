export async function onRequest(context) {
  // Create a prepared statement with our query
  const ps = context.env.qyaoe.prepare("SELECT * from qyplayers");
  const data = await ps.all();

  return Response.json(data);
}
