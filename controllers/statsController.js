// backend/controllers/statsController.js
const { Op } = require("sequelize");
const Appointment = require("../models/Appointment");
const Product = require("../models/Product");

exports.getSummary = async (req, res) => {
  try {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const [totalAppointments, todayAppointments, totalProducts] =
      await Promise.all([
        Appointment.count(),
        Appointment.count({ where: { date: todayStr } }),
        Product.count(),
      ]);

    const statusCounts = await Product.findAll({
      attributes: ["status", [require("sequelize").fn("COUNT", "*"), "count"]],
      group: ["status"],
    });

    res.json({
      totalAppointments,
      todayAppointments,
      totalProducts,
      productStatus: statusCounts,
    });
  } catch (err) {
    console.error("❌ İstatistikler alınamadı:", err);
    res.status(500).json({ message: "İstatistikler alınamadı" });
  }
};
