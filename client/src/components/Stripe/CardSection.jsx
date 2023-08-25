import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
        base: {
            iconColor: "rgb(0.00,0.00,1.00)",
            color: "rgb(240, 57, 122)",
            fontSize: "16px",
            fontFamily: '"Open Sans", sans-serif',
            fontSmoothing: "antialiased",
            "::placeholder": {
                color: "#CFD7DF"
            }
        },
        invalid: {
            color: "#e5424d",
            ":focus": {
                color: "#303238"
            }
        }
    }
};

function CardSection() {
    return (
        <div>
            <label>
                Card Information

            </label>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
    );
}

export default CardSection;