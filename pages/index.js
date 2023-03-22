import axios from 'axios'
import Head from 'next/head'
import SubscriptionCard from '@/components/subscriptionCard'

export default function Home({subscriptions}) {
  return (
    <>
      <Head>
        <title>Subscriptions</title>
        <meta name="description" content="Subscriptions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col items-center h-[100vh]'>
        <div className='mt-12 w-4/12 text-left p-5'>
          <h1>Subscriptions</h1>
        </div>
        <div className='w-4/12 flex-grow'>
          {subscriptions.map(sub => <SubscriptionCard data={sub} key={sub.id_subscription}/>)}
          <div className='w-full text-center'>
            <button>Show more</button>
          </div>
        </div>
        <div>
          Footer
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const  { data: subscriptions } = await axios.get('http://localhost:3000/api/subscription')

  return {
    props: { subscriptions },
  }
}
