// Find your Service Plan ID and API Token at dashboard.sinch.com/sms/api/rest
// Find your Sinch numbers at dashboard.sinch.com/numbers/your-numbers/numbers
const SERVICE_PLAN_ID = 'f8f64162a930493d90817062f2bf5210';
const API_TOKEN = 'a2f510de813a41e7bf616933ebd48c0e';
const SINCH_NUMBER = '+12085689456';
const TO_NUMBER = '+13018806015';

import fetch from 'node-fetch';

async function run() {
    const resp = await fetch(
        'https://us.sms.api.sinch.com/xms/v1/' + SERVICE_PLAN_ID + '/batches',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + API_TOKEN
            },
            body: JSON.stringify({
                from: SINCH_NUMBER,
                to: [TO_NUMBER],
                body: 'Programmers are tools for converting caffeine into code. We just got a new shipment of mugs! Check them out: https://tinyurl.com/4a6fxce7!'
            })
        }
    );

    const data = await resp.json();
    console.log(data);
}

run();