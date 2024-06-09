import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// type Expense = {
//   id: number;
//   title: string;
//   amount: number;
// };

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 50 },
  { id: 2, title: "Game", amount: 100 },
  { id: 3, title: "Rent", amount: 500 },
];

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
})

type Expense = z.infer<typeof expenseSchema>

const createPostSchema = expenseSchema.omit({id: true});

export const expensesRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ expense: fakeExpenses });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const data = await c.req.valid("json");
    fakeExpenses.push({ ...data, id: fakeExpenses.length + 1 });
    // const newExpense = createPostSchema.parse(data);
    c.status(201);
    return c.json(data);
  })
  .get("/total-spent", (c) => {
    const total = fakeExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    return c.json({ total });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expenseById = fakeExpenses.find((ex) => ex.id == id);
    if (expenseById === undefined) {
      return c.notFound();
    }
    return c.json({ expenseById });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((ex) => ex.id == id);
    if (index === -1) {
      return c.notFound();
    }
    const deleteExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deleteExpense });
  });
// .put
