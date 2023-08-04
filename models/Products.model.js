const { Schema, model } = require("mongoose");

// MODEL PENDING UPDATE
const productsSchema = new Schema(
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
      trim: true,
      required: true,
      //This is a placeholder, we need to update the enum with the final categories:
      enum: [one, two, three, four, five ]
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
    imageUrl: {
      type: String,
      default: String,
    },
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

const Products = model("User", productsSchema);

module.exports = Products;
