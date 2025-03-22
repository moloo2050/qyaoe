<script>
  import { Card, Listgroup, Avatar } from 'flowbite-svelte';
  // svelte-ignore export_let_unused
    export let news;
  
</script>

<Card padding="xl" size="md">
  <div class="flex justify-between items-center mb-4">
    
  </div>
  <Listgroup items={news.news.sort(function(a, b){return b.id-a.id})} let:item class="border-0 dark:bg-transparent!">
    <div class="flex items-center space-x-4 rtl:space-x-reverse">
      <Avatar src='.\private\{item.img}.jpg' alt={item.img} class="shrink-0" />
      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
        <a  href="{item.url}" target="_blank" rel="noopener norefferrer">{item.news}</a>
      </div>
  </Listgroup>
</Card>
  