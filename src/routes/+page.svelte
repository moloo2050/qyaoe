<script>
  // @ts-nocheck
 import {slots,matches,players,qyplayers,onlobbyes, onmatches ,connection} from '$lib/store.js';
 import { onMount } from 'svelte';
 import { Tabs, TabItem } from 'flowbite-svelte';
 import Players from "$lib/Players.svelte";
 import Players01 from "$lib/Players01.svelte";
 import Players02 from "$lib/Players02.svelte";
 import Onmatches from "$lib/Onmatches.svelte";
 import Lobbies from "$lib/Lobbies.svelte";
 import Lobby from "$lib/Lobby.svelte";
</script>

{#if !$connection}
    <span>[OFFLINE]</span>
{/if}
{#if $connection}
<Tabs>
  <TabItem open title="看板">
    <div class="flex flex-row ... ml-6">
      <div class="mr-20 w-900">
        <h2>
          大厅房间({$onlobbyes.length})/正在游戏({$onmatches.length})
        </h2>
        <table id="matches">
          <tbody>
            {#each $onlobbyes as match }
            <Lobbies onlobby={match} />
            {/each}
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
        <Players players={$qyplayers} />
      </div>
    </div>
  </TabItem>

  <TabItem title="手动分组">
    <div class="flex flex-row ... ml-6">
      <div class="mr-20 w-128">
        <h2 class="w-72">
          手动分组
        </h2>
        <table id="matches" >
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
      <h2>
      成员
      </h2>
      <Players01 players01={$players} />
    </div>
  </TabItem>
  <TabItem  title="个人">
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>Dashboard:</b>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </TabItem>

  <TabItem  title="情谊专栏">
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>Disabled:</b>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
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