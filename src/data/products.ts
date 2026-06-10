import MikesHouseV2 from "../layouts/MikesHouseV2.astro";
import BlackBarShirt from "@images/product photos/black bar.png";
import OnlineAftersShirt from "@images/product photos/online afters.png";
import MorseCodeShirt from "@images/product photos/morse code 1.png";
import PorscheShirt from "@images/product photos/porsche.png";

interface Product {
  id?: string;
  image: string;
  name: string;
  price: string;
  slug: string;
  description?: string;
  available?: boolean;
  purchaseLink?: string;
}

export const products: Product[] = [
  {
    image: BlackBarShirt.src,
    name: "OG Black Bar Tee",
    // description: "100% cotton 7oz unisex t-shirt",
    price: "28",
    slug: "black-bar-tee",
    available: true,
    purchaseLink: "https://square.link/u/SBtk0Zcy",
    id: "1",
  },
  {
    image: OnlineAftersShirt.src,
    name: "Online Afters Tee",
    description: "100% cotton 7oz unisex t-shirt",
    price: "32",
    slug: "online-afters-tee",
  },
  {
    image: MorseCodeShirt.src,
    name: "Mike's House Morse Code Tee",
    description: "100% cotton 7oz unisex t-shirt",
    price: "32",
    slug: "morse-code-tee",
  },
  {
    image: PorscheShirt.src,
    name: "Mike's House Porsche Tee",
    description: "100% cotton 7oz unisex t-shirt",
    price: "32",
    slug: "racing-tee",
  },
];
