import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByCategory: {
      type: Map, //Map is an object in JS, it will have a key value pair, where the value is a number
      of: Number,
    },
  },
  { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;