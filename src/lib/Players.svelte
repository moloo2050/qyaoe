<script>
// @ts-nocheck
  import {players} from '$lib/store.js';
  import PlayerName from "$lib/PlayerName.svelte";
  import SvelteTable from "svelte-table";
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
$:{$players.forEach((player)=>{
      player.qn= player.newqrating-player.qrating
      player.wg=(player.wins/player.games*100).toFixed(0)
      })}
  function tplayerscheckAdult(p) {
        
        return   p.status==1 && p.games>0;
      }   
  const columns = [
  
  {
    key: "newqrating",
    title: "[QY]Elo",
    value: v => v.newqrating,
    sortable: true,
    headerClass: "text-left,style='width: 30px;'",
  },
  {
    key: "name",
    title: "[QY]昵称",
    value: v => v.name,
    sortable: true,
    headerClass: "text-left",
    renderComponent:PlayerName
  },
  {
    key: "elo",
    title: "胜率",
    value: v => (v.wins/v.games*100).toFixed(0)+"%",
    sortable: true,
    headerClass: "text-left",
  },
  
  {
    key: "date",
    title: "上次群局",
    value: v => getdate(v.date),
    sortable: true,
    headerClass: "text-left td ",
  }
  ];      
</script>
<SvelteTable classNameTable ="table" columns="{columns}" rows="{$players.filter(tplayerscheckAdult)}"></SvelteTable>


<style>
  .nowrap {
    white-space: nowrap;
  }
 
  th {
    text-align: left;
    padding-left: 4px;
    padding-right: 4px;
  }
  table {
    border: 0px;
    border-collapse: collapse;
  }
  td {
    border-top: 1px solid #ccc;
    padding-left: 4px;
    padding-right: 4px;
  }
  :global(body.dark #players .row > td) {
    border-top: 1px solid #303030;
  }
  .nowrap {
    white-space: nowrap;
  }
</style>

