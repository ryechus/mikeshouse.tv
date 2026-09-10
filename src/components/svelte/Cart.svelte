<script lang="ts">
  import { backendUrl } from "@config";
  import { addToCartV2, cartState2, cartQuantity } from "@lib/cart";
  import type { CartItem } from "@lib/types";
  import { slugify } from "@lib/utils";
  import { derived } from "svelte/store";

  const cartSubtotal = derived(cartState2, ($cartState2) =>
    $cartState2.items.reduce(
      (sum, item) => sum + (item.price as number) * item.quantity,
      0,
    ),
  );

  const shippingTotal = derived(
    cartState2,
    ($cartState2) => $cartState2.shippingFee,
  );

  const cartTotal = derived(
    cartSubtotal,
    ($cartSubtotal) => $cartSubtotal + $shippingTotal,
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
          <p class="text-xs">
            <span class="text-left text-gray-400">{item.variation.name}</span>
            ${item.price}
          </p>
        </div>
        <div class="text-right text-xs">
          <div class="flex flex-row justify-end mb-2 items-center">
            <button
              class="btn btn-xs btn-neutral btn-soft"
              onclick={async () => updateQuantity(item, -1)}>-</button
            >
            <p class="mx-2">{item.quantity}</p>
            <button
              class="btn btn-xs btn-neutral btn-soft"
              onclick={async () => updateQuantity(item, 1)}>+</button
            >
          </div>
          <p class="text-sm">${(item.price as number) * item.quantity}</p>
        </div>
      </div>
    {/each}
    <div class="grid grid-cols-4 items-middle -mt-3 mb-3">
      <div class="text-right col-span-4 font-bold">
        <a href="/shop">+ add more items</a>
      </div>
    </div>
    {#if $cartSubtotal > 0}
      <div class="grid grid-cols-4 items-end py-2">
        <div class="text-right"></div>
        <div class="col-span-2 text-right">
          <p>Subtotal</p>
        </div>
        <div class="text-right">
          <p>${$cartSubtotal.toFixed(2)}</p>
        </div>
      </div>
      <div class="grid grid-cols-4 items-end py-2">
        <div class="text-right"></div>
        <div class="col-span-2 text-right">
          <p>Shipping</p>
        </div>
        <div class="text-right">
          <p>${$shippingTotal.toFixed(2)}</p>
        </div>
      </div>
      <div class="grid grid-cols-4 items-end py-2">
        <div class="text-right"></div>
        <div class="col-span-2 text-right font-bold">
          <p>Total</p>
        </div>
        <div class="text-right font-bold">
          <p>${$cartTotal.toFixed(2)}</p>
        </div>
      </div>
    {/if}
    <div class="py-2">
      <form action="{backendUrl}/cart/payment-link/{$cartState2.uid}">
        <button
          disabled={$cartQuantity <= 0}
          class="btn btn-neutral text-white float-right disabled"
          >Checkout</button
        >
      </form>
    </div>
  </div>
</div>
