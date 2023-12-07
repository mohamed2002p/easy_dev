// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC81c95d4286dbd28049dcd0f80b6ec1a4";
const authToken = "bf77febf4c13072d1cab9c764cd3ced3";
const verifySid = "VA079924b321e09294fc313f04132f4743";
const client = require("twilio")(accountSid, authToken);

exports.verif =async () => { client.verify.v2
  .services(verifySid)
  .verifications.create({ to: "+201005189543", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Please enter the OTP:", (otpCode) => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: "+201005189543", code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => readline.close());
    });
  });
}