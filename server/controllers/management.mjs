import mongoose from 'mongoose'
import User from "../model/User.mjs"
import Transaction from "../model/Transaction.mjs";

export const getAdmins = async(req, res)=>{
    try{
        const admins = await User.find({role: "admin"}).select("-password");
        res.status(200).json(admins);
    }catch(error){
        res.status(404).json({message: error.message})
    }
}


export const getUserPerformance = async (req, res) => {
    try {
      const { id } = req.params;
  
      const userWithStats = await User.aggregate([
        //converting the id in the right format and matching it (i.e) finding the user with the particular id in the 'User' model
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        //now we are looking up the id in the affiliatestats model (i.e) we are comapring the id from User model with the userId in in AffiliateStat model
        {
          $lookup: {
            from: "affiliatestats",
            localField: "_id",
            foreignField: "userId",
            as: "affiliateStats", //displaying the info as affiliate stats, or saving the info in a property called affiliatestats
          },
        },
        //flatens the infomarmation
        { $unwind: "$affiliateStats" },
      ]);
  
      const saleTransactions = await Promise.all(
        userWithStats[0].affiliateStats.affiliateSales.map((id) => {
          return Transaction.findById(id);
        })
      );
      const filteredSaleTransactions = saleTransactions.filter(
        (transaction) => transaction !== null
      );
  
      res
        .status(200)
        .json({ user: userWithStats[0], sales: filteredSaleTransactions });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };