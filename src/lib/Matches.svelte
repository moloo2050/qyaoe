<script>
// @ts-nocheck

  export let matches;
  import {HomeOutline,EyeOutline } from 'flowbite-svelte-icons';
  import MatchPlayer from "$lib/MatchPlayer.svelte";
  import  Pagination  from '$lib/Pagination.svelte';
  import { Button } from 'flowbite-svelte';
  const examples = 'The Pudding is a digital publication that explains ideas debated in culture with visual essays.'.split(' ')
	
	
  let page=0
  matches.sort(function(a, b){return b.match_id-a.match_id})
  let values
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
</script>
{#if values}
<table>
  <tbody>
{#each values as match}
<tr class="divider">
  <td colspan="5" class="nowrap">
    <span class="highlight">
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
      {player.name}
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

<Pagination rows={matches} perPage={5} bind:trimmedRows={values} />
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
