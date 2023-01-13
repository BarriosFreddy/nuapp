import * as dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import { registerRoutes } from "./src/routes/index";
import { connectDB } from "./src/helpers/db/mongodb";

const { PORT = 3000, DATABASE_URI = "" } = process.env;

const app: Express = express();

(async () => {
  try {
    await connectDB(DATABASE_URI);
    app.use(helmet());
    app.use(cors());
    app.use(compression());
    app.use(morgan("common"));
    app.use(express.json()); // for parsing application/json
    registerRoutes(app);

    app.listen(PORT, () => {
      console.log(`Server is running. Available port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();