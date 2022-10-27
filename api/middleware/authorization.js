import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

async function authorization(req, res, next) {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(401).json(false);
    }

    const payload = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = payload.user;
    return res.json({ status: true, payload: payload.user });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json("Not Authorized");
  }
}
export default authorization;
