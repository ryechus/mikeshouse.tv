// import { defineAction } from "astro:actions";
// import { z } from "astro/zod";

// export const server = {
//   helloWorld: defineAction({
//     input: z.object({
//       name: z.string(),
//     }),
//     handler: async (input) => {
//       return `Hello, ${input.name}`;
//     },
//   }),
//   getCart: defineAction({
//     input: z.object({
//       cartUUID: z.string(),
//     }),
//     handler: async (input, context) => {
//       const cartCached = await fetch(
//         `http://localhost:8000/cart/${input.cartUUID}`,
//       );
//       const response = await cartCached.json();
//       return response;
//     },
//   }),
// };
