<script>
// @ts-nocheck
  export let players;
  import PlayerName from "$lib/PlayerName.svelte";
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
</script>

<table>
  <thead>
  <tr>
    <th>ELO(QY)</th>
    <th>名字</th>
    <th>胜率</th>
    <th>上次群局</th>
  </tr>
</thead>
<tbody>
  {#each players.sort(function(a, b){return b.games-a.games}) as player}
    <tr>
      <td class="nowrap">
        {player.newqrating}
      </td>
      <td class="nowrap">
       <PlayerName p={player} /> 
      </td>
      <td class="nowrap"> 
        {(player.wins/player.games*100).toFixed(0)}
      </td>
      <td class="nowrap">
        {getdate(player.date)}
      </td>
    </tr>
  {/each}
</tbody>
</table>
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

