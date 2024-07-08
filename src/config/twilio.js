const twilio = require('twilio');
const {twilio: twilioConfig } = require('./config');

const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

const verification = async (to, channel) => {
    try {
        const verification = await client.verify.v2.services(twilioConfig.serviceId)
            .verifications
            .create({to:to, channel:channel});
            console.log('twilio verification', verification);
        return verification;
    } catch (error) {
        throw new Error(error);
    }
}

// verification(twilioConfig.phoneNumber, 'sms');

const verificationCheck = async (to, code) => {
    try {
        const verificationCheck = await client.verify.v2.services(twilioConfig.serviceId)
            .verificationChecks
            .create({to:to, code:code});
            console.log('twilio verification check', verificationCheck);
        return verificationCheck;
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {
    verification,
    verificationCheck
}
