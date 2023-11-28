import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import queryRouter from "./routes/query.route.js";

const app = express();
const PORT = process.env.PORT || 8081;

async function main() {
  // await connectDatabase();

  // middlewares
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

  // routes
  app.get("/", (req, res) => {
    const indexHtml = fs.readFileSync(
      path.resolve("public", "index.html"),
      "utf-8"
    );
    res.send(indexHtml);
  });

  app.use("/api/v1/query-selector", queryRouter);
  // start server 
  app.listen(PORT);
}

main()
  .then(() => {
    console.log("Server is running on http://localhost:" + PORT);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
