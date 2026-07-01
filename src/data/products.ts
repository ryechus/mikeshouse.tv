import MikesHouseV2 from "../layouts/MikesHouseV2.astro";
import BlackBarShirt from "@images/product photos/black bar.png";
import OnlineAftersShirt from "@images/product photos/online afters.png";
import MorseCodeShirt from "@images/product photos/morse code 1.png";
import PorscheShirt from "@images/product photos/porsche.png";
import { apparelCategoryId, backendUrl } from "@config";

interface Product {
  id?: string;
  image: string;
  name: string;
  price: string | number;
  slug: string;
  description?: string;
  available?: boolean;
  purchaseLink?: string;
}

const getProductsFromAPI = async () => {
  const req = await fetch(
    `${backendUrl}/catalog_by_category/${apparelCategoryId}`,
  );

  return await req.json();
};

export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize("NFD") // Split accented letters from accents
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "") // Remove non-alphanumeric characters (except spaces and hyphens)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
};

const getProductsForUI = async () => {
  const productsMap: Product[] = [];
  await getProductsFromAPI().then((response) => {
    const objects = response["objects"];
    const images = response["related_objects"];
    objects.map((obj: any) => {
      if (obj.type === "ITEM") {
        let imageUrl = "";
        const image = images.map((item: any) => {
          if (obj.item_data.image_ids.includes(item.id)) {
            imageUrl = item.image_data.url;
          }
        });
        if (!(obj.id in productsMap)) {
          productsMap.push({
            id: obj.id,
            image: imageUrl,
            name: obj.item_data.name,
            slug: slugify(obj.item_data.name),
            description: obj.item_data.description_html,
            available: true,
            price:
              obj.item_data.variations[0].item_variation_data.price_money
                .amount / 100,
          });
        }
      }
    });
  });
  return productsMap;
};

export const products = await getProductsForUI();
