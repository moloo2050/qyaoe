<script>
// @ts-nocheck
  import { Table, Button, Checkbox ,TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  export let players01;
  import PlayerName from "$lib/PlayerName.svelte";
  import { slots } from "./store";
  // @ts-ignore
  function getdate(date){
  var change = new Date(date);
  var Y = change.getFullYear() + "-";
  var M = (change.getMonth() + 1 < 10 ? "0" + (change.getMonth() + 1) : change.getMonth() + 1) + "-";
  var D= (change.getDate() < 10 ? "0" + (change.getDate()) : change.getDate()) + " ";
  var h= (change.getHours() < 10 ? "0" + (change.getHours()) : change.getHours()) + ":";
  var m= (change.getMinutes() < 10 ? "0" + (change.getMinutes()) : change.getMinutes()) + ":";
  var s= (change.getSeconds() < 10 ? "0" + (change.getSeconds()) : change.getSeconds());
  var newDate = Y + M + D + h + m + s;
  return newDate
}

players01.forEach((player)=>{
      player.value=player.profile_id
      player.label=player.name+'-'+player.newqrating
      
      player.qn= player.newqrating-player.qrating
      player.wg=(player.wins/player.games*100).toFixed(0)
      })
players01.sort(function(a, b){return b.newqrating-a.newqrating})     
function ofs(profile_id){
        let a= players01.find((ele) => {
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
let group = []; 
let newgroup = [];  
                
$:{
  if(group.length==0||group.length>=9){newgroup.length=0,group.length=0
    $slots=[
    {"id":0,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":1,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":2,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":3,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":4,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":5,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":6,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false},
    {"id":7,"profile_id":0,"name":"空 位 ","qrating":1600,"team":"[-]",position:false}]
  }
  if(group.length>0&&group.length<9){ 
  group.forEach((player, index) => {
    if (!newgroup.includes(player)&&!newgroup.includes(0)) {
      newgroup.push(player);
      newgroup =newgroup 
    }
    if (!newgroup.includes(player)&&newgroup.includes(0)) {
      newgroup[newgroup.findIndex((a)=>a==0)]=player;
      newgroup =newgroup 
    }
  });
  }
  if(newgroup.length>0&&newgroup.length<9){ 
    newgroup.forEach((player, index) => {
    if (!group.includes(player)) {
      newgroup[index]=0;
      newgroup =newgroup 
      $slots[index].name ="空 位 "
      $slots[index].profile_id =0
      $slots[index].qrating =1600
    }else{
      $slots[index].name =ofs(player).name
      $slots[index].profile_id =ofs(player).profile_id
      $slots[index].qrating =ofs(player).newqrating}
  });
  let newteam=  combination($slots,4,35)[0]
                newteam['team1'][0].team = 1
                newteam['team1'][1].team = 1
                newteam['team1'][2].team = 1
                newteam['team1'][3].team = 1
                newteam['team2'][0].team = 2
                newteam['team2'][1].team = 2
                newteam['team2'][2].team = 2
                newteam['team2'][3].team = 2
  $slots = newteam['team1'].concat(newteam['team2'])
  $slots.sort(function(a, b){return a.id - b.id})
  }
}
</script>
<Button on:click={() => (group.length = 0)}>Clear</Button>
<div class="flex flex-wrap">
  <Checkbox  choices={players01.filter((player)=>player.status === 1)} bind:group groupInputClass='ms-2' groupLabelClass="w-48" />
</div>
<style>
 
</style>

