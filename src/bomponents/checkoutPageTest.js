import React from 'react';
import useSignUpForm from '../bomponents/CheckoutForm';

const Signup = () => {

  let token = async () => {
    alert(`User Created! Name: ${inputs.firstName} ${inputs.lastName}`);
    let call
    call = await fetch("/.netlify/functions/checkout", {
      method: 'POST',
      body: JSON.stringify({
        order: {
          currency: 'usd'
        },
        token: {
          card: {
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2020,
            cvc: '123'
          }
        },
        shipping: {
          name: `${inputs.firstName} ${inputs.lastName}`,
          address: {
            line1: inputs.address1,
            city: inputs.city,
            state: inputs.state,
            postal_code: inputs.zip,
            country: 'US',
          },
        },
        items: [
          {
            type: 'sku',
            parent: 'sku_FgJVldqsyrIzqQ',
            quantity: 2,
          },
        ],
      })
    })
    .then(call => call.json())
    .then(console.log)
  }

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm({firstName: '', lastName: '', email: '', address1: '', zip: '', city: '', state: ''}, token);
  return (
    <div className="section is-fullheight">
      <div className="container">
        <div className="column is-4 is-offset-4">
          <div className="box">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="field">
                <label className="label has-text-centered">First Name</label>
                <div className="control">
                  <input className="input" type="text" name="firstName" onChange={handleInputChange} value={inputs.firstName} required />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-centered">Last Name</label>
                <div className="control">
                  <input className="input" type="text" name="lastName" onChange={handleInputChange} value={inputs.lastName} required />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-centered">Email Address</label>
                <div className="control">
                  <input className="input" type="email" name="email" onChange={handleInputChange} value={inputs.email} />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-centered">Address Line 1</label>
                <div className="control">
                  <input className="input" type="text" name="address1" onChange={handleInputChange} value={inputs.address1}/>
                </div>
              </div>
              <div className="field">
                <label className="label has-text-centered">zip</label>
                <div className="control">
                  <input className="input" type="text" name="zip" onChange={handleInputChange} value={inputs.zip}/>
                </div>
              </div>
              <div className="field">
                <label className="label has-text-centered">City</label>
                <div className="control">
                  <input className="input" type="text" name="city" onChange={handleInputChange} value={inputs.city}/>
                </div>
              </div>
              <div className="field">
                <label className="label has-text-centered">State</label>
                <div className="control">
                  <input className="input" type="text" name="state" onChange={handleInputChange} value={inputs.state}/>
                </div>
              </div>
              <button className="button is-block is-fullwidth is-success" type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;