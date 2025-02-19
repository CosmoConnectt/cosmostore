import { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import axios from "../lib/axios";
import LoadingSpinner from "../components/LoadingSpinner";

const OrdersPage = () => {
  const { user } = useUserStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/orders", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });

        console.log("API Response:", response.data); // 🟢 Debugging

        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error("Orders response is not an array:", response.data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-indigo-400 mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-300">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="p-4 bg-gray-900 rounded-lg shadow">
              <p className="text-gray-200"><strong>Order ID:</strong> {order._id}</p>
              <p className="text-indigo-300">
                <strong>Total:</strong> Rs. {order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
              </p>
              <p className="text-gray-400"><strong>Status:</strong> {order.paymentStatus || "Unknown"}</p>
              
              {/* ✅ Display Products */}
              <div className="mt-2">
                <p className="text-indigo-400 font-bold">Products:</p>
                <ul className="ml-4 list-disc text-gray-300">
                  {order.products?.map((item) => (
                    <li key={item?.product?._id}>
                      <strong>{item?.product?.name || "Unknown Product"}</strong> - 
                      <span className="text-gray-400"> {item?.product?.category || "Unknown Category"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
