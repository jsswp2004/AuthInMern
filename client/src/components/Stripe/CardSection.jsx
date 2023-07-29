import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
        base: {
            iconColor: "rgb(240, 57, 122)",
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
        <label>
            Card details
            <CardElement options={CARD_ELEMENT_OPTIONS} />
        </label>
    );
}

export default CardSection;