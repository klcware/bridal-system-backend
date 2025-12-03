// backend/routes/products.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createReservationForProduct,
  getReservationsForProduct,
} = require("../controllers/productController");

// Multer konfigürasyonu
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads", "products"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({ storage });

// ✅ Ürün listeleme (filtre + sort destekli)
router.get("/", getProducts);

// ✅ Ürün ekleme (fotoğraflı)
router.post("/", upload.single("image"), createProduct);

// ✅ Ürün güncelleme (fotoğraf opsiyonel)
router.put("/:id", upload.single("image"), updateProduct);

// ✅ Ürün silme
router.delete("/:id", deleteProduct);

// ✅ Ürün rezervasyonları
router.get("/:productId/reservations", getReservationsForProduct);
router.post("/:productId/reservations", createReservationForProduct);

module.exports = router;
