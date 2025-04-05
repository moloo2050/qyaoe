<script>
// @ts-nocheck
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  export let players01;
  import PlayerName from "$lib/PlayerName.svelte";
  import { Card, Button, Rating, Badge } from 'flowbite-svelte';
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
      player.qn= player.newqrating-player.qrating
      player.wg=(player.wins/player.games*100).toFixed(0)
      })
</script>


<Card padding="none" size="xl" class="grid md:grid-cols-5">
  {#each players01.sort(function(a, b){return b.games-a.games}) as player}
    
  {#if player.status === 1}
  <figure class="flex flex-col justify-center items-center p-8 text-center bg-white rounded-t-lg border-b border-gray-200 md:rounded-t-none md:rounded-tl-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
    <img class="rounded-t-lg" src="/private/{player.name}.jpg" alt="product 1" width="120"/>
    <blockquote class="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400">
      <p class="my-4 font-light">{player.nick}</p>
    </blockquote>
  </figure>
  {/if}
  {/each}
</Card>
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
  
  .nowrap {
    white-space: nowrap;
  }
  
</style>
