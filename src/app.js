import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js"
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;


// MIDDLEWARES
app.use(cors());
app.use(express.json());



// RUTA DE PRUEBA (Health Check)
app.get("/ping", (req, res) => res.send("Pong! 🏓"));

// REGISTRO
app.use('/api/auth', authRoutes);

//Platos
app.use('/api/products', productRoutes);

//Pedidos
app.use('/api/orders', orderRoutes);





async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor listo!`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`🔌 DB: Conectada\n`);
    });
  } catch (err) {
    console.error("❌ Error arrancando el servidor:", err);
    process.exit(1);
  }
}

start();