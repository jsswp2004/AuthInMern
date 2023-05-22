// stripe.button.component.jsx
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51NAPxIFfk7zi0PnM7LYWqLVLIQwDr9FuQzQl5QEstme535leiUQeopQcJdErTlRQISIKSI0wjOt1zuqi9aKAwGgZ00lXn84J3k';

    const onToken = token => {
        console.log(token);
        alert('Payment Succesful!');
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='Freaky Jolly Co.'
            billingAddress
            shippingAddress
            image='https://www.freakyjolly.com/wp-content/uploads/2020/04/fj-logo.png'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;