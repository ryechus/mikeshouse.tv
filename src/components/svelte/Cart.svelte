<script lang="ts">
  import { backendUrl } from "@config";
  import { slugify } from "@data/products";
  import { cartState } from "@lib/cart";

  function goToCheckout() {
    console.log(cartState.get()?.uid);
  }

  const cartTotal = (): number => {
    let total = 0;
    const cart = cartState.get();

    cart?.items.map((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const cartQuantity = (): number => {
    let total = 0;
    const cart = cartState.get();

    cart?.items.map((item) => {
      total += item.quantity;
    });
    return total;
  };
</script>

<div id="flex flex-col">
  <div class="max-w-screen w-150 px-10 text-left font-roboto-flex">
    <h1 class="text-xl font-bold">Cart - {cartQuantity()} items</h1>
    {#each $cartState?.items as item}
      <div class="grid grid-cols-4 items-center py-2 my-4">
        <a href={`/products/${slugify(item.name)}`}>
          <img class="float-left w-20 mr-5" src={item.thumbnailUrl} alt="" /></a
        >
        <div class="col-span-2">
          <p>{item.name}</p>
          <p>${item.price}</p>
        </div>
        <div class="text-right">
          <div class="flex flex-row justify-end mb-2">
            <button class="btn btn-xs">-</button>
            <p class="mx-2">{item.quantity}</p>
            <button class="btn btn-xs">+</button>
          </div>
          <p>${item.price * item.quantity}</p>
        </div>
      </div>
    {/each}
    <div class="grid grid-cols-4 items-end py-2">
      <div class="text-right"></div>
      <div class="col-span-2 text-right font-bold">
        <p>Estimated Total</p>
      </div>
      <div class="text-right font-bold">
        <p>${cartTotal()}</p>
      </div>
      <div class="col-span-4">
        <p class="text-gray-400 italic text-right text-xs">
          tax and shipping calculated at checkout
        </p>
      </div>
    </div>
    <div class="py-2">
      <form action="{backendUrl}/cart/payment-link/{$cartState?.uid}">
        <button
          on:click={goToCheckout}
          class="btn btn-neutral text-white float-right">Checkout</button
        >
      </form>
    </div>
  </div>
</div>
