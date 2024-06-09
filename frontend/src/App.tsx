import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    (async function fetchTotal() {
      const res = await fetch('/api/expenses/total-spent');
      const data = await res.json();
      console.log(data);
      setTotalSpent(data.total);
    })();
  }, [])

  return (
    <Card className="w-[350px] m-auto">
    <CardHeader>
      <CardTitle>Total Spent</CardTitle>
      <CardDescription>amount of you've spent</CardDescription>
    </CardHeader>
    <CardContent>
      {totalSpent}
    </CardContent>
    </Card>
  )
}

export default App;