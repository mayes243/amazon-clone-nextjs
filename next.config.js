module.exports = {
    images: {
        domains: [
            '/images',
            'fakestoreapi.com',

        ]
    },
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY
    }
}