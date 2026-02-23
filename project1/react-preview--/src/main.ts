import './style.css'
import { setupCounter } from './counter.ts'
import Card from "./test/app.tsx"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <Card variant={"primary"}>
        <Card.Content title={"중요카드"}>테스트</Card.Content>
    </Card>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
