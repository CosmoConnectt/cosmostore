import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

// ✅ Get All Products
export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.json({ products });
	} catch (error) {
		console.error("Error in getAllProducts:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// ✅ Get Featured Products (With Redis Caching)
export const getFeaturedProducts = async (req, res) => {
	try {
		let featuredProducts = await redis.get("featured_products");
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts));
		}

		// Fetch from MongoDB if not in cache
		featuredProducts = await Product.find({ isFeatured: true }).lean();
		if (!featuredProducts.length) {
			return res.status(404).json({ message: "No featured products found" });
		}

		// Store in Redis for faster future access
		await redis.set("featured_products", JSON.stringify(featuredProducts), "EX", 3600); // Expires in 1 hour

		res.json(featuredProducts);
	} catch (error) {
		console.error("Error in getFeaturedProducts:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// ✅ Create Product
export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category } = req.body;

		// Upload to Cloudinary if image exists
		let cloudinaryResponse = null;
		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url || "",
			category,
		});

		res.status(201).json(product);
	} catch (error) {
		console.error("Error in createProduct:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// ✅ Delete Product (Removes Cloudinary Image Too)
export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Delete image from Cloudinary if it exists
		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("Deleted image from Cloudinary");
			} catch (error) {
				console.error("Error deleting image from Cloudinary:", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.error("Error in deleteProduct:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// ✅ Get Recommended Products (Random 4)
export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{ $sample: { size: 4 } },
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					price: 1,
				},
			},
		]);

		res.json(products);
	} catch (error) {
		console.error("Error in getRecommendedProducts:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// ✅ Get Products By Category
export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.json({ products });
	} catch (error) {
		console.error("Error in getProductsByCategory:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// ✅ Toggle Featured Product (Also Updates Redis Cache)
export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		product.isFeatured = !product.isFeatured;
		const updatedProduct = await product.save();

		await updateFeaturedProductsCache();

		res.json(updatedProduct);
	} catch (error) {
		console.error("Error in toggleFeaturedProduct:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// ✅ Update Featured Products Cache in Redis
async function updateFeaturedProductsCache() {
	try {
		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts), "EX", 3600); // Cache for 1 hour
	} catch (error) {
		console.error("Error in updateFeaturedProductsCache:", error);
	}
}
