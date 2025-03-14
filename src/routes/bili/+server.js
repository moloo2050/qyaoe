// @ts-ignore
export async function GET({platform,fetch}) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };
    let result = await platform.env.mDB.prepare(
      "SELECT * FROM qyplayers",
    ).run();
    console.log(result);
    let bili=""
    // @ts-ignore
    result.results.forEach((r)=>{
      if(r.bilibili!=null){
        bili=bili+"&room_ids="+r.bilibili
      }

    });
    // @ts-ignore
    const response =  await fetch('https://api.live.bilibili.com/xlive/web-room/v1/index/getRoomBaseInfo?req_biz=web_room_componet'+bili).then(res => res.json())
    console.log(await response);
    return new Response(JSON.stringify(await response));
  }