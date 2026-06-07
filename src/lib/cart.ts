function getCookie(name: string): string | null {
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

const addToCart = (item: any): void => {
  const cart = getCookie(item);
  if (getCookie(item)) {
    console.log(cart);
  }
  console.log("no cart");
};
