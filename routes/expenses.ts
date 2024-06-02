import { Hono } from 'hono';

type Expense = {
  id: number;
  title: string;
  amount: number;
}

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 50},
  { id: 2, title: "Game", amount: 100},
  { id: 3, title: "Rent", amount: 500},
];

export const expensesRoute = new Hono()
.get("/", async (c) => {
  return c.json({ expense: []})
})
.post("/", async (c) => {
  const newExpense = await c.req.json();
  console.log({newExpense});
  return c.json(newExpense);
})
// .delete
// .put