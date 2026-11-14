"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import type { CartItem } from "@/lib/context/CartContext";

type PayPalButtonsActions = {
  reject: () => void;
  resolve: () => void;
};

type PayPalButtonsData = {
  orderID: string;
};

type PayPalButtons = {
  render: (container: HTMLDivElement) => Promise<void>;
};

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: {
        style?: { layout: "vertical"; color: "gold"; shape: "rect"; label: "paypal" };
        onClick?: (_data: unknown, actions: PayPalButtonsActions) => void;
        createOrder: () => Promise<string>;
        onApprove: (data: PayPalButtonsData) => Promise<void>;
        onCancel: () => void;
        onError: (error: unknown) => void;
      }) => PayPalButtons;
    };
  }
}

type PayPalButtonProps = {
  items: CartItem[];
  couponCode?: string;
  consentInput: Record<string, unknown>;
  termsAccepted: boolean;
  validateCheckout: () => boolean;
  onSuccess: (paymentId: string, consentId: string) => Promise<void>;
  onProcessingChange: (isProcessing: boolean) => void;
};

export function PayPalButton({
  items,
  couponCode,
  consentInput,
  termsAccepted,
  validateCheckout,
  onSuccess,
  onProcessingChange,
}: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);
  const [isSdkReady, setIsSdkReady] = useState(
    typeof window !== "undefined" && Boolean(window.paypal),
  );
  const [error, setError] = useState("");
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const latestRef = useRef({ consentInput, termsAccepted, items, couponCode, validateCheckout, onSuccess, onProcessingChange });
  const consentIdRef = useRef("");
  useEffect(() => {
    latestRef.current = { consentInput, termsAccepted, items, couponCode, validateCheckout, onSuccess, onProcessingChange };
  }, [consentInput, termsAccepted, items, couponCode, validateCheckout, onSuccess, onProcessingChange]);

  useEffect(() => {
    if (!isSdkReady || !window.paypal || !containerRef.current || renderedRef.current) {
      return;
    }

    renderedRef.current = true;
    window.paypal
      .Buttons({
        style: { layout: "vertical", color: "gold", shape: "rect", label: "paypal" },
        onClick: (_data, actions) => {
          if (latestRef.current.termsAccepted && latestRef.current.validateCheckout()) {
            actions.resolve();
            return;
          }

          actions.reject();
        },
        createOrder: async () => {
          setError("");
          latestRef.current.onProcessingChange(true);
          const response = await fetch("/api/checkout/accept-terms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...latestRef.current.consentInput, accepted: latestRef.current.termsAccepted, items: latestRef.current.items, couponCode: latestRef.current.couponCode, policyVersion: latestRef.current.consentInput.policyVersion }),
          });
          const order = (await response.json()) as { id?: string; error?: string; consentId?: string };

          if (!response.ok || !order.consentId) {
            latestRef.current.onProcessingChange(false);
            throw new Error(order.error || "Unable to record your terms acceptance.");
          }
          consentIdRef.current = order.consentId;

          const paymentResponse = await fetch("/api/checkout/paypal/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: latestRef.current.items, couponCode: latestRef.current.couponCode, consentId: order.consentId }) });
          const paymentOrder = (await paymentResponse.json()) as { id?: string; error?: string };
          if (!paymentResponse.ok || !paymentOrder.id) { latestRef.current.onProcessingChange(false); throw new Error(paymentOrder.error || "Unable to start the PayPal checkout."); }

          return paymentOrder.id;
        },
        onApprove: async ({ orderID }) => {
          const response = await fetch("/api/checkout/paypal/capture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: orderID }),
          });
          const result = (await response.json()) as { paymentId?: string; consentId?: string; error?: string };

          if (!response.ok || !result.paymentId) {
            latestRef.current.onProcessingChange(false);
            throw new Error(result.error || "PayPal could not confirm your payment.");
          }

          await latestRef.current.onSuccess(result.paymentId, result.consentId || consentIdRef.current);
        },
        onCancel: () => latestRef.current.onProcessingChange(false),
        onError: (paypalError) => {
          console.error("PayPal checkout error:", paypalError);
          setError("PayPal could not start the checkout. Please try again.");
          latestRef.current.onProcessingChange(false);
        },
      })
      .render(containerRef.current)
      .catch((renderError: unknown) => {
        console.error("PayPal button render error:", renderError);
        setError("PayPal is unavailable at the moment. Please try again later.");
        latestRef.current.onProcessingChange(false);
      });
  }, [isSdkReady]);

  if (!clientId) {
    return <p className="text-sm text-red-700">PayPal is not configured yet.</p>;
  }

  return (
    <div className="space-y-3">
      <Script
        id="paypal-sdk"
        src={`https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=EUR&intent=capture&components=buttons`}
        strategy="afterInteractive"
        onLoad={() => setIsSdkReady(true)}
        onError={() => setError("PayPal could not load. Please refresh and try again.")}
      />
      <div ref={containerRef} />
      {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
    </div>
  );
}
