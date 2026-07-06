<script lang="ts">
  import { backendUrl } from "@config";
  import { cartState, addToCart, addToCartV2, cartState2 } from "@lib/cart";
  import type { CartItem } from "@lib/types";
  import { slugify } from "@lib/utils";
  import { derived } from "svelte/store";

  const cartQuantity = derived(cartState2, ($cartState2) =>
    $cartState2.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const cartTotal = derived(cartState2, ($cartState2) =>
    $cartState2.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ),
  );

  async function updateQuantity(item: CartItem, val: number): Promise<void> {
    await addToCartV2(item, val);
  }

  const items = derived(cartState2, ($cartState2) =>
    $cartState2.items.filter((i) => i.quantity > 0),
  );
</script>

<div id="flex flex-col">
  <div class="max-w-screen w-150 px-10 text-left font-roboto-flex">
    <h1 class="text-xl font-bold">Cart - {$cartQuantity} items</h1>
    {#each $items as item}
      <div class="grid grid-cols-4 items-center py-2 my-4">
        <a href={`/products/${slugify(item.name)}`}>
          <img class="float-left w-20 mr-5" src={item.thumbnailUrl} alt="" /></a
        >
        <div class="col-span-2">
          <p>{item.name}</p>
          <p class="text-xs">${item.price}</p>
        </div>
        <div class="text-right text-xs">
          <div class="flex flex-row justify-end mb-2 items-center">
            <button
              class="btn btn-xs btn-neutral btn-soft"
              on:click={async () => updateQuantity(item, -1)}>-</button
            >
            <p class="mx-2">{item.quantity}</p>
            <button
              class="btn btn-xs btn-neutral btn-soft"
              on:click={async () => updateQuantity(item, 1)}>+</button
            >
          </div>
          <p class="text-sm">${item.price * item.quantity}</p>
        </div>
      </div>
    {/each}
    <div class="grid grid-cols-4 items-end py-2">
      <div class="text-right"></div>
      <div class="col-span-2 text-right font-bold">
        <p>Estimated Total</p>
      </div>
      <div class="text-right font-bold">
        <p>${$cartTotal}</p>
      </div>
      <div class="col-span-4">
        <p class="text-gray-400 italic text-right text-xs">
          tax and shipping calculated at checkout
        </p>
      </div>
    </div>
    <div class="py-2">
      <form action="{backendUrl}/cart/payment-link/{$cartState?.uid}">
        <button class="btn btn-neutral text-white float-right">Checkout</button>
      </form>
    </div>
  </div>
</div>
