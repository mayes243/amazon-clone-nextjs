import { getSession, useSession } from "next-auth/client"
import db from "../../firebase";
import Header from "../components/Header"
import Head from "next/head"
import moment from "moment";
import YourOrder from "./YourOrder";

const Orders = ({ orders }) => {
    const [session] = useSession();
    // console.log(orders)
    return (
        <div>
            <Head>
                <title>Amazon clone || Orders</title>
            </Head>

            <Header />
            <main className="max-w-screen-lg mx-auto p-10">

                <h1 className="capitalize text-3xl border-b mb-2 pb-1 border-yellow-400">your orders</h1>

                {session ? (
                    <h2>{orders.length} Orders</h2>
                ) :
                    (
                        <h2>Please signin to see your login</h2>
                    )}
                <div className="mt-5 space-y-4">
                    {orders?.map(({id, amount, amountShipping, items, timestamp, images}) => (
                    <YourOrder key={id} id={id} amount={amount} amountShipping={amountShipping} items={items} timestamp={timestamp} images={images} />
                    ))}
                </div>

            </main>
        </div>
    )
}

export default Orders;

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    // get the orders in logged in credentaials

    const session = await getSession(context);

    if (!session) {
        return {
            props: {},
        }
    }
    // firebase db
    const stripeOrders = await db.collection('tbl_users').doc(session.user.email).collection('tbl_orders').orderBy('timestamp', 'desc').get();

    // stripe orders
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
        }))
    );

    return {
        props: {
            orders,
        },
    }
}
