import { backendUrl } from "@config";
import { CartSchema, type Cart } from "./types";
import * as z from "zod/v4";

import { persistentJSON, persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";

export const cartState = persistentJSON<Cart>("cart");
export const cartUpdated = atom<boolean>(false);

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
    cartState.set(response);
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
  const existingCartUID = await getCurrentCart();

  const body = {
    uid: e.target.dataset.id,
    quantity: 1,
    thumbnailUrl: e.target.dataset.thumbnailUrl,
    price: e.target.dataset.price,
    name: e.target.dataset.name,
  };

  const req = await fetch(`${backendUrl}/cart/${existingCartUID}/item/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const resp = await req.json();
};

export function showCart() {
  const cartDiv = document.getElementById("cartDiv");

  let cartCookie = getCookie(cartCookieName);

  if (cartCookie) {
    cartDiv?.classList.remove("hidden");
  }
}

interface CartItems {
  itemUUID: string;
  quantity: number;
}

export interface CartCookie {
  items: { [key: string]: CartItems };
}
