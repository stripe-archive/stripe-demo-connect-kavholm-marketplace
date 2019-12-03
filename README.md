# Global Marketplace using Stripe Connect

This sample shows how to build a global marketplace using [Stripe Connect] where customers can sign up and become sellers and sellers of the marketplace. 

Card payments are accepted using [Payment Intents API](https://stripe.com/docs/payments/payment-intents), [Stripe Elements](https://stripe.com/payments/elements) and [React](https://reactjs.org/).

Sellers are onboarded using [Stripe Connect Express] where they get their own Stripe Accounts and funds accepted from the card payments are routed to their Stripe accounts as a part of each transcations.

The marketplace is powered by Next.js and is a full stack sample that contains a React front-end, and a Node.js REST API which exposes a few endpoints for `listings`, `login`, `payouts`, `profile`, `signup`, `transactions`, and `users`

See a hosted version of the [demo](https://ob4td.sse.codesandbox.io/ ) in test mode or [fork on codesandbox.io](https://github.com/auchenberg-stripe/stripe-sample-global-marketplace/tree/master/client)

<img src="./demo.png" alt="Preview of recipe" align="center">

## How to run locally

To run this sample locally you need to start both a local dev server for the `front-end` and another server for the `back-end`.

You will need a Stripe account with its own set of [API keys](https://stripe.com/docs/development#api-keys).

Follow the steps below to run locally.

**1. Clone and configure the sample**

The Stripe CLI is the fastest way to clone and configure a sample to run locally. 

**Using the Stripe CLI**

If you haven't already installed the CLI, follow the [installation steps](https://github.com/stripe/stripe-cli#installation) in the project README. The CLI is useful for cloning samples and locally testing webhooks and Stripe integrations.

In your terminal shell, run the Stripe CLI command to clone the sample:

```
stripe samples create global-marketplace
```

The CLI will walk you through picking your integration type, server and client languages, and configuring your .env config file with your Stripe API keys.

**Installing and cloning manually**

If you do not want to use the Stripe CLI, you can manually clone and configure the sample yourself:

```
git clone https://github.com/stripe-samples/global-marketplace
```

Copy the .env.example file into a file named .env in the folder of the server you want to use. For example:

```
cp .env.example server/node/.env
```

You will need a Stripe account in order to run the demo. Once you set up your account, go to the Stripe [developer dashboard](https://stripe.com/docs/development#api-keys) to find your API keys.

```
STRIPE_PUBLIC_KEY=<replace-with-your-publishable-key>
STRIPE_SECRET_KEY=<replace-with-your-secret-key>
```
### Running the Next.js app

1. Go to `/client`
1. Run `yarn`
1. Run `yarn dev` and your default browser should now open with the front-end being served from `http://localhost:3000/`.

### Using the sample app

You are now ready to use the app running in [http://localhost:3000](http://localhost:3000).


## FAQ

Q: Why did you pick these frameworks?

A: We chose the most minimal framework to convey the key Stripe calls and concepts you need to understand. These demos are meant as an educational tool that helps you roadmap how to integrate Stripe within your own system independent of the framework.

Q: Can you show me how to build X?

A: We are always looking for new recipe ideas, please email dev-samples@stripe.com with your suggestion!

## Author(s)

[@auchenberg-stripe](https://twitter.com/auchenberg)
