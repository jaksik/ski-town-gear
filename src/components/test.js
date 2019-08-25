import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
 
export default class TakeMoney extends React.Component {
  
  onToken = (token) => {
    
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
        console.log("Response: ", response)
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    }).catch(function() {
        console.log("error");
    });
  }

  componentDidMount() {
    console.log("Called")
    fetch("/.netlify/functions/test")
  .then(response => response.json())
  .then(console.log)
  }
 
  // ...
 
  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey='pk_test_m1CkOjN6bKVkDf7hXoxOFhgc00e3saL74z'
        />
    )
  }
}