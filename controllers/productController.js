// backend/controllers/productController.js
const { Op } = require("sequelize");
const Product = require("../models/Product");
const ProductReservation = require("../models/ProductReservation");

// ✅ Ürünleri filtre + sıralama ile listele
exports.getProducts = async (req, res) => {
  try {
    const { type, status, size, search, sort } = req.query;

    const where = {};

    if (type) where.type = type; // "kiralık" / "satılık"
    if (status) where.status = status; // "stokta" vb.
    if (size) where.size = size;

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { code: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const order = [];

    if (sort === "newest") {
      order.push(["createdAt", "DESC"]);
    } else if (sort === "code") {
      order.push(["code", "ASC"]);
    } else if (sort === "status") {
      order.push(["status", "ASC"]);
    } else {
      order.push(["createdAt", "DESC"]);
    }

    const products = await Product.findAll({
      where,
      order,
    });

    res.json(products);
  } catch (err) {
    console.error("❌ Ürünler alınamadı:", err);
    res.status(500).json({ message: "Ürünler alınamadı" });
  }
};

// ✅ Yeni ürün oluştur
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      code,
      type,
      size,
      color,
      floor,
      section,
      hanger,
      status,
      notes,
    } = req.body;

    const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : null;

    const product = await Product.create({
      name,
      code,
      type,
      size,
      color,
      floor,
      section,
      hanger,
      status: status || "stokta",
      notes,
      imageUrl,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Ürün kaydedilemedi:", err);
    res.status(500).json({ message: "Ürün kaydedilemedi" });
  }
};

// ✅ Ürün güncelle
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      code,
      type,
      size,
      color,
      floor,
      section,
      hanger,
      status,
      notes,
    } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });

    if (req.file) {
      product.imageUrl = `/uploads/products/${req.file.filename}`;
    }

    product.name = name;
    product.code = code;
    product.type = type;
    product.size = size;
    product.color = color;
    product.floor = floor;
    product.section = section;
    product.hanger = hanger;
    product.status = status || product.status;
    product.notes = notes;

    await product.save();

    res.json(product);
  } catch (err) {
    console.error("❌ Ürün güncellenemedi:", err);
    res.status(500).json({ message: "Ürün güncellenemedi" });
  }
};

// ✅ Ürün sil
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.json({ message: "Ürün silindi" });
  } catch (err) {
    console.error("❌ Ürün silinemedi:", err);
    res.status(500).json({ message: "Ürün silinemedi" });
  }
};

// ✅ Belirli ürün için rezervasyon ekleme (timeline altyapısı)
exports.createReservationForProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { customerName, startDate, endDate, note } = req.body;

    const reservation = await ProductReservation.create({
      productId,
      customerName,
      startDate,
      endDate,
      note,
    });

    res.status(201).json(reservation);
  } catch (err) {
    console.error("❌ Rezervasyon eklenemedi:", err);
    res.status(500).json({ message: "Rezervasyon eklenemedi" });
  }
};

// ✅ Belirli ürün için rezervasyonları listele
exports.getReservationsForProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reservations = await ProductReservation.findAll({
      where: { productId },
      order: [["startDate", "ASC"]],
    });

    res.json(reservations);
  } catch (err) {
    console.error("❌ Rezervasyonlar alınamadı:", err);
    res.status(500).json({ message: "Rezervasyonlar alınamadı" });
  }
};
