import stipeNode from 'stripe';

const env = require('dotenv').config({path: './.env'});

const stripe = stipeNode(process.env.STRIPE_SECRET_KEY);

export default stripe;
