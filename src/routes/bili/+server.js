// @ts-ignore
export async function GET({fetch}) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: 'Bearer 5eb82f7885311279464834d3aa829cca46de76ce'
      }
    };
    // @ts-ignore
    const response =  await fetch('https://cloud.seatable.cn/api/v2.1/dtable/app-access-token/', options).then(res => res.json())
    const options2 = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        // @ts-ignore
        authorization: 'Bearer '+ await response.access_token
      }
    };
   
    const dtable_uuid= await response.dtable_uuid
    // @ts-ignore
    const response2 =   await fetch('https://cloud.seatable.cn/api-gateway/api/v2/dtables/'+dtable_uuid+'/rows/?table_name=qyplayers&convert_keys=true', options2).then(res => res.json())
    // @ts-ignore
    let bili =""
    // @ts-ignore
    response2.rows.forEach((r)=>{
      if(r.bilibili!=null){
        bili=bili+"&room_ids="+String(r.bilibili)
      }

    });
    console.log(bili);// @ts-ignore
    const response4 = await fetch('https://api.live.bilibili.com/xlive/web-room/v1/index/getRoomBaseInfo?req_biz=web_room_componet'+bili).then(res => res.json())
    console.log(response4);
    // @ts-ignore
    
        // @ts-ignore
        response2.rows.forEach((r)=>{
            // @ts-ignore
            if(r.bilibili!=null){
              // @ts-ignore
              r['bili']=response4.data.by_room_ids[r.bilibili]
            }
      
          });
     
    
    return new Response(JSON.stringify({bili: await response2.rows}))
      
  }