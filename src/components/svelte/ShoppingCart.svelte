<script lang="ts">
  import ShoppingCartIcon from "@images/icons/shopping_cart.svg";
  import { cartState2, getCartFromRemote } from "@lib/cart";
  import { derived } from "svelte/store";

  import { onMount } from "svelte";

  const cartQuantity = derived(cartState2, ($cartState2) =>
    $cartState2.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  let { cartIconSize = 35 } = $props();

  console.log("hello, world");

  const handleEvent = (event: any) => {
    console.log("test");
    // Check if state exists to ignore initial page load popstate in some browsers
    if (event.state) {
      console.log("State changed to:", event.state);
      // Your logic here
    }
  };

  onMount(() => {
    console.log("on mount");
    window.addEventListener("popstate", handleEvent);
    () => window.removeEventListener("popstate", handleEvent);
  });
</script>

<div id="cartDiv">
  <span
    id="numCartItems"
    class="float-left font-roboto-flex font-bold absolute text-xs top-2 -right-3"
    >{$cartQuantity > 0 ? $cartQuantity : ""}</span
  >
  <a href="/cart">
    <img
      src={ShoppingCartIcon.src}
      width={cartIconSize}
      height={cartIconSize}
      alt=""
    />
    <!-- <ShoppingCartIcon width={cartIconSize} height={cartIconSize} /> -->
  </a>
</div>

<!-- <script>
  import { getCartFromRemote } from "@lib/cart";
  const cartItemsElem = document.getElementById("numCartItems");
  const cartDiv = document.getElementById("cartDiv");
  const cart = await getCartFromRemote();
  let numItems = 0;

  if (cart) {
    cart.items.map((item) => {
      numItems += item.quantity;
    });
  }

  if (cartItemsElem && numItems > 0) {
    cartItemsElem.innerHTML = `${numItems}`;
    cartDiv?.classList.remove("hidden");
  }
</script> -->
