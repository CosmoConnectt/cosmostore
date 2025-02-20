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
import orderRoutes from "./routes/order.route.js";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ FIXED: CORS Setup
const allowedOrigins = [
  "http://localhost:5173", 
  "https://cosmoconnect-store.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true, // ✅ Allows cookies
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  connectDB();
});
