import { applyCoupon } from "@/lib/coupons";

export type PricedCartItem = {
  priceEUR: number;
  quantity: number;
};

export const DELIVERY_FEE_EUR = 180;

/** A single EUR 180 delivery fee applies when the order contains a EUR 650 harmonium. */
export function getDeliveryFee(items: PricedCartItem[]) {
  return items.some((item) => item.priceEUR === 650 && item.quantity > 0) ? DELIVERY_FEE_EUR : 0;
}

export function calculateOrderPricing(items: PricedCartItem[], couponCode?: string) {
  const subtotal = items.reduce((total, item) => total + item.priceEUR * item.quantity, 0);
  const coupon = applyCoupon(couponCode, subtotal);
  const deliveryFee = getDeliveryFee(items);
  const total = Math.max(0, subtotal + deliveryFee - (coupon?.discount || 0));

  return { subtotal, coupon, deliveryFee, total };
}
