<script>
  // @ts-nocheck
  let {p} =$props();
  import {BadgeCheckSolid} from 'flowbite-svelte-icons';
  import {  Popover,Tooltip, Button  } from 'flowbite-svelte';

  import {players} from '$lib/store.js';
  function ofs(profile_id){
    let a= $players.find((ele) => {
          return ele.profile_id==profile_id
        })
        if (a==undefined){
              return false
          }
        else{
              return a
          }
  }
  let pid = $derived((p.profile_id!=undefined)? p.profile_id:p.profileId)
  let ref = $derived(ofs(pid))
</script>

<span>
  {#if ref }
  <a href="https://www.aoe2companion.com/profile/{p.profileId}" class="font-bold underline dark:text-primary-500 hover:no-underline" id="p{pid}" >{p.name}</a>
  <Popover triggeredBy="#p{pid}"  placement='right'>
    {#if ofs(pid).status==1 || ofs(pid).status==3}
    <table>
      <tbody>
        <tr>
          <td>
            <img class="rounded-t-lg" src='.\private\{ofs(pid).name}.jpg'  alt="Avatar" width="80" />
          </td>
          </tr>
          <tr>
        <td>
          <h2>
            <a href="https://www.aoe2companion.com/profile/{ofs(pid).profile_id}"   target="_blank"  class="text-primary-600 dark:text-primary-500 hover:underline"> <BadgeCheckSolid size="md" class="text-red-700 dark:text-green-300 inline m-1"/>{ofs(pid).name} </a>     
          </h2>
        </td>
      </tr>
      <tr>
        <td>
          games: {ofs(pid).games}
        </td>
      </tr>
      <tr>
        <td>
          wins:{ofs(pid).wins}
        </td>
      </tr>
      <tr>
        <td>
          qyelo:{ofs(pid).newqrating}
        </td>
      </tr>
      {#if ofs(pid).bilibili!=null}
      <tr>
        <td>
          <a href="https://live.bilibili.com/{ofs(pid).bilibili}"   target="_blank"  class="text-primary-600 dark:text-primary-500 hover:underline">BILI</a>
        </td>
      </tr>
      {/if}
      {#if ofs(pid).douyin!=null}
      <tr>
        <td>
          <a href="https://live.douyin.com/{ofs(pid).douyin}"   target="_blank"  class="text-primary-600 dark:text-primary-500 hover:underline">抖音</a>
        </td>
      </tr>
      {/if}
      {#if ofs(pid).douyu!=null}
      <tr>
        <td>
          <a href="https://www.douyu.com/{ofs(pid).douyu}"   target="_blank"  class="text-primary-600 dark:text-primary-500 hover:underline">斗鱼</a>
        </td>
      </tr>
      {/if}
    </tbody>
    </table>
    {:else if ofs(pid).status==2 || ofs(pid).status==4}  
    <table>
      <tbody>
        <tr>
          <td>
            <img src='.\private\{ofs(ofs(pid).qrating).name}.jpg'  alt="Avatar" width="80" />
          </td>
          </tr>
      <tr>
        <td>
          <h2>
            <a href="https://www.aoe2companion.com/profile/{ofs(pid).profile_id}"   target="_blank"  class="text-primary-600 dark:text-primary-500 hover:underline">  <BadgeCheckSolid size="md" class="text-red-700 dark:text-green-300 inline m-1"/>{ofs(ofs(pid).qrating).name} - 2</a>    
          </h2>
        </td>
      </tr>
      
      <tr>
        <td>
          games: {ofs(ofs(pid).qrating).games}
        </td>
      </tr>
      <tr>
        <td>
          wins:{ofs(ofs(pid).qrating).wins}
        </td>
      </tr>
      <tr>
        <td>
          qyelo:{ofs(ofs(pid).qrating).newqrating}
        </td>
      </tr>
      {#if ofs(ofs(pid).qrating).bilibili!=null}
      <tr>
        <td>
          <a href="https://live.bilibili.com/{ofs(ofs(pid).qrating).bilibili}"   target="_blank"  class="text-primary-600 dark:text-primary-500 hover:underline">BILI</a>
        </td>
      </tr>
      {/if}
      {#if ofs(ofs(pid).qrating).douyin!=null}
      <tr>
        <td>
          <a href="https://live.douyin.com/{ofs(ofs(pid).qrating).douyin}"   target="_blank"  class="text-primary-600 dark:text-primary-500 hover:underline">抖音</a>
        </td>
      </tr>
      {/if}
      {#if ofs(ofs(pid).qrating).douyu!=null}
      <tr>
        <td>
          <a href="https://www.douyu.com/{ofs(ofs(pid).qrating).douyu}"   target="_blank"  class="text-primary-600 dark:text-primary-500 hover:underline">斗鱼</a>
        </td>
      </tr>
      {/if}
    </tbody>
    </table>  
  {/if}
    </Popover>  
  {:else}
  <a href="https://www.aoe2companion.com/profile/{p.profileId}"   target="_blank"  class="dark:text-primary-500 hover:underline"> {p.name} </a>
  {/if}

</span>

<style></style>
