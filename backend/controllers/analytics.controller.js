import User from "../models/user.model.js"
import Product from "../models/product.model.js"
import Order from "../models/order.model.js"

export const getAnalyticsData = async () => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null,   // it group all the documents together
        totalSales: { $sum: 1 }, // it sum all the documents
        totalRevenue: { $sum: '$totalAmount' }
      }
    }
  ]);

  const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 };

  return {
    users: totalUsers,
    products: totalProducts,
    totalSales,
    totalRevenue,
  }
}

export const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        }
      },
      {
        $sort: { _id: 1, }
      }
    ]);

    // example of dailySalesData
    // [
    //   { _id: "2024-01-01", sales: 10, revenue: 1000 },
    //   { _id: "2024-01-02", sales: 20, revenue: 2000 },
    // ]

    const dateArray = getDatesInRange(startDate, endDate);
    // console.log(dateArray); // [ '2024-01-01', '2024-01-02',... ]

    return dateArray.map(date => {
      const foundData = dailySalesData.find(item => item._id === date);

      return {
        date,
        sales: foundData?.sales || 0,
        revenue: foundData?.revenue || 0,
      }
    })
  } catch (error) {
    console.error("Error fetching daily sales data:", error);
    throw error;
  }
}

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  // loop through the dates and add them to the array
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
