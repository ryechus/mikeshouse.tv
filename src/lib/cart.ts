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

export const cartCookieName = "cart";

export const addToCart = (e: any): void => {
  const itemId = e.target.dataset.id;
  console.log(e.target.dataset.id);
  let cartCookie = getCookie(cartCookieName);
  if (cartCookie) {
    const cartJSON: CartCookie = JSON.parse(cartCookie);
    const items = cartJSON.items;
    if (itemId in items) {
      items[itemId].quantity += 1;
    } else {
      items[itemId].quantity = 1;
    }

    document.cookie = `${cartCookieName}=${JSON.stringify(cartJSON)};`;
    console.log(cartJSON);
  } else {
    const newCart: CartCookie = {
      items: {
        [itemId]: {
          quantity: 1,
        },
      },
    };

    document.cookie = `${cartCookieName}=${JSON.stringify(newCart)};`;
  }
};

interface CartItems {
  quantity: number;
}

export interface CartCookie {
  items: { [key: string]: CartItems };
}
