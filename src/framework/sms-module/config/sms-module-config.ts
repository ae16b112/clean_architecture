import * as dotenv from 'dotenv'
dotenv.config()

export default () => ({
    rohit: {
        accountSid: process.env.accountSid,
        authToken: process.env.authToken,
        TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER
    }

});