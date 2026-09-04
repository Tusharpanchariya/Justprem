"use client";

import { FormEvent, useEffect, useState } from "react";
import { Star } from "lucide-react";

type Review = { id: string; name: string; rating: number; message: string; createdAt: string };

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => { fetch("/api/reviews").then((response) => response.ok ? response.json() : { reviews: [] }).then((data) => setReviews(data.reviews || [])).catch(() => undefined); }, []);

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!rating) return;
    setStatus("submitting");
    try {
      const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rating, name, email, message }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setReviews((current) => [data.review, ...current]);
      setRating(0); setName(""); setEmail(""); setMessage(""); setStatus("success");
    } catch { setStatus("error"); }
  }

  return <section className="min-h-screen bg-ivory px-6 pb-24 pt-36 md:pb-32 md:pt-44"><div className="mx-auto max-w-5xl">
    <p className="mb-3 text-center text-xs uppercase tracking-[0.26em] text-charcoal/55">JustPrem community</p><h1 className="font-serif text-center text-4xl text-charcoal md:text-6xl">Reviews</h1>
    <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.8fr] md:mt-20">
      <div><h2 className="font-serif text-3xl text-charcoal">Customer reviews</h2><div className="mt-7 space-y-5">{reviews.length ? reviews.map((review) => <article key={review.id} className="border border-charcoal/10 bg-white p-6"><div className="flex items-center gap-1 text-saffron">{Array.from({ length: 5 }, (_, index) => <Star key={index} className={`h-4 w-4 ${index < review.rating ? "fill-current" : "text-charcoal/20"}`} />)}</div><p className="mt-4 leading-relaxed text-charcoal/80">{review.message}</p><p className="mt-4 text-xs uppercase tracking-widest text-charcoal/55">{review.name}</p></article>) : <p className="text-charcoal/60">Be the first to share your experience.</p>}</div></div>
      <form onSubmit={submitReview} className="h-fit border border-charcoal/10 bg-white p-6 shadow-sm md:p-8"><h2 className="font-serif text-3xl text-charcoal">Write a review</h2><fieldset className="mt-7"><legend className="text-sm font-medium">Your rating *</legend><div className="mt-3 flex gap-1">{[1,2,3,4,5].map((star) => <button key={star} type="button" onClick={() => setRating(star)} aria-label={`${star} stars`} className="p-1"><Star className={`h-8 w-8 ${star <= rating ? "fill-saffron text-saffron" : "text-charcoal/25"}`} /></button>)}</div></fieldset><label className="mt-6 block text-sm font-medium">Name <span className="font-normal text-charcoal/50">(optional)</span><input value={name} onChange={(event) => setName(event.target.value)} maxLength={80} className="mt-2 w-full border border-charcoal/20 px-3 py-3 font-normal focus:border-saffron focus:outline-none" /></label><label className="mt-5 block text-sm font-medium">Email <span className="font-normal text-charcoal/50">(optional)</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={254} className="mt-2 w-full border border-charcoal/20 px-3 py-3 font-normal focus:border-saffron focus:outline-none" /></label><label className="mt-5 block text-sm font-medium">Your review *<textarea required minLength={10} maxLength={2000} rows={6} value={message} onChange={(event) => setMessage(event.target.value)} className="mt-2 w-full resize-y border border-charcoal/20 px-3 py-3 font-normal focus:border-saffron focus:outline-none" /></label>{status === "success" && <p className="mt-4 text-sm text-forest">Thank you—your review is now live.</p>}{status === "error" && <p className="mt-4 text-sm text-red-700">Your review could not be submitted. Please try again.</p>}<button disabled={!rating || status === "submitting"} className="mt-7 bg-forest px-7 py-3 text-xs font-medium uppercase tracking-widest text-ivory disabled:opacity-50">{status === "submitting" ? "Sending..." : "Publish Review"}</button></form>
    </div>
  </div></section>;
}
