import Head from "next/head"
import Image from "next/image"
import { useSelector } from "react-redux"
import CheckOutProduct from "../components/CheckOutProduct"
import Header from "../components/Header"
import { selectItems, selectTotal } from "../slices/basketSlice"
import Currency from 'react-currency-formatter'
import { useSession } from "next-auth/client"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"

const stripePromise = loadStripe(process.env.stripe_public_key)

const checkout = () => {
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const [session] = useSession()

    const createCheckOutSession = async () => {
        const stripe = await stripePromise;

        // call the backend
        const checkOutSession = await axios.post('/api/create-checkout-session', {
            items: items,
            email: session.user.email
        })
        // redirect the customer to checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkOutSession.data.id
        })
        if (result.error) alert(result.error.message)
    }

    return (

        <div className="bg-gray-100 capitalize">
            <Head>
                <title>Amazon clone || backet</title>
            </Head>

            <Header />

            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* LeftSection */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image src="/images/Prime-day-banner.png" height={250} width={1020} objectFit="contain" />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">{items.length === 0 ? 'Your Amazon Basket is empty' : 'your shopping basket'}</h1>

                        {items.map((item, i) => (
                            <CheckOutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                image={item.image}
                                category={item.category}
                                hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>
                </div>
                {/* RightSection */}

                <div className="capitalize flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap">subtotal ({items.length} items) :{
                                <span className="font-bold">
                                    <Currency quantity={total} currency='USD' />
                                </span>
                            }</h2>

                            <button
                                role="link"
                                onClick={createCheckOutSession}
                                disabled={!session}
                                className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>

                                {!session ? 'sign in to check out' : 'proceed to check in'}
                            </button>
                        </>
                    )}
                </div>

            </main>

        </div>
    )
}

export default checkout
