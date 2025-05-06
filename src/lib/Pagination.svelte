<script>
    export let rows;
    export let perPage;
	export let trimmedRows;
    import { ButtonGroup, Button } from "flowbite-svelte";
    import { AngleRightOutline, AngleLeftOutline } from "flowbite-svelte-icons";
    $: totalRows = rows.length 
    $: currentPage = 0
    $: totalPages = Math.ceil(totalRows / perPage) 
    $: start =  currentPage * perPage
    $: end = currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1  ;

		$: trimmedRows = rows.slice(start, end + 1);

    $: totalRows, currentPage = 0
    $: currentPage, start, end

</script>

    {#if totalRows && totalRows > perPage}
        <div class='pagination'>
            <ButtonGroup class="*:ring-primary-700!">
            <Button on:click={() => currentPage -= 1} 
                disabled={currentPage === 0 ? true : false} 
                aria-label="left arrow icon" 
                aria-describedby="prev">
                <AngleLeftOutline class="ms-2 h-5 w-5" />
            </Button>
            <span id='prev' class='sr-only'>Load previous {perPage} rows</span>
            {#if currentPage>=0 && currentPage<=2}
            <Button on:click={() => currentPage=0} 
                disabled={currentPage === 0 ? true : false}
                aria-label="right arrow icon" 
                aria-describedby="next">
                1
            </Button>
            <Button on:click={() => currentPage= 1} 
                disabled={currentPage === 1 ? true : false}
                aria-label="right arrow icon" 
                aria-describedby="next">
                2
            </Button>
            <Button on:click={() => currentPage=2} 
                disabled={currentPage === 2 ? true : false}
                aria-label="right arrow icon" 
                aria-describedby="next">
                3
            </Button>
            <Button on:click={() => currentPage=3} 
                disabled={currentPage === 3 ? true : false}
                aria-label="right arrow icon" 
                aria-describedby="next">
                4
            </Button>
            <Button on:click={() => currentPage=4} 
                disabled={currentPage === 4 ? true : false}
                aria-label="right arrow icon" 
                aria-describedby="next">
                5
            </Button>
            <Button on:click={() => currentPage=totalPages-1} 
                aria-label="right arrow icon" 
                aria-describedby="next">
               ...{ totalPages}
            </Button>
            {:else if totalPages-2>currentPage && currentPage>=3}
            <Button on:click={() => currentPage=0} 
                aria-label="right arrow icon" 
                aria-describedby="next">
                1...
            </Button>
            <Button on:click={() => currentPage-= 2} 
                aria-label="right arrow icon" 
                aria-describedby="next">
                {currentPage-2}
            </Button>
            <Button on:click={() => currentPage-= 1} 
                aria-label="right arrow icon" 
                aria-describedby="next">
                {currentPage-1}
            </Button>
            <Button on:click={() => currentPage} 
                disabled={currentPage === currentPage ? true : false}
                aria-label="right arrow icon" 
                aria-describedby="next">
                {currentPage}
            </Button>
            <Button on:click={() => currentPage+= 1} 
                aria-label="right arrow icon" 
                aria-describedby="next">
                {currentPage+1}
            </Button>
            <Button on:click={() => currentPage+= 2}  
                aria-label="right arrow icon" 
                aria-describedby="next">
                {currentPage+2}
            </Button>
            <Button on:click={() => currentPage=totalPages-1} 
                aria-label="right arrow icon" 
                aria-describedby="next">
                ...{totalPages}
            </Button>
            {:else if totalPages-2<=currentPage}
            <Button on:click={() => currentPage=0} 
                aria-label="right arrow icon" 
                aria-describedby="next">
                1...
            </Button>
            <Button on:click={() => currentPage=totalPages-4} 
                disabled={currentPage === totalPages - 4 ? true : false}
                aria-label="right arrow icon" 
                aria-describedby="next">
                {totalPages-3}
            </Button>
            <Button on:click={() => currentPage=totalPages-3} 
                
                disabled={currentPage === totalPages - 3 ? true : false}
                aria-label="right arrow icon" 
                aria-describedby="next">
                {totalPages-2}
            </Button>
            <Button on:click={() => currentPage=totalPages-2}  
                disabled={currentPage === totalPages - 2 ? true : false}
                aria-label="right arrow icon" 
                aria-describedby="next">
                {totalPages-1}
            </Button>
            <Button on:click={() => currentPage=totalPages-1} 
                disabled={currentPage === totalPages - 1 ? true : false}
                aria-label="right arrow icon" 
                aria-describedby="next">
                {totalPages}
            </Button>
            
            {/if}
            
            <Button on:click={() => currentPage += 1} 
                disabled={currentPage === totalPages - 1 ? true : false} 
                aria-label="right arrow icon" 
                aria-describedby="next">
                <AngleRightOutline class="ms-2 h-5 w-5" />
            </Button>
            </ButtonGroup>
            <span id='next' class='sr-only'>Load next {perPage} rows</span>
        </div>
    {/if}


<style>
    .sr-only {
      position: absolute;
      clip: rect(1px, 1px, 1px, 1px);
      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
    }
    
    .pagination {
        display: flex;
        align-items: center;
        justify-content: left;
        pointer-events: all;
    }

    .pagination  {
        margin: 0 1rem;
    }

    .selected {
        background-color: var(--accent-color)
    }
	
	Button {
		display: flex;
	}
	
</style>