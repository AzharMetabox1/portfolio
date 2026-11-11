'use server';

import { revalidatePath } from "next/cache";

// In-memory simulated storage for server action demonstration
const priceOverrides = new Map<number, number>();

export async function updateProductPrice(id: number, newPrice: number): Promise<{ success: boolean; newPrice: number }> {
    // Server action logic running on the server
    await new Promise((resolve) => setTimeout(resolve, 500));
    priceOverrides.set(id, newPrice);
    revalidatePath('/product');
    revalidatePath(`/product/${id}`);
    return { success: true, newPrice };
}
