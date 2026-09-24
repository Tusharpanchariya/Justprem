"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, Mail, Sparkles, X } from "lucide-react";

type Course = {
  id: string;
  duration: string;
  category: string;
  title: string;
  description: string;
  price: string;
  details: string[];
  theme: "light" | "dark";
  buttonText?: string;
  disabled?: boolean;
};

const courses: Course[] = [
  {
    id: "recorded-bhakti-foundation",
    duration: "01",
    category: "RECORDED BHAKTI FOUNDATION",
    title: "Your first step into\nSacred Sound",
    description: "A self-paced introduction to harmonium and Bhakti music.",
    price: "€108",
    details: [
      "Fully recorded course",
      "10 Kirtans to learn and play on harmonium",
      "Introduction to the harmonium",
      "Major and minor chords",
      "Foundations of accompanying your voice",
      "Lifetime access to recorded material"
    ],
    theme: "light",
    buttonText: "UPCOMING COURSE",
    disabled: true,
  },
  {
    id: "2-months-bhakti-foundation",
    duration: "02",
    category: "2 MONTHS · BHAKTI FOUNDATION",
    title: "A guided foundation",
    description: "Build a strong foundation in harmonium, voice and Bhakti practice.",
    price: "€650",
    details: [
      "2-month guided course",
      "10 live classes",
      "Harmonium foundations",
      "Kirtan, voice and musical expression",
      "Scales, chords and basic music theory",
      "Practice and integration between classes"
    ],
    theme: "dark",
  },
  {
    id: "6-months-deep-immersion",
    duration: "03",
    category: "6 MONTHS · DEEP IMMERSION",
    title: "Go deeper into the\npractice",
    description: "Six months to deepen the music, philosophy and personal sādhanā of Bhakti.",
    price: "€2,000",
    details: [
      "6-month deep immersion",
      "30 lessons",
      "Progressive harmonium training",
      "Deeper kirtan and voice development",
      "Transposition, scales and chords",
      "Certification upon completion"
    ],
    theme: "light",
  },
];

const dateKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const displayDate = (date: Date) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(date);

