import type { uuidv4 } from "zod/v4";

import * as z from "zod";

const CartItemSchema = z.object({
  uid: z.string(),
  quantity: z.number(),
  thumbnailUrl: z.string().optional(),
  name: z.string(),
  price: z.union([z.string(), z.number()]),
  variation: z
    .object({
      name: z.string().optional(),
    })
    .default({}),
});

export const CartSchema = z.object({
  uid: z.string().default(""),
  items: z.array(CartItemSchema).default([]),
});

export type Cart = z.infer<typeof CartSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;

interface ProductVariation {
  id: string;
  item_variation_data: {
    name: string;
    price_money: {
      amount: number;
    };
  };
}

export interface Product {
  id: string;
  image: string;
  name: string;
  price: string | number;
  slug: string;
  description?: string;
  available?: boolean;
  purchaseLink?: string;
  variations: Array<ProductVariation>;
}
