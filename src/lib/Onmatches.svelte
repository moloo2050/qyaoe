<script>
// @ts-nocheck

    export let onmatch;
    import MatchPlayer from "$lib/MatchPlayer.svelte";
    import {ServerSolid,EyeOutline } from 'flowbite-svelte-icons';
    import PlayerName from "$lib/PlayerName.svelte";
    import {players} from '$lib/store.js';
  // @ts-ignore
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
  </script>
  
  <tr class="divider">
    <td colspan="4" class="nowrap">
      <span>
        <ServerSolid size="md" class="text-red-700 dark:text-green-300 inline m-1"/>{onmatch.leaderboardName} On {onmatch.mapName}
      </span>
  
      <span class="actions">
        <a href='aoe2de://1/{onmatch.matchId}'><EyeOutline size="md" class="text-red-700 dark:text-green-300 inline m-1" /></a>
      </span>
    </td>
  </tr>
    {#each onmatch.players.sort(function(a, b){return a.color-b.color}).sort(function(a, b){return b.team-a.team}) as player }
      <tr>
      <td class="nowrap">
      <span class="playercolor  p{player.color} font-bold">
      {player.color}
      </span>
      </td>
      <td class="nowrap player">
      <PlayerName row={player} /> 
      </td>
      <td class="nowrap">
      {player.civName}
      </td>
      <td class="rate">
        {#if onmatch.leaderboardName=="Unranked"}
         {#if ofs(player.profileId).status==1 || ofs(player.profileId).status==3}
         {ofs(player.profileId).newqrating}
         {:else}
         {ofs(ofs(player.profileId).qrating).newqrating}
         {/if}
         {:else}
          {player.rating}
        {/if}
      </td>
      </tr>
    {/each}
  
  <style>
.nowrap {
      white-space: nowrap;
    }
.divider {
      border-top: 1px solid #ccc;
      padding-top: 10px;
    }
.actions {
      float: right;
    }
td {
    padding-left: 4px;
    padding-right: 4px;
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