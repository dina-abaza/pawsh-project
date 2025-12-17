import api from "@/axios";
import CategoryProductsGrid from "./CategoryProductsGrid";

export default async function CategoryProductsPage({ params }) {
  const { categoryId } = params;
  let products = [];

  try {
    const res = await api.get(`/api/products/category/${categoryId}`);
    products = res.data?.products ?? [];
  } catch (error) {
    console.error(error);
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        فشل تحميل منتجات الفئة 😢
      </div>
    );
  }

  return <CategoryProductsGrid products={products} />;
}
