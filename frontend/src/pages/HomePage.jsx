import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/mugs", name: "Mugs", imageUrl: "/space-mug.jpg" },
	{ href: "/posters", name: "Posters", imageUrl: "/space-posters.jpg" },
	{ href: "/keychains", name: "Keychains", imageUrl: "/space-keychain.jpg" },
	{ href: "/crystalballs", name: "Crystal Ball", imageUrl: "/space-crystalball.jpg" },
	{ href: "/figurines", name: "Figurines", imageUrl: "/space-figurines.jpg" },
	{ href: "/clocks", name: "Clocks", imageUrl: "/space-clocks.jpg" },
	{ href: "/toys", name: "Toys", imageUrl: "/space-toys.jpg" },
];
const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();
	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);


  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-indigo-800 mb-4'>
					Explore Our Categories
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
        From the Cosmos, to Your Cart.
				</p>

				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>
		</div>
  )
}

export default HomePage