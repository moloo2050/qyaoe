export async function onRequestGet(context) {
  const res = await fetch('https://api.live.bilibili.com/room/v1/Room/get_info?from=room&room_id='+context.params.bili);
  console.log(context.params.bili)
  const live = await res.json();
  console.log(live)
  return new Response(JSON.stringify(live));
}
