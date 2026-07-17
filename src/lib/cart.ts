import { backendUrl } from "@config";
import { CartSchema, type Cart, type CartItem } from "./types";
import * as z from "zod/v4";

import { persistentJSON, persistentAtom } from "@nanostores/persistent";
import { atom, map } from "nanostores";
import { SvelteMap } from "svelte/reactivity";
import { derived } from "svelte/store";

// export const cartState = persistentJSON<Cart>("cart", CartSchema.parse({}));
export const cartState2 = persistentJSON<Cart>("cart", CartSchema.parse({}));

export const cartUpdated = atom<boolean>(false);

export const thisCartState = new SvelteMap();

// thisCartState.set(cartState.get());

export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
}

export const cartCookieName = "cartUID";

export const getCartUUIDFromCookie = (): string => {
  let cartCookie = getCookie(cartCookieName);
  if (cartCookie) {
    return cartCookie;
  }
  return "";
};

export const getCartFromRemote = async (): Promise<void | Cart | null> => {
  const cartUID = await getCurrentCart();
  try {
    const cartCached = await fetch(`${backendUrl}/cart/${cartUID}`);
    const response = await cartCached.json();
    try {
      await CartSchema.parseAsync(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.issues);
      }
      throw error;
    }
    cartState2.set(response);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentCart = async () => {
  let existingCartUID = getCartUUIDFromCookie();
  if (!existingCartUID) {
    const cartUUID: string = crypto.randomUUID();
    existingCartUID = cartUUID;

    document.cookie = `${cartCookieName}=${cartUUID}; path=/`;
  }
  return existingCartUID;
};

export const addToCart = async (e: any): Promise<void> => {
  const body = {
    uid: e.target.dataset.id,
    quantity: e.target.dataset.quantity,
    thumbnailUrl: e.target.dataset.thumbnailUrl,
    price: e.target.dataset.price,
    name: e.target.dataset.name,
    variation: {
      name: e.target.dataset.variationName,
    },
  };

  await addToCartV2(body, e.target.dataset.quantity);
};

export const addToCartV2 = async (
  item: CartItem,
  quantity: number,
): Promise<void> => {
  const existingCartUID = await getCurrentCart();

  const body = {
    uid: item.uid,
    quantity: quantity,
    thumbnailUrl: item.thumbnailUrl,
    price: item.price,
    name: item.name,
    variation: item.variation,
  };

  const req = await fetch(`${backendUrl}/cart/${existingCartUID}/item/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const resp = await req.json();
  // await getCartFromRemote();
  cartState2.set(resp);
};

export const cartQuantity = derived(cartState2, ($cartState) =>
  $cartState.items.reduce((sum, item) => sum + item.quantity, 0),
);

await getCartFromRemote();
