import { getProduct } from "@/lib/products";

interface ProductDetailsProps {
  productId: number;
}

export default async function ProductDetails({ productId }: ProductDetailsProps) {
  const product = await getProduct(productId);

  return (
    <div className="p-4 border rounded-lg bg-white">
      <img src={product.image} alt={product.title} width={120} className="mb-2 object-contain" />
      <h2 className="font-bold text-slate-900">{product.title}</h2>
      <p className="text-emerald-700 font-semibold">${product.price}</p>
      <p className="text-sm text-slate-600">{product.description}</p>
    </div>
  );
}
