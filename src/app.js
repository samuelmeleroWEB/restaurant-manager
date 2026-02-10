import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.config.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000 
app.use(cors())
app.use(express.json());

async function start() {
  await db();
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}
start().catch((err) => {
  console.error("Error arrancando el servidor:", err);
  process.exit(1);
});
