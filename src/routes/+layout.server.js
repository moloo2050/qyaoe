
// @ts-ignore
export async function load({fetch}) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      
    }
  };
  // @ts-ignore
  const response =  await fetch('https://aoe2.pages.dev/players', options).then(res => res.json())
  return {players: await response}
    
}