<script>
  // @ts-nocheck
  let {p} =$props();
  import {BadgeCheckSolid} from 'flowbite-svelte-icons';
  import { Tooltip, Button  } from 'flowbite-svelte';
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
  <a href="/" class="font-bold underline dark:text-primary-500 hover:no-underline" id="p{pid}" >{p.name}</a>
  <Tooltip triggeredBy="#p{pid}"  placement='right'>
    {#if ofs(pid).status==1 || ofs(pid).status==3}
    <table>
      <tbody>
        <tr>
          <td>
            <img src='.\private\{ofs(pid).name}.jpg'  alt="Avatar" width="80" />
          </td>
          </tr>
          <tr>
        <td>
          <h2>
            <BadgeCheckSolid size="md" class="text-red-700 dark:text-green-300 inline m-1"/>{ofs(pid).name}      
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
            <BadgeCheckSolid size="md" class="text-red-700 dark:text-green-300 inline m-1"/>{ofs(ofs(pid).qrating).name}      
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
    </tbody>
    </table>  
  {/if}
    </Tooltip>  
  {:else}
    {p.name}
  {/if}
</span>

<style></style>
