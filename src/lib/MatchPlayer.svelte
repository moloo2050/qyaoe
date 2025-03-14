<script>
  export let player;
  import PlayerName from "$lib/PlayerName.svelte";
</script>

<tr>
  <td class="nowrap">
    <span class="playercolor  p{player.color} font-bold">
      {player.color}
    </span>
  </td>
  <td class="nowrap player">
    <PlayerName p={player} /> 
  </td>
  <td class="nowrap">
    {player.civName}
  </td>
  
  <td class="rate">
    {player.rating}
  </td>
</tr>


<style>
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
