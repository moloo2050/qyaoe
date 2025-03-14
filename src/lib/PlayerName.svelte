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
  let id = $derived((p.profile_id!=undefined)? p.profile_id:p.profileId)
  let ref = $derived(ofs(id))
</script>

<span>
  {#if ref }
  <a href="/" class="font-bold underline dark:text-primary-500 hover:no-underline" id="p{id}" >{p.name}</a>
  <Tooltip triggeredBy="#p{id}"  placement='right'>
    {#if ofs(id).status==1 || ofs(id).status==3}
    <table>
      <tbody>
      <tr>
        <td>
          <h2>
            <BadgeCheckSolid size="md" class="text-red-700 dark:text-green-300 inline m-1"/>{ofs(id).name}      
          </h2>
        </td>
      </tr>
      
      <tr>
        <td>
          games: {ofs(id).games}
        </td>
      </tr>
      <tr>
        <td>
          wins:{ofs(id).wins}
        </td>
      </tr>
      <tr>
        <td>
          qyelo:{ofs(id).newqrating}
        </td>
      </tr>
    </tbody>
    </table>
    {:else if ofs(id).status==2 || ofs(id).status==4}  
    <table>
      <tbody>
      <tr>
        <td>
          <h2>
            <BadgeCheckSolid size="md" class="text-red-700 dark:text-green-300 inline m-1"/>{ofs(ofs(id).qrating).name}      
          </h2>
        </td>
      </tr>
      
      <tr>
        <td>
          games: {ofs(ofs(id).qrating).games}
        </td>
      </tr>
      <tr>
        <td>
          wins:{ofs(ofs(id).qrating).wins}
        </td>
      </tr>
      <tr>
        <td>
          qyelo:{ofs(ofs(id).qrating).newqrating}
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
