
// @ts-ignore
export async function load({fetch}) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      
    }
  };
  // @ts-ignore
  const response =  await fetch('/players', options).then(res => res.json())
  return {players: await response}
    
}