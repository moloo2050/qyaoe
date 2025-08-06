// @ts-ignore
export async function GET({fetch}) {
  const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    
  }}
  const matches=[]
  // @ts-ignore
  const match =  await fetch('https://aoe2.pages.dev/newmatches', options).then(res => res.json())
  for (let i = 0; i < match.length; i++) {
    const element = JSON.parse(match[i].matchelo);
    matches.push(element)
  }// @ts-ignore
  
  return new Response(JSON.stringify({matches: matches}))
    
}