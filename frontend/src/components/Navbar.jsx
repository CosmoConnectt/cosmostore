import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, List } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-indigo-950 to-black bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-indigo-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-400 flex items-center space-x-2">
            CosmoConnect
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link to="/" className="text-gray-300 hover:text-indigo-400 transition duration-300">
              Home
            </Link>

            {user && (
              <Link to="/cart" className="relative group text-gray-300 hover:text-indigo-400 transition">
                <ShoppingCart className="inline-block mr-1" size={20} />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-indigo-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-1 rounded-md font-medium transition flex items-center"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user && (
              <Link
                to="/orders"
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md flex items-center transition"
              >
                <List size={18} />
                <span className="hidden sm:inline ml-2">My Orders</span>
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center transition"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>

                <Link
                  to="/login"
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
