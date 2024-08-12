export async function onRequestGet(context) {
  const res = await fetch('https://api.live.bilibili.com/room/v1/Room/get_info?from=room&room_id=22752755');
  const live = await res.json();
  console.log(live)
  return new Response(JSON.stringify(live));
}
