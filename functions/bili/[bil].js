export async function onRequest(context) {
   const res = await fetch(`https://api.live.bilibili.com/room/v1/Room/get_info?from=room&room_id=${context.params.bil}`);
  const data = await res.json();
  const info = JSON.stringify(data, null, 2);
  return new Response(info);
}