export function BhaktiYogaOffers() {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/class-bookings").then((response) => response.json()).then((data: { bookedDates?: string[] }) => setBookedDates(data.bookedDates || [])).catch(() => setMessage("Dates are unavailable at the moment. Please try again shortly."));
  }, []);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return Array.from({ length: firstDay + count }, (_, index) => index < firstDay ? null : new Date(month.getFullYear(), month.getMonth(), index - firstDay + 1));
  }, [month]);

  const openApplication = (course: Course) => { setActiveCourse(course); setStatus("idle"); setMessage(""); };
  const closeApplication = () => { if (status !== "loading") setActiveCourse(null); };
  const today = dateKey(new Date());

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activeCourse || !selectedDate) return;
    setStatus("loading"); setMessage("");
    try {
      const response = await fetch("/api/class-bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ courseId: activeCourse.id, courseName: activeCourse.title, name, email, phone, bookingDate: selectedDate }) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "We could not reserve that date.");
      setBookedDates((dates) => [...dates, selectedDate]);
      setStatus("success"); setMessage(`Thank you, ${name}. Your application for ${displayDate(new Date(`${selectedDate}T12:00:00`))} has been received. A confirmation email is on its way.`);
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "We could not send your application."); }
  }

  return <section id="class-offerings" className="bg-ivory px-6 py-20 text-charcoal md:px-12 md:py-32">
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-10 border-b border-charcoal/15 pb-20 md:grid-cols-[1.05fr_.9fr] md:items-end">
        <div><p className="text-[10px] uppercase tracking-[.22em] text-wood md:text-xs">07 / Path of Bhakti Yoga</p><h2 className="mt-7 font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[.82] tracking-[-.045em]">Slow. Steady.<br /><em className="text-[#ad684d]">Sacred.</em></h2></div>
        <div><h3 className="font-serif text-xl leading-tight md:text-2xl">Bhakti Yoga is not only something we learn — it is something we live.</h3><p className="mt-4 max-w-xl text-sm leading-6 text-charcoal/70">Choose the pace that feels right for you, from a simple introduction to a deep one-year sādhanā. Every step supports a bigger vision: an eco-conscious community in the Himalayas, with spaces for yoga, spiritual practice and service.</p></div>
      </div>

      <div className="mt-20 grid gap-10 md:grid-cols-[1.05fr_.9fr] md:items-end">
        <div><p className="text-[10px] uppercase tracking-[.22em] text-wood md:text-xs">THE COURSE FRAMEWORK</p><h2 className="mt-7 font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[.85]">Choose your<br /><em className="text-[#ad684d]">depth of practice.</em></h2></div>
        <div><p className="max-w-xs text-sm leading-6 text-charcoal/70">Two pathways, one intention: to let sacred sound become a practice you can carry into daily life and share with others.</p></div>
      </div>

      <div className="mt-14 grid lg:grid-cols-3">
        {courses.map((course) => (
          <article key={course.id} className={`flex min-h-[500px] flex-col p-8 md:p-12 ${course.theme === "dark" ? "bg-[#567262] text-ivory" : "bg-[#f4efe5] text-charcoal"}`}>
            <div className="flex gap-4 text-[10px] uppercase tracking-widest text-[#ad684d] md:text-xs">
              <span className={course.theme === "dark" ? "text-[#efd09a]" : "text-[#ad684d]"}>{course.duration}</span>
              <span className={course.theme === "dark" ? "text-ivory/85" : "text-[#ad684d]"}>{course.category}</span>
            </div>
            
            <h3 className="mt-14 whitespace-pre-line font-serif text-3xl leading-[1.1] tracking-tight lg:text-4xl">
              {course.title}
            </h3>
            
            <p className={`mt-6 text-sm leading-6 ${course.theme === "dark" ? "text-ivory/70" : "text-charcoal/70"}`}>
              {course.description}
            </p>

            <p className={`mt-10 font-serif text-5xl md:text-6xl ${course.theme === "dark" ? "text-[#efd09a]" : "text-[#ad684d]"}`}>
              {course.price}
            </p>
            
            <ul className={`mt-8 space-y-3 border-t pt-8 text-sm leading-6 ${course.theme === "dark" ? "border-white/20 text-ivory/80" : "border-charcoal/15 text-charcoal/70"}`}>
              {course.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
            
            <button type="button" disabled={course.disabled} onClick={() => !course.disabled && openApplication(course)} className={`mt-auto pt-16 text-left text-xs uppercase tracking-widest transition-colors ${course.disabled ? "cursor-default text-charcoal/40" : course.theme === "dark" ? "text-ivory hover:text-white" : "text-charcoal/60 hover:text-charcoal"}`}>
              {course.buttonText || "CHOOSE THIS PATH"} {course.disabled ? "" : "↗"}
            </button>
          </article>
        ))}
      </div>
    </div>

    {activeCourse && <div className="fixed inset-0 z-[70] overflow-y-auto bg-charcoal/70 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Class application">
      <div className="mx-auto my-5 max-w-2xl overflow-hidden bg-ivory shadow-[18px_20px_0_rgba(14,27,16,.22)] md:my-10">
        <div className="relative overflow-hidden bg-[#567262] px-6 py-7 text-ivory md:px-10 md:py-9"><div className="absolute -right-8 -top-12 text-[10rem] leading-none text-white/5">◌</div><div className="relative flex items-start justify-between gap-6"><div><p className="flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-[#efd09a]"><Sparkles className="h-3.5 w-3.5" /> Path of Bhakti Yoga</p><h2 className="mt-3 max-w-md font-serif text-3xl leading-tight md:text-4xl">Begin your application</h2><p className="mt-2 text-sm text-ivory/75">{activeCourse.title}</p></div><button type="button" onClick={closeApplication} className="rounded-full border border-white/30 p-2 text-ivory transition-colors hover:bg-white/10" aria-label="Close form"><X className="h-5 w-5" /></button></div></div>
        {status === "success" ? <div className="p-6 md:p-10"><div className="mx-auto max-w-md text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#567262] text-[#efd09a]"><Check className="h-8 w-8" strokeWidth={2.5} /></div><p className="mt-7 text-[10px] uppercase tracking-[.2em] text-[#ad684d]">Application received</p><h3 className="mt-3 font-serif text-4xl leading-tight">A beautiful beginning.</h3><p className="mt-5 text-sm leading-7 text-charcoal/70">{message}</p><div className="mt-7 flex items-center justify-center gap-3 border-y border-charcoal/10 py-4 text-sm text-charcoal/70"><Mail className="h-4 w-4 text-[#ad684d]" /> Please check your inbox for your confirmation.</div><button type="button" onClick={closeApplication} className="mt-8 min-h-12 bg-[#567262] px-7 text-xs uppercase tracking-widest text-ivory transition-colors hover:bg-forest">Close</button></div></div> : <form onSubmit={submit} className="p-6 md:p-10"><div className="flex items-center gap-3 border-b border-charcoal/10 pb-5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ad684d] font-serif text-sm text-ivory">1</span><div><h3 className="font-serif text-xl">Choose your starting date</h3><p className="text-xs text-charcoal/60">Dates marked Full are already reserved.</p></div></div><div className="mt-5 border border-charcoal/15 bg-white/50 p-4"><div className="mb-4 flex items-center justify-between"><button type="button" onClick={() => setMonth((value) => new Date(value.getFullYear(), value.getMonth() - 1, 1))} className="rounded-full p-2 transition-colors hover:bg-charcoal/5" aria-label="Previous month">←</button><p className="font-serif text-xl">{new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(month)}</p><button type="button" onClick={() => setMonth((value) => new Date(value.getFullYear(), value.getMonth() + 1, 1))} className="rounded-full p-2 transition-colors hover:bg-charcoal/5" aria-label="Next month">→</button></div><div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wide text-charcoal/55">{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => <span key={day}>{day}</span>)}</div><div className="mt-2 grid grid-cols-7 gap-1">{calendarDays.map((day, index) => { if (!day) return <span key={`empty-${index}`} />; const key = dateKey(day); const full = bookedDates.includes(key); const unavailable = key < today || full; return <button key={key} type="button" disabled={unavailable} onClick={() => setSelectedDate(key)} className={`min-h-12 border p-1 text-xs transition-colors ${selectedDate === key ? "border-[#567262] bg-[#567262] text-ivory shadow-sm" : full ? "border-red-200 bg-red-50 text-red-700 line-through" : unavailable ? "border-charcoal/10 text-charcoal/30" : "border-charcoal/15 bg-ivory hover:border-[#567262] hover:text-[#567262]"}`}><span className="block">{day.getDate()}</span>{full && <span className="block text-[8px] no-underline">Full</span>}</button>; })}</div></div>{selectedDate && <div className="mt-4 flex items-center gap-3 bg-[#567262]/10 p-3 text-sm text-[#365445]"><CalendarDays className="h-5 w-5" /><span>Selected: <strong>{displayDate(new Date(`${selectedDate}T12:00:00`))}</strong></span></div>}<div className="mt-8 flex items-center gap-3 border-b border-charcoal/10 pb-5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ad684d] font-serif text-sm text-ivory">2</span><div><h3 className="font-serif text-xl">Your details</h3><p className="text-xs text-charcoal/60">We will send the confirmation to this email.</p></div></div><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="block text-sm font-medium">Full name<input required value={name} onChange={(event) => setName(event.target.value)} maxLength={100} placeholder="Your name" className="mt-2 w-full border border-charcoal/20 bg-white/50 px-3 py-3 font-normal placeholder:text-charcoal/35 focus:border-[#567262] focus:outline-none" /></label><label className="block text-sm font-medium">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={254} placeholder="you@example.com" className="mt-2 w-full border border-charcoal/20 bg-white/50 px-3 py-3 font-normal placeholder:text-charcoal/35 focus:border-[#567262] focus:outline-none" /></label><label className="block text-sm font-medium sm:col-span-2">Phone number<input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} maxLength={20} placeholder="+1 (555) 000-0000" className="mt-2 w-full border border-charcoal/20 bg-white/50 px-3 py-3 font-normal placeholder:text-charcoal/35 focus:border-[#567262] focus:outline-none" /></label></div>{message && <p className="mt-5 border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">{message}</p>}<button disabled={!selectedDate || status === "loading"} className="mt-8 flex min-h-14 w-full items-center justify-center gap-3 bg-[#567262] px-6 text-xs uppercase tracking-widest text-ivory transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-50">{status === "loading" ? "Sending your application…" : <><Mail className="h-4 w-4" /> Send application</>}</button><p className="mt-4 text-center text-xs leading-5 text-charcoal/55">Your date will be reserved once your application is submitted.</p></form>}
      </div>
    </div>}
  </section>;
}
