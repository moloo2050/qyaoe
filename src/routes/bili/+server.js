// @ts-ignore
export async function GET({platform,fetch}) {
    
  const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    }
  };  
    const res1 = await fetch('https://aoe2.pages.dev/players', options);
    let objplayers =await res1.json()
    let bili=""
    // @ts-ignore
    objplayers.forEach((r)=>{
      if(r.bilibili!=null){
        bili=bili+"&room_ids="+String(r.bilibili)
      }

    });
    // @ts-ignore
    const response =  await fetch('https://api.live.bilibili.com/xlive/web-room/v1/index/getRoomBaseInfo?req_biz=web_room_componet'+bili).then(res => res.json())
    return new Response(JSON.stringify(await response));
  }