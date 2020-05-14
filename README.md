# Global Marketplace using Stripe Connect

This sample shows how to build a home-rental themed marketplace using [Stripe Payments](http://stripe.com/payments) and [Stripe Connect](https://stripe.com/connect) where customers can sign up and become renters (buyer) and owners (seller) of the marketplace.

Below the surface the marketplacegeneric with the notion of `buyers`, `sellers` and `transactions` for sold goods and the basic workflows are provided showcase how to use Payments and Connect together.

Sellers are on-boarded using [Stripe Connect Express](https://stripe.com/connect/express) which gives sellers a Stripe account connected to the marketplace. When funds are accepted by the marketplace via card payments, the funds are routed to the seller's Stripe accounts as a part of each marketplace transaction.

See a hosted version of the [demo](https://kavholm.com/) in test mode or [fork on codesandbox.io](https://codesandbox.io/s/github/stripe/stripe-demo-connect-kavholm-marketplace)

<img src="./demo.png" alt="Preview of recipe" align="center">

## Features

- Users can signup and optionally decide to become sellers by on-boarding to Stripe.
- Listings can be listed, shown, added, edited and deleted.
- Bookings can be viewed in detail as transactions.
- Card payments are accepted by the marketplace and funds are routed to the sellers connected Stripe account.
- Users can visit their dashboard to get an overview of their listings, transaction and account balances.
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

## Getting started

To run this sample locally all you need is checkout the repo and run the app.

You will need a Stripe account with its own set of [API keys](https://stripe.com/docs/development#api-keys), and enable a few features for your Stripe Account. 

Don't worry, just follow the steps in this guide.

**1. Clone and configure the sample**

```
git clone git@github.com:stripe/stripe-demo-connect-kavholm-marketplace.git
```

**2. Configure Stripe**

The first thing you need to do is to Create a Connect platform. You do that by going to https://dashboard.stripe.com/test/connect/overview.

Once you have registered your Connect platform, you can now generate a Connect User Id. You need this together with your Stripe API keys.

**2. Get Stripe API keys and configure environment variables**

Go to the Stripe [developer dashboard](https://dashboard.stripe.com/apikeys) to find your API keys (developer settings), and your Connect User Id (Connect setttings). 

Copy the .env.example file into a file named .env in the folder of the server you want to use. For example:

```
cp .env.example .env
```

Now copy your Stripe API keys and Connect User id into your `.env` file:

```
STRIPE_PUBLIC_KEY=<replace-with-your-publishable-key>
STRIPE_SECRET_KEY=<replace-with-your-secret-key>
STRIPE_CLIENT_ID=<replace-with-your-connect-client-id>
```

Save the `.env` file and you should be good.

**3.  Set A Redirect URI for Stripe Onboarding**

Go to your [connect settings](https://dashboard.stripe.com/settings/applications) to add a redirect uri for Stripe to call back to after a seller onboards with Stripe. 

The URI this app users is [http://localhost:3000/stripe/callback](http://localhost:3000/stripe/callback)

### Using the sample app

1. Run `npm install`
1. Run `npm run dev`
1. You are now ready to use the app running in [http://localhost:3000](http://localhost:3000).
1. The marketplace should be available, and if you go to `/login` you should be able to login as both renters and owners using the demo buttons.
1. You will need to onboard the owner onto your Stripe Connect Platform. If you log in using the owner demo and go to "Listings" you can enable payments. This will bring you through Stripe's hosted onboarding with Connect. 
1. Once onboarding is complete you can use the renter demo to see how payments work!
1. 🎉

## FAQ

Q: Why did you pick these frameworks?

A: We chose the most minimal framework to convey the key Stripe calls and concepts you need to understand. These demos are meant as an educational tool that helps you roadmap how to integrate Stripe within your own system independent of the framework.

Q: Can you show me how to build X?

A: We are always looking for new recipe ideas, please email dev-samples@stripe.com with your suggestion!

## Author(s)

[@auchenberg-stripe](https://twitter.com/auchenberg)