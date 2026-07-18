import { apparelCategoryId, backendUrl, sqaureLocationId } from "@config";
import { slugify } from "@lib/utils";
import { type Product } from "@lib/types";

const getProductsFromAPI = async () => {
  const req = await fetch(
    `${backendUrl}/catalog_by_category/${apparelCategoryId}`,
  );

  return await req.json();
};

const getProductsForUI = async () => {
  const productsMap: Product[] = [];
  await getProductsFromAPI().then((response) => {
    const objects = response["objects"];
    const images = response["related_objects"];
    const filteredObjects = objects.filter(
      (obj: any) => !obj.absent_at_location_ids.includes(sqaureLocationId),
    );
    filteredObjects.map((obj: any) => {
      if (obj.type === "ITEM") {
        let imageUrl = "";
        const image = images.map((item: any) => {
          if (obj.item_data.image_ids.includes(item.id)) {
            imageUrl = item.image_data.url;
          }
        });
        if (!(obj.id in productsMap)) {
          productsMap.push({
            id: obj.item_data.variations[0].id,
            image: imageUrl,
            name: obj.item_data.name,
            slug: slugify(obj.item_data.name),
            description: obj.item_data.description_html,
            available: true,
            price:
              obj.item_data.variations[0].item_variation_data.price_money
                .amount / 100,
            variations: obj.item_data.variations,
          });
        }
      }
    });
  });
  return productsMap;
};

export const products = await getProductsForUI();
