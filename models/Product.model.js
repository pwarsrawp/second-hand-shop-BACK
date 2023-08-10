const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title:{
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Arts and Crafts","Musical Instruments","Literature", "Bycicles", "Fashion and Accesories", "Electronics", "Automotive", "Miscellaneous"],
    },
    price: {
      type: Number,
      min: 0,
      trim: true,
      required: true,
    },
    item_condition: {
      type: String,
      enum: ["Available", "New", "As good as new", "Good", "Fair", "Has given it all"],
    },
    imageUrl: {
      type: String,
      default: String,
    },
    state: {
      type: String,
      enum: ["available", "reserved", "sold"],
    },
    sold: {
      type: Boolean
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref:"User",
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Product = model("Product", productSchema);

module.exports = Product;