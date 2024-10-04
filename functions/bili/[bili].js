export async function onRequest(context) {
  return await fetch(`https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo?room_id=`+context.params.user+`&protocol=0,1&format=0,1,2&codec=0,1&qn=10000`);
}
