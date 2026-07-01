import { backendUrl } from '@config';
import { CartSchema, type Cart } from "./types";
import * as z from "zod/v4";

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

export const getCartFromRemote = async (): Promise<void | Cart> => {
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
  };
  const req = await fetch(
    `${backendUrl}/cart/${existingCartUID}/item/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  const resp = await req.json();

  console.log(resp);
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
