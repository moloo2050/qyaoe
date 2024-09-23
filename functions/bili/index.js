export async function onRequest(context) {
  return await fetch(`https://api.live.bilibili.com/xlive/web-ucenter/user/following`);
}
