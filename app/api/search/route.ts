import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const products = await getProducts();
  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(query))
    .map((p) => ({ id: p.id, title: p.title, price: p.price }));

  return NextResponse.json(filtered);
}
