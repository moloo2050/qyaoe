export async function onRequest(context) {
  return await fetch(`https://api.live.bilibili.com/room/v1/Room/get_info?from=room&room_id=${context.params.bil}`);
}
