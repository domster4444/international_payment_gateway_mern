// @ts-ignore

//? npm i razorpay
//? npm i nodefetc
const express = require('express');
const path = require('path');
const cors = require('cors');
const Razorpay = require('razorpay');
const shortid = require('shortid');

const app = express();
// allow cross origin
app.use(cors());

var razorpay = new Razorpay({
  key_id: 'rzp_test_tRliAHMLk7ZWQW',
  key_secret: 'jO1ExPYbJ5vUWGgdfAheysuQ',
});

// disable ts for this file
app.get('/logo.svg', (req, res) => {
  res.sendFile(path.join(__dirname, 'logo.svg'));
});

// ===
app.post('/razorpay', async (req, res) => {
  const amount = 499;
  const options = {
    amount: (amount * 100).toString(),
    // account is not activated for "international currency support"
    currency: 'INR',
    receipt: shortid.generate(),
    payment_capture: 1,
  };
  const response = await razorpay.orders.create(options);
  console.log(response);
  res.json({
    id: response.id,
    currency: 'INR',
    amount: response.amount,
  });
});
// ===

app.listen(5000, () => {
  console.log('listening on port 5000');
});
