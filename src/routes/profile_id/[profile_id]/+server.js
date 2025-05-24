//import https from "https"
import axios from 'axios'
// @ts-ignore
export async function GET({fetch,params}) {
  //const httpsAgent = new https.Agent({rejectUnauthorized: false});
  const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    
  }}
  //axios.get('https://example.com', { httpsAgent }).then(res => res.json())
  //const  profile_id=params.profile_id
  // @ts-ignore
  const  playeres =  await fetch('https://aoe2.pages.dev/players', options).then(res => res.json())
  // @ts-ignore
  //const  matches =  await fetch('https://data.aoe2companion.com/api/matches?profile_ids='+params.profile_id+'&page=1', options).then(res => res.json())
  // @ts-ignore
  //const  lobbies = await axios.get('https://aoe-api.reliclink.com/community/advertisement/findAdvertisements?title=age2', { httpsAgent })
     //console.log(lobbies.data)
  let bili =""
    // @ts-ignore
  playeres.forEach((r)=>{
      if(r.bilibili!=null){
        bili=bili+"&room_ids="+String(r.bilibili)
      }

    });
    console.log(bili);// @ts-ignore
    const response4 = await axios.get('https://api.live.bilibili.com/xlive/web-room/v1/index/getRoomBaseInfo?req_biz=web_room_componet'+bili)
    console.log(response4.data);
    // @ts-ignore
    
        // @ts-ignore
  playeres.forEach((r)=>{
            // @ts-ignore
            if(r.bilibili!=null){
              // @ts-ignore
              r['bili']=response4.data.data.by_room_ids[r.bilibili]
            }
      
          });   
  return new Response(JSON.stringify({profile_id:params.profile_id,playeres:playeres}))
    
}