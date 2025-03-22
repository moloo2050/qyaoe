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
  const response3 =   await fetch('https://cloud.seatable.cn/api-gateway/api/v2/dtables/'+dtable_uuid+'/rows/?table_name=news&convert_keys=true', options2).then(res => res.json())
  return new Response(JSON.stringify({players: await response2.rows,news: await response3.rows}))
    
}