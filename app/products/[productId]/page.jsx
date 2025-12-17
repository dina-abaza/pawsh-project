
// /app/products/[productId]/page.jsx
import ProductDetailsClient from "./ProductDetailsClient";
import api from "@/axios";

export default async function ProductDetailsPage({ params }) {
  const { productId } = params;

  let product = null;

  try {
    const res = await api.get(`/api/products/${productId}`);
    product = res.data?.product ?? null;
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  return <ProductDetailsClient product={product} />;
}
