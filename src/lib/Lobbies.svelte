<!-- svelte-ignore state_referenced_locally -->
<!-- svelte-ignore state_referenced_locally -->
<!-- svelte-ignore state_referenced_locally -->
<script>
// @ts-nocheck

    let {onlobby}=$props();
    import MatchPlayer from "$lib/MatchPlayer.svelte";
    import {HomeOutline,EyeOutline } from 'flowbite-svelte-icons';
    import PlayerName from "$lib/PlayerName.svelte";
    import {players} from '$lib/store.js';
    let playerteam = $derived.by(() => {
        let playerteam=[
              {"id":0,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]"},
              {"id":1,"profile_id":1,"name":"空 位 ","qrating":1600,"team":"[-]"},
              {"id":2,"profile_id":2,"name":"空 位 ","qrating":1600,"team":"[-]"},
              {"id":3,"profile_id":3,"name":"空 位 ","qrating":1600,"team":"[-]"},
              {"id":4,"profile_id":4,"name":"空 位 ","qrating":1600,"team":"[-]"},
              {"id":5,"profile_id":5,"name":"空 位 ","qrating":1600,"team":"[-]"},
              {"id":6,"profile_id":6,"name":"空 位 ","qrating":1600,"team":"[-]"},
              {"id":7,"profile_id":7,"name":"空 位 ","qrating":1600,"team":"[-]"}]
		    for(var i=0;i<onlobby['players'].length;i++){
          let a=ofs(onlobby['players'][i].profileId)
          if(a){
             playerteam[i].profile_id=onlobby['players'][i].profileId
             playerteam[i].name=onlobby['players'][i].name
             if  (a.status==1 || a.status==3){
                playerteam[i].qrating=a.newqrating}
             if  (a.status==2 || a.status==4){
                playerteam[i].qrating=ofs(a.qrating).newqrating}
           }
           else{
             playerteam[i].profile_id=onlobby['players'][i].profileId
             playerteam[i].name=onlobby['players'][i].name
           }
        }
        let newteam = combination(playerteam,4,35)[0]
        newteam['team1'][0].team = 1
        newteam['team1'][1].team = 1
        newteam['team1'][2].team = 1 
        newteam['team1'][3].team = 1
        newteam['team2'][0].team = 2
        newteam['team2'][1].team = 2
        newteam['team2'][2].team = 2          
        newteam['team2'][3].team = 2   
        let newplayerteam = newteam['team1'].concat(newteam['team2'])
		    return newplayerteam;
	  });
    
    console.log(playerteam)   
    function ofs(profile_id){
        let a=  $players.find((ele) => {
          return ele.profile_id==profile_id
        })

          if (a==undefined){
              return false
          }
          else{
              return a
          }
    } 

    function combination(arr,size,n){	
    //定义数组保存结果
        var result = []
        var newresult = []        
        function _combine(selected,arr,size){
            //如果size===0，则一次组合完成，存入result数组并返回
            if(size===0){
                result.push(selected)
                return
            }
            //遍历所有可能选中的元素，遍历的次数为数组长度减去(size-1)
            for(let i =0;i<arr.length-(size-1);i++){
                //复制数组，避免对selected数组数据的更改
                let temp = selected.slice()
                temp.push(arr[i]) 
                _combine(temp,arr.slice(i+1),size-1)
            }
            
        }

        _combine([], arr, size);
        function sumqrating(arr){
            let sum =0
        for(let i =0;i<arr.length;i++){
           sum += arr[i]["qrating"]
        }
        return sum
       }
        for(let i =0;i<n;i++){
            let elo = Math.abs(sumqrating(result[i])-sumqrating(result[2*n-1-i]))
            newresult.push({'team1':result[i],'team2':result[2*n-1-i],'team1elo':sumqrating(result[i]),'team2elo':sumqrating(result[2*n-1-i]),'elo':elo})
        }
        newresult.sort(function(a, b){return a.elo - b.elo})
        return  newresult;
     } 
   
  </script>
  
  <tr class="divider">
    <td colspan="4" class="nowrap">
      <span>
        <HomeOutline size="md" class="text-red-700 dark:text-green-300 inline m-1"/>{onlobby.leaderboardName} On {onlobby.mapName}
      </span>
  
      <span class="actions">
        <a href= 'aoe2de://0/{onlobby.matchId}'><EyeOutline /></a>
      </span>
    </td>
  </tr>
    {#each playerteam.sort(function(a, b){return a.id - b.id}) as player }
    <tr>
      <td class="nowrap">
        <span class="playercolor  p{player.id+1} font-bold">
          {player.id+1}
        </span>
      </td>
      <td class="nowrap player">
        <PlayerName row={player} />
      </td>
      <td class="nowrap">
        {player.qrating}
      </td>
      
      <td class="rate">
        {player.team}
      </td>
    </tr>
    {/each}
  
  <style>
  .actions {
      float: right;
    }
  td {
    padding-left: 4px;
    padding-right: 4px;
  }
  .nowrap {
    white-space: nowrap;
  }
  
  .player {
    padding-left: 17px;
    
  }
  .rate {
    text-align: right;
  }
.playercolor {
	border-radius: 25%;
	height: 45px;
 	width: 45px;
	min-width: 25px;
	min-height: 25px;
	text-align: center;
	top: 50%;
  line-height: 25px;
}
.p1{
  background-color: #394EF8;
  }
.p2{
  background-color: #FF001B;
  }
.p3{
  background-color: #03FF2E;
  }
.p4{
  background-color: #FFFF37;
  }
.p5{
  background-color: #03FFFD;
  }
.p6{
  background-color: #FF4BA9;
  }
.p7{
  background-color: #6E6E6E;
  }
.p8{
  background-color: #FF8B25;
  }
</style>