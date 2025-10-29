// @ts-ignore
export async function GET({fetch}) {
  const options = {method: 'GET', headers: {Authorization: 'Bearer teable_acc6TG3GbDXIOzfr3pS_99GCvZ9joUOxXwi3rF+nVgmt2TfsJMo4ABEioeKwP6c='}}
  // @ts-ignore
  const response =  await fetch('https://app.teable.cn/api/table/tbli6tAxyEx2piskldF/record?cellFormat=json&fieldKeyType=name&viewId=viwcrfVLNvWXGDuWiEC&filterByTql=%7Bfield%7D%20%3D%20%27Completed%27%20AND%20%7Bfield%7D%20%3E%205&take=1000&skip=0', options).then(res => res.json())
  // @ts-ignore
  const matches=[]
  // @ts-ignore
  const match=[]
   // @ts-ignore
  response.records.forEach((p)=>{
    p.fields.id=p.id
    match.push(p.fields)})
     // @ts-ignore
     for (let i = 0; i < match.length; i++) {
      // @ts-ignore
      const element = JSON.parse(match[i].matchinfo);
      // @ts-ignore
      element.tableid = match[i].id
      matches.push(element)
    }   
  return new Response(JSON.stringify(matches))
    
}