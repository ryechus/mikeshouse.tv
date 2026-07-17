<script lang="ts">
  import { type Product } from "@lib/types";
  import { products } from "@data/products";
  import { addToCart, cartQuantity } from "@lib/cart";
  const sizeMap: Record<string, string> = {
    Small: "S",
    Medium: "M",
    Large: "L",
    "X-Large": "XL",
    "2X-Large": "2XL",
  };
  const cartBtnId = "cartButton";

  let { product }: { product: Product } = $props();

  let quantity = $state(1);
  let selectedProduct = $state({
    id: product.id || "",
    name: product.name,
    variationName: product.variations[0].item_variation_data.name,
    price: product.price,
  });
  let cartHasItems = $derived($cartQuantity > 0);

  const findProduct = (uid: string) => {
    const result = products.filter((product) => product.id === uid);
    if (result.length > 0) {
      return result[0];
    }
  };

  const toggleActiveSize = (e: any) => {
    const currentActive = document.getElementsByClassName("btn-active");

    for (const element of currentActive) {
      element.classList.remove("btn-active");
    }

    selectedProduct.id = e.target.dataset.id;
    selectedProduct.variationName = e.target.dataset.name;
    selectedProduct.price = e.target.dataset.price;

    e.target.classList.add("btn-active");
  };

  const handleAddToCart = async (e: any) => {
    const target = e.target;
    target.classList.remove("btn-neutral");
    target.classList.add("btn-success");
    target.innerHTML = "added!";

    await addToCart(e);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    target.classList.remove("btn-success");
    target.classList.add("btn-neutral");
    target.innerHTML = "add to cart";
  };
</script>

<div
  class="font-roboto-flex uppercase font-bold relative leading-5 mt-0 sm:mt-2"
>
  <div class="text-left px-8 mb-4 visible sm:hidden">
    <p class="text-sm"><a href="/shop">&larr;Shop</a></p>
  </div>
  <img
    width="400"
    height="400"
    class="w-7/8 sm:w-2/3 lg:w-1/2 mx-auto -z-10"
    src={product.image}
    alt=""
  />
  <div>
    <p>{product.name}</p>
    <p id="productPrice">${selectedProduct.price}</p>
    <div class="text-xs mt-2">
      {@html product.description}
    </div>

    <div class="w-[300px] mx-auto mt-3 mb-2">
      <div class="flex flex-row justify-around">
        {#each product.variations as obj, idx}
          <button
            onclick={toggleActiveSize}
            data-id={obj.id}
            data-name={obj.item_variation_data.name}
            data-price={obj.item_variation_data.price_money.amount / 100}
            class={`btn btn-neutral btn-outline sizeButtons ${idx === 0 ? "btn-active" : ""}`}
          >
            {sizeMap[obj.item_variation_data.name]}
          </button>
        {/each}
      </div>
    </div>
    <div class="my-2">
      <button
        class="btn btn-square btn-sm"
        onclick={() => (quantity > 1 ? quantity-- : null)}>-</button
      >
      <span class="px-4">{quantity}</span>
      <button class="btn btn-square btn-sm" onclick={() => quantity++}>+</button
      >
    </div>
    <div class="mt-2 w-1/2 max-w-[200px] mx-auto">
      {#if product.available}
        <button
          class="btn btn-neutral text-white btn-block"
          onclick={handleAddToCart}
          data-id={selectedProduct.id}
          data-thumbnail-url={product.image}
          data-price={selectedProduct.price}
          data-name={selectedProduct.name}
          data-quantity={quantity}
          data-variation-name={selectedProduct.variationName}
          id={cartBtnId}
        >
          add to cart
        </button>
      {:else}
        <p class="2xl">sold out</p>
      {/if}
      {#if cartHasItems}
        <a href="/cart">
          <button class="mt-1 btn btn-primary text-white btn-block">
            checkout
          </button>
        </a>
      {/if}
    </div>
  </div>
</div>
