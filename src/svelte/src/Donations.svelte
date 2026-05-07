<script lang="ts">
  async function getCatalogItem(): Promise<any> {
    const response = await fetch(
      "http://localhost:8000/catalog/object/ME2G26AQX4OYVZJZI6ARBFIH",
    );
    const body = await response.json();
    return body;
  }

  const object = await getCatalogItem();
  const item = object.object;
  const customVariationId = item.item_data.variations[3].id;

  let activeVariation = $state(item.item_data.variations[1].id);
  let activePricingType = $state(
    item.item_data.variations[1].item_variation_data.pricing_type,
  );
  const initialAmount = (
    item.item_data.variations[1].item_variation_data.price_money.amount / 100
  ).toFixed(2);
  let donationAmount = $state(initialAmount);
  const buttonClasses =
    "mx-2 my-2 bg-black text-white p-4 py-3 rounded-md hover:bg-gray-100 hover:text-black border-3 cursor-pointer text-2xl w-30 uppercase";

  function updateActive(e: MouseEvent | FocusEvent) {
    const target = e.target as HTMLElement;
    activeVariation = target.id;
    donationAmount = (
      (target.dataset.priceAmount as unknown as number) / 100
    ).toFixed(2);
    activePricingType = target.dataset.priceType;
  }

  function submit(e: MouseEvent) {
    console.log(activeVariation, activePricingType, donationAmount);
  }
</script>

<div class="uppercase">
  <div class="flex flex-row flex-wrap justify-center max-w-112">
    {#each item.item_data.variations.slice(0, 3) as variation}
      <button
        id={variation.id}
        onclick={updateActive}
        data-price-amount={variation.item_variation_data.price_money.amount}
        data-price-type={variation.item_variation_data.pricing_type}
        class="{buttonClasses} {activeVariation == variation.id
          ? 'active'
          : ''}">{variation.item_variation_data.name}</button
      >
    {/each}
  </div>
  <div
    class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-black outline-3 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 w-30 mx-auto text-2xl my-3"
  >
    <div class="text-gray-500 select-none">$</div>
    <input
      id={customVariationId}
      data-price-type="VARIABLE_PRICING"
      type="number"
      name="price"
      placeholder="0.00"
      onfocus={updateActive}
      bind:value={donationAmount}
      class="w-full p-4 py-3 pl-1 placeholder:text-gray-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none uppercase text-center"
    />
  </div>
  <div class="mt-5">
    <button
      onclick={submit}
      class="underline hover:no-underline uppercase text-2xl cursor-pointer hover:text-gray-900"
    >
      Pay
    </button>
  </div>
</div>

<style>
  @reference "tailwindcss";

  button.active {
    @apply bg-gray-100 text-black;
  }
</style>
