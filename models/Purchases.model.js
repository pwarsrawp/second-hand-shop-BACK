const { Schema, model } = require("mongoose");

// MODEL PENDING UPDATE
const purchasesSchema = new Schema(
  {
    item:{
      type: String,
      trim: true,
      required: true,
      
    },
    seller: {
      type: String,
      trim: true,
      required: true,
    },
    buyer: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      trim: true,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Purchases = model("Purchases", purchasesSchema);

module.exports = Purchases;