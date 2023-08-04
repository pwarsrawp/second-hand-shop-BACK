const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const purchaseSchema = new Schema(
  {
    buyer: String,
    seller: String,
    item: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Purchase = model("Purchase", purchaseSchema);

module.exports = Purchase;
