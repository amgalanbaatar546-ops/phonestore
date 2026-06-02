import { pgTable, text, serial, boolean, real, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const phonesTable = pgTable("phones", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  price: real("price").notNull(),
  originalPrice: real("original_price"),
  imageUrl: text("image_url").notNull(),
  imageUrl2: text("image_url_2"),
  imageUrl3: text("image_url_3"),
  description: text("description"),
  specs: text("specs"),
  categoryId: integer("category_id").notNull(),
  featured: boolean("featured").notNull().default(false),
  inStock: boolean("in_stock").notNull().default(true),
  rating: real("rating"),
  reviewCount: integer("review_count"),
  color: text("color"),
  storage: text("storage"),
  modelType: text("model_type").default("generic"),
});

export const insertPhoneSchema = createInsertSchema(phonesTable).omit({ id: true });
export type InsertPhone = z.infer<typeof insertPhoneSchema>;
export type Phone = typeof phonesTable.$inferSelect;
