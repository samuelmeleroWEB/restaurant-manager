import mongoose from "mongoose"

export default async function connectDB() {
    const uri = process.env.MONGOURI;
    if (!uri) throw new Error("MONGOURI no está definido en el .env");

    // Logs útiles
  mongoose.connection.on("connected", () => console.log("✅ Mongo conectado"));
  mongoose.connection.on("disconnected", () => console.log("⚠️ Mongo desconectado"));
  mongoose.connection.on("error", (e) => console.error("❌ Mongo error:", e));

  console.log("🚀 Conexión a Mongo lista");
}
