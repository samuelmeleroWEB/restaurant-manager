import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del plato es obligatorio"],
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, // Guardamos el ID de la categoría
      ref: "Category", // Referencia al modelo Category
      required: [true, "Un plato debe pertenecer a una categoría"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
