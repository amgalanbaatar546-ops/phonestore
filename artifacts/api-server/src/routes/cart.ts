import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, cartItemsTable, phonesTable } from "@workspace/db";
import {
  AddToCartBody,
  RemoveFromCartParams,
  GetCartResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/cart", async (_req, res): Promise<void> => {
  const items = await db
    .select({
      id: cartItemsTable.id,
      phoneId: cartItemsTable.phoneId,
      quantity: cartItemsTable.quantity,
      phone: phonesTable,
    })
    .from(cartItemsTable)
    .innerJoin(phonesTable, eq(cartItemsTable.phoneId, phonesTable.id))
    .orderBy(cartItemsTable.id);

  res.json(GetCartResponse.parse(items));
});

router.post("/cart", async (req, res): Promise<void> => {
  const parsed = AddToCartBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { phoneId, quantity } = parsed.data;

  const [existing] = await db
    .select()
    .from(cartItemsTable)
    .where(eq(cartItemsTable.phoneId, phoneId));

  let cartItem;
  if (existing) {
    const [updated] = await db
      .update(cartItemsTable)
      .set({ quantity: existing.quantity + quantity })
      .where(eq(cartItemsTable.id, existing.id))
      .returning();
    cartItem = updated;
  } else {
    const [inserted] = await db.insert(cartItemsTable).values({ phoneId, quantity }).returning();
    cartItem = inserted;
  }

  const [phone] = await db.select().from(phonesTable).where(eq(phonesTable.id, phoneId));
  res.status(201).json({ ...cartItem, phone });
});

router.delete("/cart/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = RemoveFromCartParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  await db.delete(cartItemsTable).where(eq(cartItemsTable.id, params.data.id));
  res.sendStatus(204);
});

export default router;
