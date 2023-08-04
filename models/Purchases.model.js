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
    item_condition: {
      type: String,
      enum: ['new', 'as good as new', 'good', 'fair', 'has given it all' ],
    },
    imageUrl: String,
    state: {
      type: String,
      enum: [available, reserved, sold],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Purchases = model("Purchases", purchasesSchema);

module.exports = Purchases;



{
  
 
 State: [available, reserved, sold],
 }
 