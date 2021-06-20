import { CheckCircleIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"
import Header from "../components/Header"
import Head from "next/head"


const success = () => {
    const router = useRouter()
    return (
        <div className="bg-gray-100 h-screen">
            <Head>
                <title>Amazon clone || success</title>
            </Head>
            <Header />

            <main className="max-w-screen-lg mx-auto">

                <div className="flex flex-col p-10 bg-white">

                    <div className="flex items-center space-x-2 mb-2">

                        <CheckCircleIcon className="text-green-500 h-10 cursor-pointer" />

                        <h1 className="capitalize text-3xl">thank you, your order has been confirmed !</h1>
                    </div>
                    <p>Thank you for shopping with us.we'll send a corfirmation once your item has shipped. If you would like to
                        check the status of your order(s) please press the link below</p>

                    <button className="button mt-8" onClick={() => router.push('/orders')}>Go to any orders</button>
                </div>

            </main>
        </div>
    )
}

export default success
