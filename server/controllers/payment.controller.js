import Stripe from 'stripe';
import HttpStatus from 'http-status-codes';

import { pool } from '../db';

const stripe = new Stripe(process.env.SK_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount = 0, currency = 'dop', user } = req.body;
    let customerId = '';

    if (!user.stripeId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        phone: user.phone,
      });

      customerId = customer.id;

      await pool.query('UPDATE users SET ? where ID = ?', [
        {
          stripe_id: customer.id,
        },
        user.id,
      ]);
    } else {
      customerId = user.stripeId;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      customer: customerId,
      amount: amount * 100,
      currency,
      payment_method_types: ['card'],
    });

    res.send({
      success: true,
      clientSecret: paymentIntent.client_secret,
      customerId,
      id: paymentIntent.id,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};

export const cancelPaymentIntent = async (req, res) => {
  try {
    await stripe.paymentIntents.cancel(req.params.id);

    res.send({
      success: true,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};

export const savePaymentMethod = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.update(req.params.id, {
      setup_future_usage: req.body.save ? 'on_session' : undefined,
    });

    res.send({
      success: true,
      data: paymentIntent,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};
