import { Button } from 'primereact/button'
import Link from 'next/link';
import { redirect } from 'next/navigation'

export default function Home() {


  return (
    <main>
      <h1>Home</h1>
      <Button>
           <Link href="/payment">
             Im Buttom
           </Link>
      </Button>
    </main>
  );
}
