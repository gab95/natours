import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51HEcGDDKgs5bg9Al7byq7wx0DK8ch4gntrMZuZmLsh3lG8exW6GEtA6gT5EelDTW8EBGwDuQyzwu1FFVJq3POfqM009xa7Dgzt'
);

export const bookTour = async (tourId) => {
  try {
    //1. get checkout session from api
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    //2. create checkout form + charge credit card
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (error) {
    showAlert('error', error);
  }
};
