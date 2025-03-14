<script>
  import "../app.css";
  import { Footer, FooterCopyright, FooterLinkGroup, FooterLink,DarkMode } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import {matches,players,qyplayers,onlobbyes,qyonslotes,profile_ids,onmatches,connection} from '$lib/store.js';
  let { data } = $props();
  // @ts-ignore
  let teableid=[]
  $matches=[]
  $players=data.players
	$players.forEach((p)=>{
        if(p.status==1 || p.status==2){
          $profile_ids.push(p['profile_id'])
          $profile_ids=$profile_ids
          }
        if(p.status==1){
          $qyplayers.push(p)
          $qyplayers=$qyplayers
        }})
  // @ts-ignore
  let ws;
  let Matchesws;
  // @ts-ignore
  let onnewMatches=[]
  // @ts-ignore
  let onlobbyMatches=[]
  // @ts-ignore
  let qyonlobbyMatches=[]
  onMount(() => {
      ws = new WebSocket('wss://socket.aoe2companion.com/listen?handler=lobbies');
      ws.addEventListener('open', () => {
        console.log('大厅已连接');
        $connection=true
      });
      ws.addEventListener('message', (event) => {
        let received_msg = JSON.parse(event.data)
        // @ts-ignore
        received_msg.forEach((m)=>{
        if (m.type=="lobbyAdded"){
        onlobbyMatches.push(m.data)
        // @ts-ignore
        onlobbyMatches=onlobbyMatches
        }
        if (m.type=="lobbyUpdated"){
           // @ts-ignore
           let index =onlobbyMatches.findIndex(item => item.matchId == m.data.matchId)
           for (const x of Object.keys(m.data))
           {
            // @ts-ignore
            onlobbyMatches[index][x]=m.data[x]
           }
        }
        // @ts-ignore
        if (m.type=="slotAdded" &&  ((m.data.slot==0 && $profile_ids.includes(m.data.profileId)) || (qyonlobbyMatches.length>0 && qyonlobbyMatches.some(item=> item.matchId == m.data.matchId)))){
           $qyonslotes=[...$qyonslotes,m.data]
           if(m.data.slot==0){
            // @ts-ignore
            let index =onlobbyMatches.findIndex(item => item.matchId == m.data.matchId)
            // @ts-ignore
            qyonlobbyMatches=[... qyonlobbyMatches,onlobbyMatches[index]]

           }
       }
       if (m.type=="slotUpdated" && qyonlobbyMatches.length>0){
           let index =$qyonslotes.findIndex(item => item.matchId == m.data.matchId && item.slot == m.data.slot )
           if(index !=-1){
           for (const x in m.data)
           {
            $qyonslotes[index][x]=m.data[x]
           }}
       }
       if (m.type=="slotRemoved" && qyonlobbyMatches.length>0){
          let index =$qyonslotes.findIndex(item => item.matchId == m.data.matchId && item.slot == m.data.slot)
          if(index !=-1){
          $qyonslotes.splice(index, 1)
          $qyonslotes=$qyonslotes
        }
       }
       
       if (m.type=="lobbyRemoved"){
           // @ts-ignore
           let index =onlobbyMatches.findIndex(item => item.matchId == m.data.matchId)
           // @ts-ignore
           onlobbyMatches.splice(index, 1)
           // @ts-ignore
           onlobbyMatches=onlobbyMatches
           if(qyonlobbyMatches.length>0){
            // @ts-ignore
            let index1 =qyonlobbyMatches.findIndex(item => item.matchId == m.data.matchId)
            // @ts-ignore
            if(index1!=-1) {qyonlobbyMatches.splice(index1, 1)
              // @ts-ignore
              qyonlobbyMatches=qyonlobbyMatches
            }
           }
           
       }
       })
       // @ts-ignore
        qyonlobbyMatches.forEach((match)=>{
          match.players=[]
        for(var i=0;i<$qyonslotes.length;i++){
          if($qyonslotes[i].matchId==match.matchId){ match['players']= [...match['players'],$qyonslotes[i]]}
        }
      });
      // @ts-ignore
      $onlobbyes=qyonlobbyMatches
      });
    ws.addEventListener('close', () => {
        console.log('大厅已关闭');
        $connection=false
      });
    });  

  onMount(() => {
      Matchesws = new WebSocket("wss://socket.aoe2companion.com/listen?handler=ongoing-matches&profile_ids="+$profile_ids.toString());
      Matchesws.addEventListener('open', () => {
        console.log('进行的比赛已连接');
      });
      Matchesws.addEventListener('message', (event) => {
        let received_msg = JSON.parse(event.data)
       //console.log(received_msg)
       for (const m of Object.keys(received_msg)){
       if (received_msg[m].type=="matchAdded"){
           onnewMatches.push(received_msg[m].data)
           // @ts-ignore
           onnewMatches=onnewMatches
       }
       
       if (received_msg[m].type=="matchRemoved" && onnewMatches.length>0){
           // @ts-ignore
           let index =onnewMatches.findIndex(item => item.matchId == received_msg[m].data.matchId)
           // @ts-ignore
           if(index!=-1) {onnewMatches.splice(index, 1)}
           // @ts-ignore
           onnewMatches=onnewMatches
       }
       }
       // @ts-ignore
       $onmatches=onnewMatches
       })
    Matchesws.addEventListener('close', () => {
        console.log('已关闭');
      });
    });  
    // @ts-ignore
    onMount(async () => {
      const interval = setInterval(async () => {
      const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        }
      };  
      const response = await fetch('https://aoe2.pages.dev/players', options);
		  let objplayers =await response.json()
      // @ts-ignore
      let objprofile_ids=[]
      // @ts-ignore
      let objqyplayers=[]
      // @ts-ignore
      objplayers.forEach((p)=>{
        if(p.status==1 || p.status==2){
          objprofile_ids.push(p['profile_id'])
          // @ts-ignore
          objprofile_ids=objprofile_ids
          }
        if(p.status==1){
          objqyplayers.push(p)
          // @ts-ignore
          objqyplayers=objqyplayers
        }})
        // @ts-ignore
        $qyplayers=objqyplayers 
        // @ts-ignore
        $profile_ids=objprofile_ids
    }, 60000)
    return () => {
      clearInterval(interval)
    }
    })

</script>
<div class="column">
  <h1 class="text-3xl font-bold underline">
    情谊帝国
  </h1>
  
  <span class="theme">
      <DarkMode />
  </span>
</div>

<!-- svelte-ignore slot_element_deprecated -->
<main class="mt-2">
	<slot />
  <Footer class="float-left">
    <div class="sm:flex sm:items-center sm:justify-between ">
    <FooterCopyright href="/" by="Flowbite™" year={2024} />
    </div>
  </Footer>
</main>


<style>
.theme {
	cursor: pointer;
	position: absolute;
	right: 10px;
	top: 0;
  }
.column {
      margin: 20px;
    }
</style>