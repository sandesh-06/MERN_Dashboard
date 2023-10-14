import OverallStat from "../model/OverallStat.mjs";

export const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat.find();

    //we just have 1 datapoint which is for 2021, so we need to send only that info to the client side
    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};