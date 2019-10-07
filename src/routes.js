const express = require("express");
const multer = require("multer");
const routes = express.Router();

//Configs
const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);

// Controllers
const SessionController = require("./controllers/SessionController");
const DashboardController = require("./controllers/DashboardController");
const SpotController = require("./controllers/SpotController");
const BookingController = require("./controllers/BookingController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

routes.get("/", (req, res, next) => {
  return res.json({ message: "Hi Omnistack" });
});

// User (Resource)
routes.post("/sessions", SessionController.store);

// Dashboard
routes.get("/dashboard", DashboardController.show);

// Spots (Resource)
routes.get("/spots", SpotController.index);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);

// Booking (Resource)
routes.post("/spots/:spot_id/bookings", BookingController.store);

routes.post("/bookings/:booking_id/approvals", ApprovalController.store);
routes.post("/bookings/:booking_id/rejections", RejectionController.store);

module.exports = routes;
