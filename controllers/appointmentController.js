// backend/controllers/appointmentController.js
const { Op } = require("sequelize");
const Appointment = require("../models/Appointment");

// 🔹 Tüm randevuları getir
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      order: [["date", "ASC"], ["time", "ASC"]],
    });
    res.json(appointments);
  } catch (error) {
    console.error("❌ Randevular alınamadı:", error);
    res.status(500).json({ message: "Veri alınamadı." });
  }
};

// 🔹 Yeni randevu oluştur
exports.createAppointment = async (req, res) => {
  try {
    console.log("📥 Gelen veri:", req.body);

    const { name, phone, date, time, note, status } = req.body;

    if (!date || !time) {
      return res
        .status(400)
        .json({ message: "Tarih ve saat zorunludur." });
    }

    const appointment = await Appointment.create({
      name,
      phone,
      date,       // "YYYY-MM-DD" formatında geliyor
      time,       // "HH:MM"
      note,
      status: status || "Bekliyor",
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error("❌ Randevu kaydı hatası:", error);
    res.status(500).json({ message: "Randevu kaydedilemedi." });
  }
};

// 🔹 Randevu durumunu güncelle
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByPk(id);
    if (!appointment)
      return res.status(404).json({ message: "Randevu bulunamadı." });

    appointment.status = status;
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    console.error("❌ Güncelleme hatası:", error);
    res.status(500).json({ message: "Randevu güncellenemedi." });
  }
};

// 🔹 Randevuyu sil
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.destroy({ where: { id } });
    res.json({ message: "Randevu silindi." });
  } catch (error) {
    console.error("❌ Silme hatası:", error);
    res.status(500).json({ message: "Randevu silinemedi." });
  }
};

// 🔹 Belirli bir tarih için dolu saatleri getir (müsaitlik için)
exports.getBusySlotsForDate = async (req, res) => {
  try {
    const { date } = req.query; // ?date=2025-12-10

    if (!date) {
      return res.status(400).json({ message: "Tarih parametresi gerekli." });
    }

    const appointments = await Appointment.findAll({
      where: { date },
    });

    const busy = appointments.map((a) => a.time);

    res.json({ busy });
  } catch (error) {
    console.error("❌ Dolu saatler alınamadı:", error);
    res.status(500).json({ message: "Dolu saatler alınamadı." });
  }
};
