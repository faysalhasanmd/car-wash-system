"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: "🚿",
    title: "Exterior Wash",
    desc: "Full exterior hand wash with premium soap, tire shine, and window cleaning.",
    price: "৳299",
  },
  {
    icon: "🪣",
    title: "Interior Detailing",
    desc: "Deep vacuum, wipe-down, seat cleaning, and dashboard polish.",
    price: "৳499",
  },
  {
    icon: "✨",
    title: "Full Detail",
    desc: "Complete inside-out service — wax, polish, odor removal included.",
    price: "৳899",
  },
  {
    icon: "🪟",
    title: "Ceramic Coating",
    desc: "Long-lasting paint protection that keeps your car looking new for years.",
    price: "৳2499",
  },
];

const testimonials = [
  {
    name: "Rafiq Ahmed",
    role: "Business Owner",
    text: "My car looked brand new after the full detail. The team was professional and on time.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Teacher",
    text: "Affordable and excellent quality. The ceramic coating is definitely worth it!",
    rating: 5,
  },
  {
    name: "Tanvir Hossain",
    role: "Engineer",
    text: "Booked online and they came right to my office parking. Super convenient!",
    rating: 4,
  },
];

const stats = [
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 12, suffix: "+", label: "Services Offered" },
  { value: 4.9, suffix: "★", label: "Average Rating" },
  { value: 3, suffix: " yrs", label: "In Business" },
];

const steps = [
  {
    step: "01",
    title: "Book Online",
    desc: "Choose a service and pick a time that works for you.",
  },
  {
    step: "02",
    title: "We Come To You",
    desc: "Our team arrives at your location with all equipment.",
  },
  {
    step: "03",
    title: "Spotless Result",
    desc: "Your car is cleaned and handed back in top condition.",
  },
];

// Intersection Observer hook
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
};

// Animated counter
const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(
          Number.isInteger(value)
            ? Math.floor(current)
            : parseFloat(current.toFixed(1)),
        );
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <p ref={ref} className="text-3xl font-bold">
      {count}
      {suffix}
    </p>
  );
};

// Fade-in section wrapper
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const HomePage = () => {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-white text-gray-900">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_#10b981_0%,_transparent_60%)]" />

        {/* floating blobs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500 opacity-5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-400 opacity-5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <span
              className="inline-block text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              Professional Car Care
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition:
                  "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
              }}
            >
              Your Car Deserves
              <span className="text-emerald-400"> the Best</span> Clean
            </h1>
            <p
              className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
              }}
            >
              Premium car washing and detailing services at your doorstep.
              Trusted by 5,000+ customers across Dhaka.
            </p>
            <div
              className="flex flex-wrap gap-3"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition:
                  "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
              }}
            >
              <Link href="/services">
                <button className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all text-sm hover:scale-105 active:scale-95">
                  Browse Services
                </button>
              </Link>
              <Link href="/aboutUs">
                <button className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-xl transition-all text-sm hover:scale-105 active:scale-95">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="bg-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, suffix, label }) => (
            <div key={label}>
              <Counter value={value} suffix={suffix} />
              <p className="text-emerald-100 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-emerald-600 text-sm font-semibold tracking-widest uppercase">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Our Services
            </h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">
              From a quick wash to a full ceramic coating — we have every
              service your car needs.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ icon, title, desc, price }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div className="group border border-gray-100 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50 transition-all hover:-translate-y-1 cursor-pointer h-full">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                    {icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {desc}
                  </p>
                  <p className="text-emerald-600 font-bold text-lg">
                    from {price}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-10">
            <Link href="/services">
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-all hover:scale-105 active:scale-95">
                View All Services
              </button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-emerald-600 text-sm font-semibold tracking-widest uppercase">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              How It Works
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc }, i) => (
              <FadeIn key={step} delay={i * 0.15} className="text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 font-bold text-lg flex items-center justify-center mx-auto mb-5 hover:bg-emerald-200 hover:scale-110 transition-all">
                  {step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-emerald-600 text-sm font-semibold tracking-widest uppercase">
              Customer Love
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              What People Say
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating }, i) => (
              <FadeIn key={name} delay={i * 0.12}>
                <div className="border border-gray-100 rounded-2xl p-6 hover:border-emerald-100 hover:shadow-md transition-all hover:-translate-y-1 h-full">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">
                        ★
                      </span>
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                      <span key={i} className="text-gray-200 text-sm">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    "{text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm flex items-center justify-center">
                      {name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {name}
                      </p>
                      <p className="text-xs text-gray-400">{role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6 bg-emerald-600 text-white text-center">
        <FadeIn>
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for a Spotless Car?
            </h2>
            <p className="text-emerald-100 mb-8 text-sm leading-relaxed">
              Book a service today and let our experts take care of the rest. No
              hassle, just shine.
            </p>
            <Link href="/services">
              <button className="px-8 py-3.5 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all text-sm hover:scale-105 active:scale-95">
                Book Now
              </button>
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
};

export default HomePage;
