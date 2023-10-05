// import React from "react";
// import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

// import CardSection from "./CardSection";

// class CheckoutForm extends React.Component {
//     handleSubmit = async event => {
//         event.preventDefault();

//         const { stripe, elements } = this.props;
//         if (!stripe || !elements) {
//             return;
//         }

//         const card = elements.getElement(CardElement);
//         const result = await stripe.createToken(card);
//         if (result.error) {
//             console.log(result.error.message);
//         } else {
//             console.log(result.token);
//         }
//     };

//     render() {
//         return (
//             <div>
//                 <div class="product-info">
//                     <h3 className="product-title">Apple MacBook Pro</h3>
//                     <h4 className="product-price">$999</h4>
//                 </div>
//                 <form onSubmit={this.handleSubmit}>
//                     <CardSection />
//                     <button disabled={!this.props.stripe} className="btn-pay">
//                         Buy Now
//                     </button>
//                 </form>
//             </div>
//         );
//     }
// }

// export default function InjectedCheckoutForm() {
//     return (
//         <ElementsConsumer>
//             {({ stripe, elements }) => (
//                 <CheckoutForm stripe={stripe} elements={elements} />
//             )}
//         </ElementsConsumer>
//     );
// }

import React, { useState } from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";

const CheckoutForm = ({ stripe, elements }) => {
    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);
        if (result.error) {
            console.log(result.error.message);
        } else {
            console.log(result.token);
        }
    };

    const [pricing, setPricing] = useState('')

    return (
        <div>
            <div>
                <h3 className="product-title">POEHR Scheduling</h3>
                <label className="settingCheckboxContainer">
                    Basic
                    <input
                        type="radio"
                        onClick={() => setPricing('299')}
                        name="radio"
                    />
                    <span className="settingCheckboxCheckmark"></span>
                </label>
                <label className="settingCheckboxContainer">
                    Pro
                    <input
                        type="radio"
                        onClick={() => setPricing('599')}
                        name="radio"
                    />
                    <span className="settingCheckboxCheckmark"></span>
                </label>
                <label className="settingCheckboxContainer">
                    Business
                    <input
                        type="radio"
                        onClick={() => setPricing(' Contact us for pricing')}
                        name="radio"
                    />
                    <span className="settingCheckboxCheckmark"></span>
                </label>
                <h4 className="product-price">${pricing}</h4>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <CardSection />
                    <button disabled={!stripe} className="btn btn-primary btnWidth">
                        Buy Now
                    </button>
                </form>
            </div>
        </div>
    );
}

// export default CheckoutForm;
export default function InjectedCheckoutForm() {
    return (
        <ElementsConsumer>
            {({ stripe, elements }) => (
                <CheckoutForm stripe={stripe} elements={elements} />
            )}
        </ElementsConsumer>
    );
}