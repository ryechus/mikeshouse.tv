import type { uuidv4 } from "zod/v4";

import * as z from "zod";

const CartItemSchema = z.object({
  uid: z.string(),
  quantity: z.number(),
  thumbnailUrl: z.string().optional(),
  name: z.string(),
  price: z.number(),
});

export const CartSchema = z.object({
  uid: z.string(),
  items: z.array(CartItemSchema),
});

export type Cart = z.infer<typeof CartSchema>;
