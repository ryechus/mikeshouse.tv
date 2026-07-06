<script lang="ts">
  import { cartState, getCartFromRemote } from "@lib/cart";
  const cart = await getCartFromRemote();
</script>

<div id="flex flex-col">
  <div class="max-w-screen w-150 px-10 text-left font-roboto-flex">
    {#each $cartState?.items as item}
      <div>
        <img class="float-left w-20 mr-5" src={item.thumbnailUrl} alt="" />
        <div class="py-2 flex flex-row items-center">
          <div class="w-3/4">
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
          <div class="w-1/4 text-center">
            <p class="">${item.price * 3}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
