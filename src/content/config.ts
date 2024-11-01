import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      image: image().refine((img) => img.width < 1200, {
        message: "Image must be lower than 1200px",
      }),
      // author: z.string(),
      author: reference("author"),
      tags: z.array(z.string()),
      isDraft: z.boolean().default(false), // para mostrar u ocultar el post
    }),
});

const authorCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image().refine((img) => img.width < 1200, {
        message: "Image must be lower than 1200px",
      }),
      twitter: z.string(),
      linkedIn: z.string(),
      github: z.string(),
      bio: z.string(),
      subtitle: z.string(),
    }),
});

export const collections = {
  blog: blogCollection,
  author: authorCollection,
};
