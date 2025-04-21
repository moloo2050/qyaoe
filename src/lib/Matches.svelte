<script>
// @ts-nocheck

  export let match;
  import {HomeOutline,EyeOutline } from 'flowbite-svelte-icons';
  import MatchPlayer from "$lib/MatchPlayer.svelte";
</script>

<p colspan="0" class="nowrap">
    <span class="highlight">
      <HomeOutline size="md" class="text-red-700 dark:text-green-300 inline m-1"/>QY4V4 on {match.map_name}
    </span>
</p>
{#each match.teams as t, i}
  <tr>
      <td class="team" colspan="5"><b>Team {i + 1}</b></td>
  </tr>
  {#each match.teams[i] as player }
  <tr>
    <td class="nowrap">
      <span class="playercolor  p{player.color} font-bold">
        {player.color}
      </span>
    </td>
    <td class="nowrap player pl-32">
      {player.name}
    </td>
    <td class="nowrap">
      {player.civ_name}
    </td>
    <td class="nowrap">
      {player.qrating}
    </td>
    
    <td class="rate">
      ({player.qelo})
    </td>
  </tr>
  {/each}
{/each}

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
