import express from "express";
import { adminRoute, protectedRoute } from "../middleware/auth.middleware.js";
import { getAnalyticsData, getDailySalesData } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get('/', protectedRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await getDailySalesData(startDate, endDate);

    res.status(200).json({
      analyticsData,
      dailySalesData,
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({
      message: "Error fetching analytics data",
      error: error.message,
    });
  }
});

export default router;
