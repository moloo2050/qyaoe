
<script>
// @ts-nocheck

    let {onlobby}=$props();
    import MatchPlayer from "$lib/MatchPlayer.svelte";
    import {HomeOutline,EyeOutline } from 'flowbite-svelte-icons';
    import PlayerName from "$lib/PlayerName.svelte";
    import {players} from '$lib/store.js';
    import {  Popover,Tooltip, Button  } from 'flowbite-svelte';
    import { Input, Label, Helper } from 'flowbite-svelte';
    import {BadgeCheckSolid} from 'flowbite-svelte-icons';
    let name = $state('');
    function checkAdult(match) {
        let playesname = match.players.map(player => player.name).join();
        return playesname.toLowerCase().includes(name.toLowerCase())
   }
   let onlobbys= $derived(onlobby.filter(checkAdult));
  </script>
  查找：<input bind:value={name} />（{onlobbys.length}）
  {#each onlobbys.sort(function(a, b){return b.matchId - a.matchId}) as item}
  <tr class="divider">
    <td colspan="4" id="p{item.matchId}" class="nowrap">
      <span>
        <HomeOutline size="md"  class="text-red-700 dark:text-green-300 inline m-1"/>{item.name} 
      </span>
      <span class="actions">
        <a href= 'aoe2de://0/{item.matchId}'><EyeOutline /></a>
      </span>
      <span class="actions">
        <a href= 'aoe2de://0/{item.matchId}'>{item.mapName} || {item.server}-{item.totalSlotCount - item.players.filter((player)=>{return player.name=="Open"}).length}/{item.totalSlotCount}</a>
      </span>
    </td>
    <Popover triggeredBy="#p{item.matchId}"  placement='right'>
      <table>
        <tbody>
          {#each item.players as player}
          
          <tr>
            {#if player.profileId!=-1}
          <td>
            <h2>
              <a href="https://www.aoe2companion.com/profile/{player.profileId}" class="text-primary-600 dark:text-primary-500 hover:underline"> {player.name}</a>     
            </h2>
          </td>
          {:else}
          <td>
            <h2>
              {player.name}    
            </h2>
          </td>
          {/if}
          <td>
            {player.rating}
          </td>
        </tr>
          {/each}
          
        
      </tbody>
      </table>
      </Popover>  
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