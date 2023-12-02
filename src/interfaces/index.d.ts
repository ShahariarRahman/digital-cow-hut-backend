/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { JwtPayload } from "jsonwebtoken";

// globally declaring namespace:

declare global {
  // express > namespace > request interface
  namespace Express {
    interface Request {
      user: JwtPayload | null;
    }
  }
}
