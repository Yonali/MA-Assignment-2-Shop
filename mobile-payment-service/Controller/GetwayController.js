const ShoutoutClient = require("shoutout-sdk");

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjOTdjMDNmMC1kY2Q3LTExZWMtOTU2Yi0xNzVlYzExNGRjNGQiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTY1MzU1Nzk4OSwiZXhwIjoxOTY5MTc3MTg5LCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjY4MzA5Iiwic29fdXNlcl9yb2xlIjoidXNlciIsInNvX3Byb2ZpbGUiOiJhbGwiLCJzb191c2VyX25hbWUiOiIiLCJzb19hcGlrZXkiOiJub25lIn0.mD2odsYXU8mfIN2J1wOjzcJ9w6y5Ps0bvNlNePsBPKI";

const debug = true,
  verifySSL = false;
exports.sendSMSTO = async (req, res) => {
  const client = new ShoutoutClient(apiKey, debug, verifySSL);
  const message = {
    content: { sms: "Your payment was success full" },
    destinations: [req.body.phone],
    source: "ShoutDEMO",
    transports: ["SMS"],
  };

  client.sendMessage(message, (error, result) => {
    if (error) {
      return res.status(401).json({
        payment: "Payment was Unsuccessfully",
        status: 1,
      });
    } else {
      return res.status(200).json({
        payment: result,
        status: 1,
      });
    }
  });
};
