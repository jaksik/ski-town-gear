const stripe = require('stripe')('sk_test_DiIrhluODliOuo2J5EAxaGxj00DdFVPCoZ');

module.exports.handler = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body)

  const order = await stripe.orders.create({
    currency: 'usd',
    email: 'jenny.rosen@example.com',
    items: requestBody.items,
    shipping: requestBody.shipping,
  });

  stripe.tokens.create({
    card: requestBody.token.card
  }, function(err, token) {
      if (err) {
        console.log("======= ERROR: ", err)
      }
      // asynchronously called
      stripe.orders.pay(order.id, {
          source: token.id, // obtained with Stripe.js
      }, function(err, order) {
          // asynchronously called
        }
      );

      callback(null, {
        // return null to show no errors
        statusCode: 200, // http status code
        body: JSON.stringify({
          err: err,
          token: token,
          order: order,
          msg: "Hello, World! " + Math.round(Math.random() * 10),
        }),
      })  
    });   
}