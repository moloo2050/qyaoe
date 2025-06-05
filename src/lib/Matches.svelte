<script>
// @ts-nocheck
  import {HomeOutline,EyeOutline } from 'flowbite-svelte-icons';
  import MatchPlayer from "$lib/MatchPlayer.svelte";
  import  Pagination  from '$lib/Pagination.svelte';
  import { Select, Label } from "flowbite-svelte";
  import {matches,players,qyplayers} from '$lib/store.js';
  import SvelteTable from "svelte-table";
  import PlayerName from "$lib/PlayerName.svelte";
  import { Chart, Card, A, Button, Dropdown, DropdownItem, Popover } from "flowbite-svelte";
  import { InfoCircleSolid, ChevronDownOutline, ChevronRightOutline, PenSolid, DownloadSolid, ShareNodesSolid, TrashBinSolid, DotsHorizontalOutline } from "flowbite-svelte-icons";

  let obj =[]
  function getqyteable(){
  
  obj =[]
  const url = 'https://app.teable.cn/api/table/tbl1uPOYKdac17kp0zz/record?cellFormat=json&fieldKeyType=name&filterByTql=%7Bfield%7D%20%3D%20%27Completed%27%20AND%20%7Bfield%7D%20%3E%205&take=200&skip=0';
  const url2 = 'https://app.teable.cn/api/table/tbli6tAxyEx2piskldF/record?cellFormat=json&fieldKeyType=name&viewId=viwcrfVLNvWXGDuWiEC&filterByTql=%7Bfield%7D%20%3D%20%27Completed%27%20AND%20%7Bfield%7D%20%3E%205&take=1000&skip=0';
  const options = {method: 'GET', headers: {Authorization: 'Bearer teable_acc6TG3GbDXIOzfr3pS_99GCvZ9joUOxXwi3rF+nVgmt2TfsJMo4ABEioeKwP6c='}};
  try {
    const response =  fetch(url, options).then(function(response) {
      return response.json();
    }).then(function(playersJson) {
        playersJson.records.forEach((p)=>{
        p.fields.id=p.id
        obj.push(p.fields)
        obj=obj
      })})

    const response2 =  fetch(url2, options).then(function(response) {
        return response.json();
      }).then(function( matchesJson) {
        matchesJson.records.forEach((m)=>{
          teaid.push(m.id)
          
        })
      let eloinfo=[]
      for (var i=400;i<450;i++){
   
           eloinfo.push({"id":teaid[i],"fields":{"fldLG1JvXpLU1F0lqBc":$matches[i].matchId,"fld7zBWCTUGs9bL3geb":JSON.stringify($matches[i])}})
          eloinfo=eloinfo
      }
   //teaupmatch(eloinfo)
      })
       
    } catch (error) {
    console.error(error);
  }
  }
  getqyteable()
  
  function  teaupmatch(eloinfo){
  
  const url = 'https://app.teable.cn/api/table/tbli6tAxyEx2piskldF/record';
  //const eloinfo=[{"id":"string","fields":{"id":match.matchId,'matchinfo':JSON.stringify(match)}]
  
  const options = {
        method: 'PATCH',
        headers: {
        Authorization: 'Bearer teable_acc6TG3GbDXIOzfr3pS_99GCvZ9joUOxXwi3rF+nVgmt2TfsJMo4ABEioeKwP6c=',
        'content-type': 'application/json'
         },
        body: '{"fieldKeyType":"id","typecast":false,"records":'+JSON.stringify(eloinfo)+'}'
   };   
   console.log(options);
  const response6 = fetch(url, options).then(function(response) {
          return response.json();
        }).then(function(playersJson) {
           const data =  playersJson;
           console.log(data);})
  }
  function upteable(id,newqrating,games,wins,loses,date,matchID){
         
         const url = 'https://app.teable.cn/api/table/tbl1uPOYKdac17kp0zz/record/'+id;
         const eloinfo={"fields":{"newqrating":newqrating,'games':games,"wins":wins,"loses":loses,"matchID":matchID,"date":date}}
         
         const options = {
               method: 'PATCH',
               headers: {
               Authorization: 'Bearer teable_acc6TG3GbDXIOzfr3pS_99GCvZ9joUOxXwi3rF+nVgmt2TfsJMo4ABEioeKwP6c=',
               'content-type': 'application/json'
                },
               body: '{"fieldKeyType":"name","typecast":true,"record":'+JSON.stringify(eloinfo)+'}'
          };   
          console.log(options);
         const response6 = fetch(url, options).then(function(response) {
                 return response.json();
               }).then(function(playersJson) {
                  const data =  playersJson;
                  console.log(data);})
  }
  let tplayers=[]
  $players.forEach((p)=>{
       tplayers.push({profile_id:p.profile_id,status:p.status,name:p.name,games:0,wins:0,loses:0,wl:0,qrating:p.qrating,newqrating:p.qrating,elo:0})
       tplayers=tplayers
      })  
  $:{ $qyplayers.sort(function(a, b){return  a.name.localeCompare(b.name)})   
      $qyplayers.forEach((player)=>{
      player.value=player.profile_id
      player.qn= player.newqrating-player.qrating
      player.wg=(player.wins/player.games*100).toFixed(0)
      })
      
    }
  let qyplayered = "all";
  let maps=[{'value':'Arabia','name':'Arabia',"games":0}]
  let map="all"
  

  
  let values
  let options = {
    series: [52.8, 26.8, 20.4],
    colors: ["#1C64F2", "#16BDCA", "#9061F9"],
    chart: {
      height: 420,
      width: "100%",
      type: "pie"
    },
    stroke: {
      colors: ["white"],
      lineCap: ""
    },
    plotOptions: {
      pie: {
        labels: {
          show: true
        },
        size: "100%",
        dataLabels: {
          offset: -25
        }
      }
    },
    labels: ["Direct", "Organic search", "Referrals"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif"
      }
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif"
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        }
      }
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    }
  };
  let newmatches =$matches
  $:{
    
    if(qyplayered!="all"){
      function checkAdult(match) {
        let profile_ids=[]
        if(match.teams[0][0].qelo){
        match.teams[0].forEach((p)=>{
          profile_ids.push(p.profile_id)})
        match.teams[1].forEach((p)=>{
          profile_ids.push(p.profile_id)})}
      return   profile_ids.includes (Number(qyplayered));
    }
    newmatches = $matches.filter(checkAdult)
    
   }
   if(qyplayered!="all"&&map!="all"){
    let midmatches=[]
      function checkAdult(match) {
        let profile_ids=[]
        if(match.teams[0][0].qelo){
        match.teams[0].forEach((p)=>{
          profile_ids.push(p.profile_id)})
        match.teams[1].forEach((p)=>{
          profile_ids.push(p.profile_id)})}
      return   profile_ids.includes (Number(qyplayered));
    }
    midmatches = $matches.filter(checkAdult)
    
    
      function checkAdult2(match) {
        
      return   match.map_name==map;
    }
    newmatches = midmatches.filter(checkAdult2)
   
   }
   if(qyplayered=="all"&&map!="all"){
      function checkAdult(match) {
        
      return   match.map_name==map;
    }
    newmatches = $matches.filter(checkAdult)
    
   }
   
   if(qyplayered=="all"&&map=="all"){
   
    newmatches = $matches
   }
   maps=[{'value':'Arabia','name':'Arabia',"games":0}]
   newmatches.forEach((match)=>{
      function checkAdult(map) {
      return map.name == match.map_name;
    }
      if (maps.findIndex(checkAdult)==-1){
      maps.push({'value':match.map_name,'name':match.map_name,"games":0})
      maps=maps
      }
      if (maps.findIndex(checkAdult)>=0){
      maps[maps.findIndex(checkAdult)].games+=1
      }
     })
  maps.sort(function(a, b){return  b.games-a.games})
  
  tplayers=[]
  $players.forEach((p)=>{
       tplayers.push({profile_id:p.profile_id,status:p.status,name:p.name,games:0,wins:0,loses:0,wl:0,qrating:p.qrating,newqrating:p.qrating,elo:0})
       tplayers=tplayers
      })  
   let oldmatches = newmatches
   oldmatches.sort(function(a, b){return a.match_id-b.match_id})   
   oldmatches.forEach((match) => {
    match.teams.forEach((team) => {
      team.forEach((p) => { 
        for(var t=0;t<tplayers.length;t++ ){
          if(tplayers[t].profile_id==p.profile_id && (new Date(match['finished']).getTime()-new Date(match['started']).getTime())>=600000){
          tplayers[t].games++
          if(p.won){tplayers[t].wins++}
          if(tplayers[t].games==0){tplayers[t].qrating=p.qrating}
          tplayers[t].newqrating=p.newqrating
          tplayers[t].elo=tplayers[t].elo+p.qelo
          tplayers[t].loses=tplayers[t].games-tplayers[t].wins
          tplayers[t].wl=(tplayers[t].wins/tplayers[t].games*100).toFixed(0)
        }
      }
      })
    })
   })  
 // obj.forEach((p)=>{
   //       tplayers.forEach((ppsum)=>{
  //         if(ppsum.profile_id==p.profile_id)
   //     {upteable(p.id,ppsum.newqrating,ppsum.games,ppsum.wins,ppsum.loses,ppsum.date,ppsum.matchID)}
  //    })
   //     })
 
   
   function tplayerscheckAdult(p) {
        
        return   p.status==1 && p.games>0;
      }
      tplayers=tplayers.filter(tplayerscheckAdult)
      tplayers.sort(function(a, b){return b.games-a.games})
  console.log(tplayers)
  newmatches.sort(function(a, b){return b.match_id-a.match_id})
  
  }
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

