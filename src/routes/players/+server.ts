// @ts-ignore
export async function GET({fetch}) {
  const options = {method: 'GET', headers: {Authorization: 'Bearer teable_acc6TG3GbDXIOzfr3pS_99GCvZ9joUOxXwi3rF+nVgmt2TfsJMo4ABEioeKwP6c='}}
  // @ts-ignore
  const response =  await fetch('https://app.teable.cn/api/table/tbl1uPOYKdac17kp0zz/record?cellFormat=json&fieldKeyType=name&filterByTql=%7Bfield%7D%20%3D%20%27Completed%27%20AND%20%7Bfield%7D%20%3E%205&take=200&skip=0', options).then(res => res.json())
  // @ts-ignore
  const players=[]
   // @ts-ignore
  response.records.forEach((p)=>{
    p.fields.id=p.id
    players.push(p.fields)})
     // @ts-ignore
  return new Response(JSON.stringify(players))
    
}