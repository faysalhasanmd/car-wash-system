"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

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
    <p ref={ref} className="text-2xl sm:text-3xl font-bold">
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

// Fanned, auto-advancing card stack — the hero's interactive "wash line" slider
const ServiceCardStack = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % services.length);
    }, 3500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* floating stat chip */}
      <div className="absolute -top-4 -right-3 sm:-top-5 sm:-right-4 bg-[#15191C] text-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2 z-30">
        <span className="text-emerald-400 font-bold text-sm">~22 min</span>
        <span className="text-[10px] text-gray-300 font-medium leading-tight">
          avg arrival
          <br />
          time
        </span>
      </div>

      <div className="relative h-64 sm:h-72">
        {services.map((s, i) => {
          const offset = (i - active + services.length) % services.length;
          if (offset > 2) return null;
          const isActive = offset === 0;
          return (
            <Link
              key={s.title}
              href="/services"
              className="absolute inset-x-0 top-0 block"
              style={{
                zIndex: 10 - offset,
                transform: `translateY(${offset * 14}px) scale(${1 - offset * 0.05})`,
                opacity: offset > 2 ? 0 : 1 - offset * 0.28,
                transition: "transform 0.5s ease, opacity 0.5s ease",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <div className="bg-white border border-[#E4E1DA] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 sm:p-7 h-64 sm:h-72 flex flex-col justify-between hover:border-emerald-300 transition-colors">
                <div>
                  <div className="text-4xl sm:text-5xl mb-4">{s.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#15191C]">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#E4E1DA]">
                  <span className="text-emerald-600 font-bold text-lg">
                    from {s.price}
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* controls */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex gap-1.5">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show ${services[i].title}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active
                  ? "w-6 bg-emerald-600"
                  : "w-1.5 bg-[#E4E1DA] hover:bg-emerald-200"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setActive((a) => (a - 1 + services.length) % services.length)
            }
            aria-label="Previous service"
            className="w-8 h-8 rounded-full border border-[#E4E1DA] flex items-center justify-center hover:border-emerald-400 hover:text-emerald-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActive((a) => (a + 1) % services.length)}
            aria-label="Next service"
            className="w-8 h-8 rounded-full border border-[#E4E1DA] flex items-center justify-center hover:border-emerald-400 hover:text-emerald-600 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
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
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* ── Hero ── */}
      <section className="relative bg-[#F7F5F1] text-[#15191C] overflow-hidden h-auto md:h-[65vh] md:min-h-[560px] md:max-h-[760px] flex items-center border-b border-[#E4E1DA]">
        {/* decorative mist blobs */}
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-emerald-100/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full bg-[#DCEFFB]/70 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-16 md:py-0 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Text column */}
            <div className="lg:col-span-7">
              <span
                className="inline-block text-emerald-700 text-sm font-semibold tracking-widest uppercase mb-4"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                  transition:
                    "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                }}
              >
                Doorstep Detailing · Dhaka
              </span>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
                }}
              >
                Book a Wash.
                <br />
                We Handle{" "}
                <span className="underline decoration-emerald-400 decoration-[6px] underline-offset-4">
                  the Rest
                </span>
              </h1>
              <p
                className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
                }}
              >
                From a quick rinse to full detailing — tell us where you are, we
                bring the bay to you. See what's on the line right now.
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
                <Link href="/services" className="w-full sm:w-auto">
                  <button className="w-full px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all text-sm hover:scale-105 active:scale-95">
                    Book a Wash
                  </button>
                </Link>
                <Link href="/aboutUs" className="w-full sm:w-auto">
                  <button className="w-full px-7 py-3.5 border border-[#15191C]/15 hover:border-[#15191C]/40 text-[#15191C] font-medium rounded-xl transition-all text-sm hover:scale-105 active:scale-95">
                    About Us
                  </button>
                </Link>
              </div>
            </div>

            {/* Card-stack slider column */}
            <div
              className="lg:col-span-5"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
              }}
            >
              <ServiceCardStack />
            </div>
          </div>
        </div>

        {/* Scroll cue → visual flow to next section */}
        <button
          type="button"
          onClick={() =>
            window.scrollBy({
              top: window.innerHeight * 0.6,
              behavior: "smooth",
            })
          }
          aria-label="Scroll to next section"
          className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-[#15191C]/40 hover:text-emerald-600 transition-colors z-20"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
            Explore
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce motion-reduce:animate-none" />
        </button>

        {/* Wave divider — emerald fill flows directly into the Stats Banner below */}
        <div className="absolute bottom-0 inset-x-0 z-10 text-emerald-600 pointer-events-none">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="w-full h-10 sm:h-14 md:h-16"
          >
            <path
              d="M0 40C240 80 480 0 720 20C960 40 1200 80 1440 40V80H0V40Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="bg-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="p-2">
              <Counter value={value} suffix={suffix} />
              <p className="text-emerald-100 text-xs sm:text-sm mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Our Services
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md mx-auto text-sm">
              From a quick wash to a full ceramic coating — we have every
              service your car needs.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ icon, title, desc, price }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div className="group border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl p-6 hover:border-emerald-200 dark:hover:border-emerald-800/60 hover:shadow-md hover:shadow-emerald-50/10 dark:hover:shadow-none transition-all hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-between">
                  <div>
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                      {icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                      {desc}
                    </p>
                  </div>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold text-lg mt-2">
                    from {price}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-12">
            <Link href="/services">
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-all hover:scale-105 active:scale-95">
                View All Services
              </button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/40 border-y border-gray-100/80 dark:border-gray-900">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              How It Works
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc }, i) => (
              <FadeIn key={step} delay={i * 0.15} className="text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-bold text-lg flex items-center justify-center mx-auto mb-5 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 hover:scale-110 transition-all">
                  {step}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
                  {title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
                  {desc}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase">
              Customer Love
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              What People Say
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating }, i) => (
              <FadeIn key={name} delay={i * 0.12}>
                <div className="border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl p-6 hover:border-emerald-100 dark:hover:border-emerald-900/50 hover:shadow-md transition-all hover:-translate-y-1 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(rating)].map((_, idx) => (
                        <span key={idx} className="text-yellow-400 text-sm">
                          ★
                        </span>
                      ))}
                      {[...Array(5 - rating)].map((_, idx) => (
                        <span
                          key={idx}
                          className="text-gray-200 dark:text-gray-700 text-sm"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 italic">
                      "{text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold text-sm flex items-center justify-center">
                      {name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {name}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {role}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6 bg-emerald-600 dark:bg-emerald-700 text-white text-center relative overflow-hidden">
        <FadeIn>
          <div className="max-w-xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for a Spotless Car?
            </h2>
            <p className="text-emerald-100 mb-8 text-sm sm:text-base leading-relaxed">
              Book a service today and let our experts take care of the rest. No
              hassle, just shine.
            </p>
            <Link href="/services" className="inline-block w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all text-sm hover:scale-105 active:scale-95 shadow-lg shadow-emerald-800/20">
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
