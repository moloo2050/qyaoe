// @ts-ignore
export async function GET({fetch}) {
  const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    
  }}
  const matches=[]
  // @ts-ignore
  const match =  await fetch('https://aoe2.pages.dev/matches', options).then(res => res.json())
  for (let i = 0; i < match.length; i++) {
    const element = JSON.parse(match[i].matchelo);
    matches.push(element)
  }// @ts-ignore
  const matches1000 =  await fetch('https://aoe2.pages.dev/matches1000', options).then(res1 => res1.json())
  for (let i = 0; i < matches1000.length; i++) {
    const element = JSON.parse(matches1000[i].matchelo);
    matches.push(element)
  }// @ts-ignore
  const matches2000 =  await fetch('https://aoe2.pages.dev/matches2000', options).then(res2 => res2.json())
  for (let i = 0; i < matches2000.length; i++) {
    const element = JSON.parse(matches2000[i].matchelo);
    matches.push(element)
  }
  // @ts-ignore
  const matches3000 =  await fetch('https://aoe2.pages.dev/matches3000', options).then(res3 => res3.json())
  
  
  for (let i = 0; i < matches3000.length; i++) {
    const element = JSON.parse(matches3000[i].matchelo);
    matches.push(element)
  }
  return new Response(JSON.stringify({matches: matches}))
    
}