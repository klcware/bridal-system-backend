// backend/routes/appointments.js
const express = require("express");
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getBusySlotsForDate,
} = require("../controllers/appointmentController");

// Tüm randevular
router.get("/", getAppointments);

// Belirli tarih için dolu saatler
router.get("/busy-slots", getBusySlotsForDate);

// Yeni randevu
router.post("/", createAppointment);

// Durum güncelle
router.put("/:id", updateAppointmentStatus);

// Sil
router.delete("/:id", deleteAppointment);

module.exports = router;
