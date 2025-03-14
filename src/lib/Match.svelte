<script>
// @ts-nocheck

  export let match;
  import MatchPlayer from "$lib/MatchPlayer.svelte";
</script>

<tr class="divider">
  <td colspan="4" class="nowrap">
     {#if match.name}<Icon icon="mdi:view-list-outline" alt="Lobby Match" />
    {:else}<Icon icon="mdi:sword-cross" alt="Matchmaking Match" />{/if}

    <span class="highlight">
      {match.gameMode} on {match.map_name}
    </span>

    <span class="actions">
      <a href=aoe2de://0/{match.matchId}><Icon icon="mdi:eye" /></a>
      <!--TODO: <Icon icon="mdi:cog" />-->
    </span>
  </td>
</tr>


{#each match.teams as t, i}
  <tr>
      <td class="team"><b>Team {i + 1}</b></td>
  </tr>
  {#each match.teams[i] as player }
    <MatchPlayer player={player}/>
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
</style>
