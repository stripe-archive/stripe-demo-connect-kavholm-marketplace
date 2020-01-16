# Global Marketplace using Stripe Connect

This sample shows how to build a global marketplace using [Stripe Payments](http://stripe.com/payments) and [Stripe Connect](https://stripe.com/connect) where customers can sign up and become buyers and sellers of the marketplace.

The marketplace is generic with the notion of `buyers`, `sellers` and `transactions` for sold goods and the basic workflows are provided showcase how to use Payments and Connect together.

Sellers are on-boarded using [Stripe Connect Express](https://stripe.com/connect/express) which gives sellers a Stripe account connected to the marketplace. When funds are accepted by the marketplace via card payments, the funds are routed to the seller's Stripe accounts as a part of each marketplace transaction.

See a hosted version of the [demo](https://rp9wf.sse.codesandbox.io/) in test mode or [fork on codesandbox.io](https://codesandbox.io/s/github/auchenberg-stripe/stripe-sample-connect-global-marketplace/tree/master/client-only/client)

<img src="./demo.png" alt="Preview of recipe" align="center">

## Features

- Users can signup and optionally decide to become sellers by onboarding to Stripe.
- Listings can be listed, shown, added, edited and deleted.
- Bookings can be viewed in detail as transactions.
- Card payments are accepted by the marketplace and funds are routed to the sellers connected Stripe account.
- Users can visit their dashboard to get an overview of their listings, transcations and account balances.
- Simple admin page for housekeeping.

## Architecture

The marketplace is implemented as as full-stack application powered by [Next.js](https://nextjs.org/) and contains a React front-end, and a Node.js REST API.

The app renders its React components as both the server and client-side using [isomorphic rendering](https://matwrites.com/universal-react-apps-start-with-next-js/).

![](https://matwrites.com/wp-content/uploads/2017/06/Isomorphic-web-apps.png)

### Technical features

- Authentication system using [JWT tokens](https://jwt.io/) with login and signup pages.
- Storage using [LowDB](https://github.com/typicode/lowdb) to provide a basic local JSON database.
- REST API scaffolding with authentication endpoints for resources like `listings`, `login`, `payouts`, `profile`, `signup`, `transactions`, and `users`.
- Card payments are accepted via [Payment Intents API](https://stripe.com/docs/payments/payment-intents) + [Stripe Elements](https://stripe.com/payments/elements) and is integrated via [`react-stripe-elements`](https://github.com/stripe/react-stripe-elements)

## How to run locally

To run this sample locally all you need is checkout the repo and run the app.

You will need a Stripe account with its own set of [API keys](https://stripe.com/docs/development#api-keys).

Follow the steps below to run locally.

**1. Clone and configure the sample**

```
git clone git@github.com:stripe-samples/connect-kavholm-marketplace.git
```

**2. Setup environment variables**

Copy the .env.example file into a file named .env in the folder of the server you want to use. For example:

```
cp .env.example .env
```

You will need a Stripe account in order to run the demo. Once you set up your account, go to the Stripe [developer dashboard](https://stripe.com/docs/development#api-keys) to find your API keys.

```
STRIPE_PUBLIC_KEY=<replace-with-your-publishable-key>
STRIPE_SECRET_KEY=<replace-with-your-secret-key>
```

### Using the sample app

1. Run `yarn`
1. Run `yarn dev`
1. You are now ready to use the app running in [http://localhost:3000](http://localhost:3000).
1. The marketplace should be available, and if you go to `/login` you should be able to login as both buyers and sellers using the demo buttons.
1. 🎉

## FAQ

Q: Why did you pick these frameworks?

A: We chose the most minimal framework to convey the key Stripe calls and concepts you need to understand. These demos are meant as an educational tool that helps you roadmap how to integrate Stripe within your own system independent of the framework.

Q: Can you show me how to build X?

A: We are always looking for new recipe ideas, please email dev-samples@stripe.com with your suggestion!

## Author(s)

[@auchenberg-stripe](https://twitter.com/auchenberg)
