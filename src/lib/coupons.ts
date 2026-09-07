export type AppliedCoupon = {
  code: string;
  description: string;
  discount: number;
};

type Coupon = {
  code: string;
  description: string;
  percentOff?: number;
  fixedDiscountEUR?: number;
};

// Add or change promotional codes here. Amounts are calculated server-side.
const coupons: Coupon[] = [
  { code: "PREM10", description: "10% off your order", percentOff: 10 },
  { code: "PREM180", description: "EUR 180 off your order", fixedDiscountEUR: 180 },
];

export function applyCoupon(code: string | undefined, subtotal: number): AppliedCoupon | null {
  if (!code || !Number.isFinite(subtotal) || subtotal <= 0) return null;
  const coupon = coupons.find((entry) => entry.code === code.trim().toUpperCase());
  if (!coupon) return null;
  return {
    code: coupon.code,
    description: coupon.description,
    discount: Number(Math.min(coupon.fixedDiscountEUR ?? subtotal * (coupon.percentOff || 0) / 100, subtotal).toFixed(2)),
  };
}
