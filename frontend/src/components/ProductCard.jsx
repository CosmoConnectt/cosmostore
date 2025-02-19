import { useState } from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const [showFullDescription, setShowFullDescription] = useState(false);

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			addToCart(product);
		}
	};

	return (
		<div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-600 shadow-lg bg-gray-900">
			<div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
				<img className="object-cover w-full" src={product.image} alt={product.name} />
				<div className="absolute inset-0 bg-black bg-opacity-20" />
			</div>

			<div className="mt-4 px-5 pb-5">
				<h5 className="text-xl font-semibold tracking-tight text-white">{product.name}</h5>
				
				{/* Description with Show More / Less */}
				<p className="mt-2 text-sm text-gray-400">
					{showFullDescription ? product.description : product.description.slice(0, 100) + "..."}
				</p>
				{product.description.length > 100 && (
					<button
						onClick={() => setShowFullDescription(!showFullDescription)}
						className="text-blue-400 hover:underline text-sm"
					>
						{showFullDescription ? "Show Less" : "Show More"}
					</button>
				)}

				<div className="mt-3 mb-5 flex items-center justify-between">
					<span className="text-3xl font-bold text-blue-500">₹{product.price}</span>
				</div>

				<button
					className="flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
					onClick={handleAddToCart}
				>
					<ShoppingCart size={22} className="mr-2" />
					Add to cart
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
