import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import featuredRoutes from "./routes/featured.route.js";
import orderRoutes from "./routes/order.route.js";

// Load environment variables correctly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Setup - Allow both Localhost & Vercel Frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://cosmoconnect-store.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`🚫 CORS blocked: ${origin}`); // Debugging
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// ✅ Debugging Log - Check Incoming Requests
app.use((req, res, next) => {
  console.log(`🌐 Request from: ${req.headers.origin} → ${req.method} ${req.url}`);
  next();
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/featured", featuredRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Error Handling for CORS Issues
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS policy does not allow this origin." });
  }
  next(err);
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  connectDB();
});
