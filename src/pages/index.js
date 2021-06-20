import { getSession } from "next-auth/client";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon clone</title>
      </Head>


      {/* stripe listen --forward-to localhost:3000/api/webhook */}

      {/* Header */}


      <Header />

      <main className="max-w-screen-2xl mx-auto">

        {/* Banner */}
        <Banner />

        {/* ProductFeed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  )

  return {
    props: {
      products: products || null,
      session,
    },
  };
}

// api endpoint https://fakestoreapi.com/products
