// @ts-ignore
export async function GET({platform,fetch}) {
    
    let result = await platform.env.mDB.prepare(
      "SELECT * FROM qyplayers",
    ).run();
    let bili=""
    // @ts-ignore
    result.results.forEach((r)=>{
      if(r.bilibili!=null){
        bili=bili+"&room_ids="+String(r.bilibili)
      }

    });
    // @ts-ignore
    const response =  await fetch('https://api.live.bilibili.com/xlive/web-room/v1/index/getRoomBaseInfo?req_biz=web_room_componet'+bili).then(res => res.json())
    return new Response(JSON.stringify(await response));
  }