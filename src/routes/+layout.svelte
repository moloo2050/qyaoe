<script>
  import "../app.css";
  import { Footer, FooterCopyright, FooterLinkGroup, FooterLink,DarkMode } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import {news,matches,matchids,players,qyplayers,qyonlobbyes,onlobbyes,qyonslotes,profile_ids,onmatches,connection} from '$lib/store.js';
    // @ts-ignore
  function ofs(profile_id){
    // @ts-ignore
    let a= $players.find((ele) => {
          return ele.profile_id==profile_id
        })
        if (a==undefined){
              return 1600
          }
          else{
              return a
          }
    }
  // @ts-ignore
  function matchelo(player,a,b,kFactor = 32) {
    if(player['won'] === null) {
    return [0,0]
    } else if (player['won'] === true){
    return elo([a,b],[1,0],kFactor)
    } else {
    return elo([b,a],[0,1],kFactor)
    }
    }
  // @ts-ignore
  const elo = ([a, b], [c,d],kFactor = 32) => {
  // @ts-ignore
  const expectedScore = (self, opponent) => 1 / (1 + 10 ** ((opponent - self) / 400));
  // @ts-ignore
  const newRating = (rating, i) => kFactor * (i - expectedScore(i ? a : b, i ? b : a));
  return [Math.round(newRating(a, c)/4), Math.round(newRating(b, d)/4)];
  };  
  // @ts-ignore
