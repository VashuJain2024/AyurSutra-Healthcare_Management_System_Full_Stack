import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  updateDosha,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  addRecord,
  deleteRecord,
  updateRecord,
  paymentRazorpay,
  verfiyRazorpay,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);
userRouter.post("/update-dosha", authUser, updateDosha);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/add-record", upload.single("reports"), authUser, addRecord);
userRouter.post("/delete-record", authUser, deleteRecord);
userRouter.post("/update-record", upload.single("reports"), authUser, updateRecord);
userRouter.post("/payment-razorpay", authUser, paymentRazorpay);
userRouter.post("/verify-razorpay", authUser, verfiyRazorpay);

export default userRouter;
