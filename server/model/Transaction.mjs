import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: String,
    cost: String, //the cost was created as a String by mistake in data file, it should be a number
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;