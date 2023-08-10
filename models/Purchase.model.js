const { Schema, model } = require("mongoose");

const purchaseSchema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref:"User",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref:"User",
    },
    product:{
      type:Schema.Types.ObjectId,
      ref: 'Product',
    },
    state:{
      type: String,
      enum: ["completed", "pending", "cancelled"]
    }
  },
  {  
    timestamps: true
  }
);

const Purchase = model("Purchase", purchaseSchema);

module.exports = Purchase;