const columns = [
  {
    key: "name",
    title: "[QY]昵称",
    value: v => v.name,
    sortable: true,
    headerClass: "text-left",
    renderComponent:PlayerName
  },
  {
    key: "newqrating",
    title: "[QY]Elo",
    value: v => v.newqrating,
    sortable: true,
    headerClass: "text-right",
  },
  {
    key: "elo",
    title: "ELO变化",
    value: v => v.newqrating-v.qrating,
    sortable: true,
    headerClass: "text-right",
  },
  {
    key: "games",
    title: "局数",
    value: v => v.games,
    sortable: true,
    headerClass: "text-right",
  },
  {
    key: "wins",
    title: "胜",
    value: v => v.wins,
    sortable: true,
    headerClass: "text-right",
  },
  {
    key: "loses",
    title: "败",
    value: v => v.loses,
    sortable: true,
    headerClass: "text-right",
  },
  {
    key: "wl",
    title: "胜率",
    value: v => v.wl,
    sortable: true,
    headerClass: "text-right",
  }
  ];
  
  
  let teaid=[]
  function ofs(profile_id){
    let a= $players.find((ele) => {
          return ele.profile_id==profile_id
        })
        if (a==undefined){
              return false
          }
        else{
              return a
          }
  }
</script>
历史比赛（{newmatches.length}）
<div class="flex flex-row">
  <Label for="qyplayer" class="mt-2 w-32">成员</Label>
  <Label for="maps" class="mt-2 w-40">地图</Label>
