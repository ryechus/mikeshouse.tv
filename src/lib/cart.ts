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

  const cartItemsElem = document.getElementById("numCartItems");

  let numItems = 0;
  if (cartCookie) {
    const cartJSON: CartCookie = JSON.parse(cartCookie);
    const items = cartJSON.items;
    if (itemId in items) {
      items[itemId].quantity += 1;
    } else {
      items[itemId].quantity = 1;
    }

    document.cookie = `${cartCookieName}=${JSON.stringify(cartJSON)}; path=/`;

    for (const [key, value] of Object.entries(cartJSON.items)) {
      numItems += value.quantity;
    }

    if (cartItemsElem) {
      cartItemsElem.innerHTML = `${numItems}`;
    }
    console.log(cartJSON);
  } else {
    const newCart: CartCookie = {
      items: {
        [itemId]: {
          quantity: 1,
        },
      },
    };

    numItems += 1;

    document.cookie = `${cartCookieName}=${JSON.stringify(newCart)}; path=/`;
  }

  if (cartItemsElem) {
    cartItemsElem.innerHTML = `${numItems}`;
  }

  const cartDiv = document.getElementById("cartDiv");
  cartDiv?.classList.remove("hidden");
};

export function showCart() {
  const cartDiv = document.getElementById("cartDiv");

  let cartCookie = getCookie(cartCookieName);

  if (cartCookie) {
    cartDiv?.classList.remove("hidden");
  }
}

interface CartItems {
  quantity: number;
}

export interface CartCookie {
  items: { [key: string]: CartItems };
}
