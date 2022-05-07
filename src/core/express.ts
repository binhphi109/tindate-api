import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import compress from "compression";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import winston, { LoggerStream } from "./winston";
import routes from "../routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

winston.init();

app.set("view cache", false);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("combined", { stream: new LoggerStream() }));
app.use(cors());

app.use(
  compress({
    filter: (req, res) => {
      const contentType = res.getHeader("Content-Type") as string;
      return /json|text|javascript|css|font|svg/.test(contentType);
    },
    level: 9,
  })
);

app.use("/", routes);

app.use(errorHandler());

export default app;
