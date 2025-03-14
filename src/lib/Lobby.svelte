<script>
// @ts-nocheck

    export let slots;
    import {HomeOutline,EyeOutline } from 'flowbite-svelte-icons';
    import PlayerName from "$lib/PlayerName.svelte";
    
  </script>
  
  <tr class="divider">
    <td colspan="4" class="nowrap">
      <span>
        <HomeOutline size="md" class="text-red-700 dark:text-green-300 inline m-1"/>大厅房间
      </span>
      {#if slots.sort(function(a, b){return a.team-b.team})[0].team!="[-]" } { slots[0].qrating+slots[1].qrating+slots[2].qrating+slots[3].qrating}  vs  { slots[4].qrating+slots[5].qrating+slots[6].qrating+slots[7].qrating}{/if}
  </tr>
    {#each slots.sort(function(a, b){return a.id-b.id}) as player }
    <tr>
      <td class="nowrap">
        <span class="playercolor  p{player.id+1} font-bold">
          {player.id+1}
        </span>
      </td>
      <td class="nowrap player pl-32">
        {player.name}
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
    width: 245px;
  }
  .rate {
    text-align: right;
    padding-left: 17px;
    width: 65px;
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