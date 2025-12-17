import api from "@/axios";
import ProductsGrid from "./ProductsGrid";

export default async function ProductsPage() {
  let products = [];
  try {
    const res = await api.get("/api/products");
    products = res.data?.products ?? [];
  } catch (error) {
    console.error(error);
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        فشل تحميل المنتجات 😢
      </div>
    );
  }

  return <ProductsGrid products={products} />;
}
