<script>
  // @ts-nocheck
 import {slots,matches,players,qyplayers,onlobbyes, onmatches ,qyonlobbyes, qyonmatches ,connection} from '$lib/store.js';
 import { onMount } from 'svelte';
 import { Tabs, TabItem } from 'flowbite-svelte';
 import Players from "$lib/Players.svelte";
 import Players01 from "$lib/Players01.svelte";
 import Players02 from "$lib/Players02.svelte";
 import Onmatches from "$lib/Onmatches.svelte";
 import Lobbies from "$lib/Lobbies.svelte";
 import OnLobbies from "$lib/OnLobbies.svelte";
 import Lobby from "$lib/Lobby.svelte";
 import News from "$lib/News.svelte";
 import Matches from "$lib/Matches.svelte";
 let news={}
 $matches= []
 onMount(async () => {
     const options = {
      method: 'GET',
      headers: {
      accept: 'application/json',
      
    }
  };
  // @ts-ignore
  const response =  await fetch('/news', options).then(res => res.json())
  const response1=  await fetch('/oldes', options).then(res => res.json())
  function checkAdult(match) {
      return  match.teams[0][0].qelo ;
    }
    $matches = response1.matches.filter(checkAdult)
  console.log($matches)
  news=response
    })
</script>

{#if !$connection}
  <div class="flex flex-row ... ml-6">
    <span>[OFFLINE]</span>
  </div>
{/if}
{#if $connection}
<Tabs>
  <TabItem open title="看板({$qyonlobbyes.length}/{$onmatches.length})">
    <div class="flex flex-row ... ml-6">
      <div class="mr-20 w-900">
        <h2>
          大厅房间({$qyonlobbyes.length})/正在游戏({$onmatches.length})
        </h2>
        <table id="matches">
          <tbody>
            {#if $qyonlobbyes.length > 0}
            {#each $qyonlobbyes as match }
            <Lobbies onlobby={match} />
            {/each}
            {/if}
            {#each $onmatches as match }
            <Onmatches onmatch={match} />
            {/each}
           
        </tbody>
        </table>
      </div>
      <div class="mr-20 w-1200">
        <h2>
          活跃成员（{$qyplayers.length}）
        </h2>
        <Players/>
      </div>
    </div>
  </TabItem>

  <TabItem title="手动分组">
    <div class="flex flex-row ... ml-6">
      <div class="mr-20 w-128">
        <h2 class="w-72">
          手动分组
        </h2>
        <table>
          <tbody >
            <Lobby slots={$slots} />
          </tbody>
        </table>
      </div>
      <div class="mr-20 w-128">
          <h2>
          成员
          </h2>
          <Players02 players01={$players} />
      </div>
    </div>
  </TabItem>

  <TabItem title="成员">
    <div class="ml-6">
      <Players01 players01={$players} />
    </div>
  </TabItem>
  <TabItem  title="相关信息">
    {#if news.news}
    <News news={news} />
    {/if}
  </TabItem>
  <TabItem  title="QY4V4({$matches.length})">
    <div class="ml-6">
        {#if $matches.length > 0}
    
        <Matches  matches ={$matches} />
    
    {/if}
  </div> 
   
    
  </TabItem>
  <TabItem  title="大厅({$onlobbyes.length})">
    <OnLobbies onlobby={$onlobbyes} />
  </TabItem>
</Tabs>
  
{/if}
<style lang="postcss">
  :global(body) {
    padding: 0px;
    margin: 0px;
    transition: background-color 0.3s;
  }
  :global(.dark) {
    background-color: #222222;
    color: #ffffff;
    color-scheme: dark;
  }
  :global(body.dark #footer) {
    background-color: #303030;
  }
  :global(body.dark a) {
    color: #00bc8c;
  }
</style>