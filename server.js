const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./config/db");
const statsRoutes = require("./routes/stats");

const appointmentRoutes = require("./routes/appointments");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// Upload klasörünü statik sun
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API route’ları
app.use("/api/appointments", appointmentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// DB sync
sequelize
  .sync()
  .then(() => console.log("Veritabanı senkronize edildi"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});

app.use("/api/stats", statsRoutes);