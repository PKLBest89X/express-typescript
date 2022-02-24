import { CorsOptions } from "cors";
import allowedOrigins from "./allowedOrigins";

const corsOption: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(String(origin)) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No origin allowed by CORS!"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOption;
