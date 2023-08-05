const { Schema, model } = require("mongoose");

const purchaseSchema = new Schema(
  {
    product:{
      type:Schema.Types.ObjectId,
      ref: 'Product',
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref:"User",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref:"User",
    },
  },
  {  
    timestamps: true
  }
);

const Purchase = model("Purchase", purchaseSchema);

module.exports = Purchase;