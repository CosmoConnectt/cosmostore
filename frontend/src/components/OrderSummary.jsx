import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
    "pk_test_51QZYccFvgpDeERKmgLiRZSDRpUZTFMxjBlE5mC8JXKdrV4JDrC8vSZmhzMbb18cEZqoCMwwiKTOOSD4G8HM1Dv1R00hk38m3et"
);

const OrderSummary = () => {
    const { total, subtotal, coupon, isCouponApplied, cart, clearCart } = useCartStore();

    const savings = subtotal - total;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(amount);
    };

    const formattedSubtotal = formatCurrency(subtotal);
    const formattedTotal = formatCurrency(total);
    const formattedSavings = formatCurrency(savings);

    const handlePayment = async () => {
        const stripe = await stripePromise;
        try {
            const res = await axios.post("/payments/create-checkout-session", {
                products: cart,
                couponCode: coupon ? coupon.code : null,
            });

            const session = res.data;
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error("Error:", result.error);
            }
        } catch (error) {
            console.error("Error initiating Stripe checkout:", error);
        }
    };

    const handleCODPayment = async () => {
        try {
            const res = await axios.post("/payments/cash-on-delivery", {
                products: cart,
                couponCode: coupon ? coupon.code : null,
            });

            if (res.data.success) {
                clearCart();
                window.location.href = "/OrderSuccess";
            } else {
                console.error("COD Error:", res.data.message);
            }
        } catch (error) {
            console.error("Error processing COD payment:", error);
        }
    };

    return (
        <motion.div
            className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <p className="text-xl font-semibold text-indigo-400">Order summary</p>

            <div className="space-y-4">
                <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-300">Original price</dt>
                        <dd className="text-base font-medium text-white">{formattedSubtotal}</dd>
                    </dl>

                    {savings > 0 && (
                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-300">Savings</dt>
                            <dd className="text-base font-medium text-indigo-400">-{formattedSavings}</dd>
                        </dl>
                    )}

                    {coupon && isCouponApplied && (
                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-300">Coupon ({coupon.code})</dt>
                            <dd className="text-base font-medium text-indigo-400">-{coupon.discountPercentage}%</dd>
                        </dl>
                    )}
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
                        <dt className="text-base font-bold text-white">Total</dt>
                        <dd className="text-base font-bold text-indigo-400">{formattedTotal}</dd>
                    </dl>
                </div>

                <motion.button
                    className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePayment}
                >
                    Proceed to Checkout
                </motion.button>

                <motion.button
                    className="flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCODPayment}
                >
                    Cash on Delivery
                </motion.button>

                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-400">or</span>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 underline hover:text-indigo-300 hover:no-underline"
                    >
                        Continue Shopping
                        <MoveRight size={16} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default OrderSummary;
