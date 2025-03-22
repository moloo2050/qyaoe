<script>
// @ts-nocheck

    export let onmatch;
    import MatchPlayer from "$lib/MatchPlayer.svelte";
    import {ServerSolid,EyeOutline } from 'flowbite-svelte-icons';
  </script>
  
  <tr class="divider">
    <td colspan="4" class="nowrap">
      <span>
        <ServerSolid size="md" class="text-red-700 dark:text-green-300 inline m-1"/>{onmatch.leaderboardName} On {onmatch.mapName}
      </span>
  
      <span class="actions">
        <a href='aoe2de://1/{onmatch.matchId}'><EyeOutline /></a>
      </span>
    </td>
  </tr>
    {#each onmatch.players.sort(function(a, b){return a.color-b.color}).sort(function(a, b){return b.team-a.team}) as player }
      <MatchPlayer player={player}/>
    {/each}
  
  <style>
    
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
    
   
    .actions {
      float: right;
    }
  </style>