</div>

<div class="flex flex-row">
  <Select id="qyplayer" size="sm" class="mt-2  w-32" bind:value={qyplayered} placeholder="">
  <option selected value="all">All</option>
  {#each $qyplayers as { value, name }}
    <option {value}>{name}</option>
  {/each}
 </Select>

 <Select id="maps" size="sm" class="mt-2 w-40" bind:value={map} placeholder="">
  <option selected value="all">All</option>
  {#each maps as { value, name,games }}
    <option {value}>{name}({games})</option>
  {/each}
 </Select>
 
</div>

<div class="flex flex-row ... ml-6">
<div class="mr-2 w-900">
  {#if values}
  <table>
<tbody>

{#each values as match}
<tr class="divider">
  <td colspan="5" class="nowrap">
    <span>
      <HomeOutline size="md" class="text-red-700 dark:text-green-300 inline m-1"/>QY4V4 on {match.map_name}
    </span>
    
  </td>
</tr>

{#each match.teams as t, i}
  <tr>
      <td class="team" colspan="5"><b>队伍 {i + 1}</b></td>
  </tr>
  {#each match.teams[i] as player }
  <tr>
    <td class="nowrap">
      <span class="playercolor  p{player.color} font-bold">
        {player.color}
      </span>
    </td>
    <td class="nowrap player">
      {ofs(player.profile_id).name}
    </td>
    <td class="nowrap">
      {player.civ_name}
    </td>
    <td class="rate">
      {player.qrating}
    </td>
    
    <td class="rate">
      {#if player.qelo > 0}
        <span class="text-green-500">+{player.qelo}</span>
      {:else if player.qelo < 0}
        <span class="text-red-500">{player.qelo}</span>
      
      {/if}
      
    </td>
  </tr>
  {/each}
{/each}
<tr class="divider">
  <td colspan="5" class="nowrap">
   
    {getdate(match.started)}
    <span class="actions">
      {Math.round((new Date(match['finished']).getTime()-new Date(match['started']).getTime())/60000)}分钟
    </span>
  </td>
</tr>
{/each}
</tbody>
</table>
{/if}


</div>
<div class="ml-20 w-1200">
  <SvelteTable columns="{columns}" rows="{tplayers}"></SvelteTable>
</div>
<div class="ml-20">
<Card>
  <div class="flex w-full items-start justify-between">
    <div class="flex-col items-center">
      <div class="mb-1 flex items-center">
        <h5 class="me-1 text-xl leading-none font-bold text-gray-900 dark:text-white">Website traffic</h5>
        <InfoCircleSolid id="pie1" class="ms-1 h-3.5 w-3.5 cursor-pointer text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
        <Popover triggeredBy="#pie1" class="z-10 w-72 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 shadow-xs dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
          <div class="space-y-2 p-3">
            <h3 class="font-semibold text-gray-900 dark:text-white">Activity growth - Incremental</h3>
            <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
            <h3 class="font-semibold text-gray-900 dark:text-white">Calculation</h3>
            <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
            <A href="/">Read more <ChevronRightOutline class="ms-1.5 h-2 w-2" /></A>
          </div>
        </Popover>
      </div>
    </div>
    <div class="flex items-center justify-end">
      <DotsHorizontalOutline id="dots-menu" class="dots-menu dark:text-white" />
      <Dropdown triggeredBy="#dots-menu" class="w-44" offset="-6">
        <DropdownItem><PenSolid class="me-2 inline h-3 w-3" /> Edit widget</DropdownItem>
        <DropdownItem><DownloadSolid class="me-2 inline h-3 w-3" />Dropdown data</DropdownItem>
        <DropdownItem><ShareNodesSolid class="me-2 inline h-3 w-3" />Add to repository</DropdownItem>
        <DropdownItem><TrashBinSolid class="me-2 inline h-3 w-3" />Delete widget</DropdownItem>
      </Dropdown>
    </div>
  </div>

  <Chart {options} class="py-6" />

  <div class="grid grid-cols-1 items-center justify-between border-t border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between pt-5">
      <Button class="inline-flex items-center bg-transparent py-0 text-center text-sm font-medium text-gray-500 hover:bg-transparent hover:text-gray-900 focus:ring-transparent dark:bg-transparent dark:text-gray-400 dark:hover:bg-transparent dark:hover:text-white dark:focus:ring-transparent">Last 7 days<ChevronDownOutline class="m-2.5 ms-1.5 w-2.5" /></Button>
      <Dropdown class="w-40" offset="-6">
        <DropdownItem>Yesterday</DropdownItem>
        <DropdownItem>Today</DropdownItem>
        <DropdownItem>Last 7 days</DropdownItem>
        <DropdownItem>Last 30 days</DropdownItem>
        <DropdownItem>Last 90 days</DropdownItem>
      </Dropdown>
      <A href="/" class="hover:text-primary-700 dark:hover:text-primary-500 rounded-lg px-3 py-2 text-sm font-semibold uppercase hover:bg-gray-100 hover:no-underline dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
        Traffic analysis
        <ChevronRightOutline class="ms-1.5 h-2.5 w-2.5" />
      </A>
    </div>
  </div>
</Card>
</div>
</div>
<Pagination rows={newmatches} perPage={5} bind:trimmedRows={values} />
<style>
  .highlight {
    background-color: #f0f0f0;
  }
  :global(body.dark .highlight) {
    background-color: #303030;
  }
  .nowrap {
    white-space: nowrap;
  }
  .divider {
    border-top: 1px solid #ccc;
    padding-top: 10px;
  }
  :global(body.dark .divider) {
    border-top: 1px solid #303030;
  }
  .team {
    padding-left: 17px;
  }
  
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