function eloinsertLiveGames (Matches) {     
        // @ts-ignore
        Matches.forEach((match) =>  {
        const teams = match['teams1']
        const team1 = teams[0]
        const team2 = teams[1]
        const team1Player1 = teams[0][0]
        const team1Player2 = teams[0][1]
        const team1Player3 = teams[0][2]
        const team1Player4 = teams[0][3]
        const team2Player1 = teams[1][0]
        const team2Player2 = teams[1][1]
        const team2Player3 = teams[1][2]
        const team2Player4 = teams[1][3]
        if ((new Date(match['finished']).getTime()-new Date(match['started']).getTime())<600000 || team1Player1.won==null) {
        } else {
        let team1EloAvg = 0
        let team2EloAvg = 0 
        let team1Elo = 0
        let team2Elo = 0 
        // @ts-ignore
        team1.forEach((player) =>  {
            if(ofs(player.profile_id).status==2 || ofs(player.profile_id).status==4){
                let id = ofs(player.profile_id).qrating
                player.profile_id = id
                team1EloAvg += Number(ofs(player.profile_id).newqrating)
            }
            else{
                team1EloAvg += Number(ofs(player.profile_id).newqrating)
            }
             })
        team1EloAvg = Math.floor(team1EloAvg)
        // @ts-ignore
        team2.forEach((player) =>  {
            if(ofs(player.profile_id).status==2 || ofs(player.profile_id).status==4){
                let id = ofs(player.profile_id).qrating
                player.profile_id = id
                team2EloAvg += Number(ofs(player.profile_id).newqrating)
            }
            else{
                team2EloAvg += Number(ofs(player.profile_id).newqrating)
            }
             })
           
        team2EloAvg = Math.floor(team2EloAvg)
          let elo = matchelo(team1Player1,team1EloAvg,team2EloAvg,128)
          team1Elo = Number(elo[0])
          team2Elo = Number(elo[1])
          // @ts-ignore
          team1.forEach((player) =>  { 
           
            if(team1Elo>=0){
             
             player.qelo=Number((team1Elo*4*(ofs(player.profile_id).newqrating/team1EloAvg)).toFixed(0))
             
             player.qrating=Number(ofs(player.profile_id).newqrating),
             player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
            }else if(team1Elo<0){
             player.qelo=Number((team1Elo*4*(ofs(player.profile_id).newqrating/team1EloAvg)).toFixed(0))
             player.qrating=Number(ofs(player.profile_id).newqrating),
             player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
            }
            ofs(player.profile_id).newqrating=player.newqrating
          })
          // @ts-ignore
          team2.forEach((player) =>  {
             
              if(team2Elo>=0){
             player.qelo=Number((team2Elo*4*(ofs(player.profile_id).newqrating/team2EloAvg)).toFixed(0))
             player.qrating=Number(ofs(player.profile_id).newqrating),
             player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
            }else if(team2Elo<0){
             player.qelo=Number((team2Elo*4*(ofs(player.profile_id).newqrating/team2EloAvg)).toFixed(0))
             player.qrating=Number(ofs(player.profile_id).newqrating),
             player.newqrating=Number(ofs(player.profile_id).newqrating+player.qelo)
            }
            ofs(player.profile_id).newqrating=player.newqrating
          })
        
        
        let team1won = 0
        let team2won = 0
        if (team1[0].won==true){
          team1won = 1
          team2won = 0
        }
        else if(team1[0].won==false)
        {
          team1won = 0
          team2won = 1
        }
        
        // @ts-ignore
        team1.forEach((player) => {
          ofs(player.profile_id).newqrating=player.newqrating,
          ofs(player.profile_id).wins+=team1won,
          ofs(player.profile_id).loses+=team2won,
          ofs(player.profile_id).games=ofs(player.profile_id).wins+ofs(player.profile_id).loses
          ofs(player.profile_id).matchID= match.matchId
          ofs(player.profile_id).date= match.started })
        // @ts-ignore
        team2.forEach((player) =>  {
          ofs(player.profile_id).newqrating=player.newqrating,
          ofs(player.profile_id).wins+=team2won,
          ofs(player.profile_id).loses+=team1won,
          ofs(player.profile_id).games=ofs(player.profile_id).wins+ofs(player.profile_id).loses
          ofs(player.profile_id).matchID= match.matchId
          ofs(player.profile_id).date= match.started  })
          
      }      
    });}
  let { data } = $props();
  // @ts-ignore
  let newmatches=[]
  let oldmathcid=0
  // @ts-ignore
  onMount(async () => {
      const options = {
      method: 'GET',
      headers: {
      accept: 'application/json', 
      }
      };
  // @ts-ignore
  const response =  await fetch('/news', options).then(res => res.json())
  const response1=  await fetch('/matches', options).then(res => res.json())
  // @ts-ignore
  function checkAdult(match) {
      return  match.teams[0][0].qelo 
    }
    
  $matches =response1
  //console.log($matches)
  // @ts-ignore
  function multiplyArrayElement(match) {
    return match.match_id;
  }
   
  $matchids=$matches.map(multiplyArrayElement);
  //console.log($matchids)
  $qyplayers.sort(function(a, b){return b.matchID-a.matchID})
  oldmathcid=$qyplayers[0].matchID
  $news=response
    })
  $profile_ids=[]
  $qyplayers=[]
  $players=data.players
	$players.forEach((p)=>{
        if(p.status==1 || p.status==2 || p.status==3){
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
  let onslotes=[]
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
        if (m.type=="slotAdded"){
          // @ts-ignore
          onslotes=[...onslotes,m.data]
          // @ts-ignore
          if((m.data.slot==0 && $profile_ids.includes(m.data.profileId)) || (qyonlobbyMatches.length>0 && qyonlobbyMatches.some(item=> item.matchId == m.data.matchId))){
          $qyonslotes=[...$qyonslotes,m.data]
           if(m.data.slot==0){
            // @ts-ignore
            let index =onlobbyMatches.findIndex(item => item.matchId == m.data.matchId)
            // @ts-ignore
            qyonlobbyMatches=[... qyonlobbyMatches,onlobbyMatches[index]]

           }
          }
        }
       if (m.type=="slotUpdated"){
        // @ts-ignore
        let index2 =onslotes.findIndex(item => item.matchId == m.data.matchId && item.slot == m.data.slot )
           if(index2 !=-1){
           for (const x in m.data)
           {
            // @ts-ignore
            onslotes[index2][x]=m.data[x]
           }}
        if ( qyonlobbyMatches.length>0){
           let index =$qyonslotes.findIndex(item => item.matchId == m.data.matchId && item.slot == m.data.slot )
           if(index !=-1){
           for (const x in m.data)
           {
            $qyonslotes[index][x]=m.data[x]
           }}
       }
      }
       if (m.type=="slotRemoved" ){
        // @ts-ignore
        let index3 =onslotes.findIndex(item => item.matchId == m.data.matchId && item.slot == m.data.slot)
          if(index3 !=-1){
          // @ts-ignore
          onslotes.splice(index3, 1)
          // @ts-ignore
          onslotes=onslotes}
       
       if (qyonlobbyMatches.length>0){
          let index =$qyonslotes.findIndex(item => item.matchId == m.data.matchId && item.slot == m.data.slot)
          if(index !=-1){
          $qyonslotes.splice(index, 1)
          $qyonslotes=$qyonslotes
        }
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
      onlobbyMatches.forEach((match)=>{
          match.players=[]
        for(var i=0;i<onslotes.length;i++){
          // @ts-ignore
          if(onslotes[i].matchId==match.matchId){ match['players']= [...match['players'],onslotes[i]]}
        }
      });
      // @ts-ignore
      $qyonlobbyes=qyonlobbyMatches
      // @ts-ignore
      $onlobbyes=onlobbyMatches
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
      
      const response = await fetch("https://data.aoe2companion.com/api/matches?profile_ids="+$profile_ids.toString()+"&search=&leaderboard_ids=unranked&page=1", options);
		  let result =await response.json()
      let resultmatches=result.matches
       console.log(resultmatches)
      // @ts-ignore
      let  psumprofile_id=[]
       // @ts-ignore
      resultmatches.sort(function(a, b){return a.matchId- b.matchId})
       // @ts-ignore
      resultmatches.forEach((match) => {
      if(match.matchId){
                // @ts-ignore
                var p=[]
                match['match_id']=match.matchId
                match['map_image_url']=match.mapImageUrl
                match['map_name']=match.mapName
                match['leaderboard_id']=match.leaderboardId
                match.players=[]
                match.teams1=[]
                match.teams1[0]=[]
                match.teams1[1]=[]
                if( match.teams.length==2){
                // @ts-ignore
                match.teams[0].players.forEach((player)=>{
                  player['profile_id']=player['profileId']
                  player['civ_name']=player['civName']
                  match.players.push(player)
                  match.teams1[0].push(player)
                 });
                // @ts-ignore
                match.teams[1].players.forEach((player)=>{
                  player['profile_id']=player['profileId']
                  player['civ_name']=player['civName']
                  match.players.push(player)
                  match.teams1[1].push(player)}
                   ); 
                   match.teams=match.teams1
                 }
                 if( match.teams.length==1){
                   // @ts-ignore
                   match.teams[0].players.forEach((player)=>{
                     player['profileId']=player.profile_id
                     player['civName']=player.civ_name
                     match.players.push(player)
                     match.teams1[0].push(player)
                    });
                   
                    }  
                // @ts-ignore
                match.players.forEach((player)=>{
                    // @ts-ignore
                    if($profile_ids.includes(player.profile_id)){
                       p.push(1)
                       // @ts-ignore
                       p=p
                    if(ofs(player.profile_id).status==2 || ofs(player.profile_id).status==4){
                        let id = ofs(player.profile_id).qrating
                        psumprofile_id.push(id) 
                        // @ts-ignore
                        psumprofile_id=psumprofile_id
                    }
                    else{
                        psumprofile_id.push(player.profile_id)
                        // @ts-ignore
                        psumprofile_id=psumprofile_id
                    }
                       }
                     else{
                       p.push(0)
                       // @ts-ignore
                       p=p
                       }
                    });
                
               let psum =0
               // @ts-ignore
               p.forEach((pnumber)=>{psum +=pnumber})
               // @ts-ignore
               if(psum==8 && (new Date(match['finished']).getTime()-new Date(match['started']).getTime())>600000 && $matchids.includes(match.matchId)==false && match.matchId>oldmathcid){
                      $matchids.push(match.matchId)
                      $matchids=$matchids
                      newmatches.push(match)
                      // @ts-ignore
                      newmatches=newmatches
                      eloinsertLiveGames([match])
                      oldmathcid=match.matchId
                         }
                    // @ts-ignore
               if(psum==8 && match.finished!=null && $matchids.includes(match.matchId)==false){
                          // @ts-ignore
                       $matchids.push(match.matchId)
                       $matchids=$matchids
                             }
                        }
         })
         
      if(newmatches.length>0){
         // @ts-ignore
         console.log(newmatches)
         // @ts-ignore
         $matches = $matches.concat(newmatches)
         newmatches=[]
         // @ts-ignore
         $qyplayers.sort(function(a, b){return b.matchID-a.matchID})
         
      $qyplayers.forEach((p)=>{
        if(p.status==1 || p.status==2){
          $profile_ids.push(p['profile_id'])
          // @ts-ignore
          $profile_ids=$profile_ids
          }
        if(p.status==1){
          $qyplayers.push(p)
          // @ts-ignore
         $qyplayers=$qyplayers
        }})
        
        
      }
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
  <div class="aspect-video">
	<slot />
  </div>
  <Footer class="float-left">
    <div class="sm:flex sm:items-center sm:justify-between ">
      <FooterCopyright href="/" by="Flowbite™" year={2025} />
    <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
      <FooterLink href="https://space.bilibili.com/452395918/channel/collectiondetail?sid=850678"  target="_blank" rel="noopener norefferrer">Qy视频</FooterLink>
      <FooterLink href="https://www.ageofempires.com/games/aoeiide/"  target="_blank" rel="noopener norefferrer">微软帝国</FooterLink> 
      <FooterLink href="https://aoe2recs.com/dashboard/"  target="_blank" rel="noopener norefferrer">观看板</FooterLink>
      <FooterLink href="https://aoe2companion.com/"  target="_blank" rel="noopener norefferrer">AoE II Companion</FooterLink>
      <FooterLink href="https://www.aoezone.net/"  target="_blank" rel="noopener norefferrer">Aoezone论坛</FooterLink>
      <FooterLink href="https://liquipedia.net/ageofempires/Main_Page"  target="_blank" rel="noopener norefferrer">比赛记录</FooterLink>
      <FooterLink href="https://www.aoe2insights.com/"  target="_blank" rel="noopener norefferrer">录像分析</FooterLink>
      <FooterLink href="https://aoe2techtree.net/"  target="_blank" rel="noopener norefferrer">科技树</FooterLink>
      <FooterLink href="https://siegeengineers.org/"  target="_blank" rel="noopener norefferrer">开发社区</FooterLink>
      <FooterLink href="https://aoe2cm.net/"  target="_blank" rel="noopener norefferrer">禁(Ban)和选(Pick)</FooterLink>
      <FooterLink href="https://kook.vip/DDx7J8"  target="_blank" rel="noopener norefferrer">QY语音KOOK</FooterLink>
      <FooterLink href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener norefferrer">CC BY-SA 4.0</FooterLink>
      <FooterLink href="https://github.com/" target="_blank" rel="noopener norefferrer">GitHub</FooterLink>
      <FooterLink href="https://www.aoe2database.com/" target="_blank" rel="noopener norefferrer">数据网</FooterLink>
    </FooterLinkGroup>
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