import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGOURI;

  if (!uri) {
    throw new Error("MONGOURI no está definido en el .env");
  }

  mongoose.connection.on("connected", () =>
    console.log("✅ Mongo conectado con éxito"),
  );
  mongoose.connection.on("disconnected", () =>
    console.log("⚠️ Mongo desconectado"),
  );
  mongoose.connection.on("error", (e) => console.error("❌ Mongo error:", e));
  try {
    console.log("⏳ Intentando conectar a MongoDB...");
    await mongoose.connect(uri);

    console.log("🚀 Proceso de conexión finalizado");
  } catch (error) {
    console.error("❌ Fallo inicial de conexión:", error);
    process.exit(1); // Detiene la app si no puede conectar
  }
}
