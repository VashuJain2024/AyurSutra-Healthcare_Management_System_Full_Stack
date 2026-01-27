import validator from "validator";
import bycrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import recordModel from "../models/recordModel.js";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    // hashing user password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    console.log("UserID From Token:", req.userId);
    const user = await userModel.findById(req.userId).select("-password").lean();
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist. Please login again.",
        logout: true
      });
    }

    const medicalHistory = await recordModel.find({ user: req.userId }).sort({ date: -1 });
    user.medicalHistory = medicalHistory;

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, dob, gender } = req.body;
    let { address } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    // Parse address JSON string safely
    if (address) {
      try {
        address = JSON.parse(address);
      } catch (err) {
        console.log("Address Parse Error:", err);
      }
    }

    let updateData = { name, phone, address, dob, gender };

    // If image comes, upload first and set URL
    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = uploadResult.secure_url;
    }

    // Update once — avoids DB overwrite issues
    await userModel.findByIdAndUpdate(userId, updateData, { new: true });

    res.json({ success: true, message: "Profile Updated Successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// POST /api/user/update-dosha
const updateDosha = async (req, res) => {
  try {
    const userId = req.userId;
    let { dosha } = req.body;

    if (!dosha) {
      return res.json({ success: false, message: "Dosha Data Missing" });
    }

    if (typeof dosha === "string") {
      dosha = JSON.parse(dosha);
    }

    const { Vata, Pitta, Kapha } = dosha;

    await userModel.findByIdAndUpdate(userId, {
      vata: Vata,
      pitta: Pitta,
      kapha: Kapha,
    });

    res.json({ success: true, message: "Dosha Updated Successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId; // from authUser middleware
    const { docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor Not Available" });
    }

    let slots_booked = docData.slots_booked;

    // checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {  
        return res.json({ success: false, message: "Slot Not Available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment Not Found" });
    }

    // Verify appointment user matches logged-in user
    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized Action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (doctorData?.slots_booked[slotDate]) {
      doctorData.slots_booked[slotDate] = doctorData.slots_booked[slotDate].filter(
        (t) => t !== slotTime
      );
      await doctorModel.findByIdAndUpdate(docId, {
        slots_booked: doctorData.slots_booked,
      });
    }

    res.json({ success: true, message: "Appointment Cancelled" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to add medical record
const addRecord = async (req, res) => {
  try {
    const userId = req.userId;
    const { condition, description, symptoms, doctor, reports, date, notesRight, painScale, painDuration } = req.body;
    const reportFile = req.file;

    if (!condition || !description || !symptoms || !doctor || !date || (!reports && !reportFile)) {
      return res.json({ success: false, message: "Data Missing" });
    }

    let reportUrl = reports || "";

    // If file comes, upload
    if (reportFile) {
      const uploadResult = await cloudinary.uploader.upload(reportFile.path, {
        resource_type: "auto", // Use auto to detect image vs raw (pdf)
      });
      reportUrl = uploadResult.secure_url;
    }

    const recordData = {
      user: userId,
      condition,
      description,
      symptoms: typeof symptoms === 'string' ? symptoms.split(',').map(s => s.trim()) : symptoms,
      doctor,
      reports: [reportUrl], // storing as array as per model schema
      date: new Date(date),
      notes: notesRight, // mapping notesRight to notes from schema
      painScale: painScale ? Number(painScale) : undefined,
      painDuration,
    };

    const newRecord = new recordModel(recordData);
    await newRecord.save();

    res.json({ success: true, message: "Record Added Successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const deleteRecord = async (req, res) => {
  try {
    const userId = req.userId;
    const { recordId } = req.body;

    const record = await recordModel.findById(recordId);
    if (!record) {
      return res.json({ success: false, message: "Record Not Found" });
    }

    if (record.user.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized Action" });
    }

    await recordModel.findByIdAndDelete(recordId);

    res.json({ success: true, message: "Record Deleted Successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const userId = req.userId;
    const { recordId, condition, description, symptoms, doctor, reports, date, notesRight, painScale, painDuration } = req.body;

    console.log("Update Record Request:", { userId, recordId, body: req.body, file: req.file });

    const record = await recordModel.findById(recordId);

    if (!record) {
      console.log("Record Not Found");
      return res.json({ success: false, message: "Record Not Found" });
    }

    if (record.user.toString() !== userId.toString()) {
      console.log("Unauthorized: Record user", record.user, "Request user", userId);
      return res.json({ success: false, message: "Unauthorized Action" });
    }

    // Handle File
    let reportUrl = record.reports[0] || ""; // Keep existing if not changed
    const reportFile = req.file;

    if (reportFile) {
      const uploadResult = await cloudinary.uploader.upload(reportFile.path, {
        resource_type: "auto",
      });
      reportUrl = uploadResult.secure_url;
    } else if (reports && reports !== 'undefined' && reports !== 'null') {
      // If they passed a string url back
      reportUrl = reports;
    }

    const updateData = {
      condition,
      description,
      symptoms: typeof symptoms === 'string' ? symptoms.split(',').map(s => s.trim()) : symptoms,
      doctor,
      reports: [reportUrl],
      date: new Date(date),
      notes: notesRight,
      painScale: painScale ? Number(painScale) : undefined,
      painDuration,
    };

    await recordModel.findByIdAndUpdate(recordId, updateData);

    res.json({ success: true, message: "Record Updated Successfully!" });

  } catch (error) {
    console.log("Update Record Error:", error);
    res.json({ success: false, message: error.message });
  }
}

export {
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
};
