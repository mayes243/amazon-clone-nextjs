import { buffer } from 'micro'
import * as admin from 'firebase-admin'

// secure a connection to FIREBASE from the BACKEND
const serviceAccount = require('../../../permission.json')

const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app()


// connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const lastPointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullFillOrder = async (session) => {
    console.log('fullfill the order', session)

    return app.firestore().collection('tbl_users').doc(session.metadata.email).collection('tbl_orders').doc(session.id).set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),

    }).then(() => {
        console.log(`success ORDER ${session.id} has been added to the database`)
    })
}


export default async (req, res) => {

    if (req.method === "POST") {
        const requestBuffer = await buffer(req);

        const payload = requestBuffer.toString();
        const signature = req.headers["stripe-signature"];

        let event;

        // verify that the event posted from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, signature, lastPointSecret)
        } catch (err) {
            console.log('ERROR IN WEBHOOK', err.message)
            return res.status(400).send(`webhook error : ${err.message}`)
        }

        // handle the checkout session completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // full fill the order
            return (fullFillOrder(session)).then(() => {
                res.status(200)
            }).catch((err) => {
                res.status(400).send(`webhook error ${err.message}`)
            })
        }

    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}