export async function onRequest(context) {
  const res = await fetch('https://api.live.bilibili.com/room/v1/Room/get_info?from=room&room_id='+context.params.bili);
  const live = await res.json();
  return new Response(JSON.stringify(live));
}