import express from "express";
import {
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
  appointmentDetails,
  getPatient,
  updateRecord,
  deleteRecord,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";
import upload from "../middlewares/multer.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);
doctorRouter.get("/appointment/:appointmentId", authDoctor, appointmentDetails);
doctorRouter.get("/patient/:id", authDoctor, getPatient);
doctorRouter.post("/update-record", upload.single('reports'), authDoctor, updateRecord);
doctorRouter.post("/delete-record", authDoctor, deleteRecord);

export default doctorRouter;  
