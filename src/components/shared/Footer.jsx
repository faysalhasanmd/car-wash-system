import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="https://img.freepik.com/premium-vector/vector-car-logo-design_714931-342.jpg?semt=ais_hybrid&w=740&q=80"
                className="h-9 w-9 rounded-full object-cover"
                alt="CarClean"
              />
              <span className="text-white text-[17px] font-semibold">
                CarClean
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Professional car washing and detailing services. We bring the
              shine to your doorstep — fast, affordable, and eco-friendly.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                {
                  label: "Facebook",
                  href: "https://www.facebook.com/md.faysal.751946",
                  icon: (
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  ),
                },
                {
                  label: "Twitter",
                  href: "https://en.wikipedia.org/wiki/X_(social_network)",
                  icon: (
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  ),
                },
                {
                  label: "Instagram",
                  href: "https://en.wikipedia.org/wiki/Instagram",
                  icon: (
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                  >
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/review", label: "Reviews" },
                { href: "/aboutUs", label: "About Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>📍 Dhaka, Bangladesh</li>
              <li>📞 +880 1798484639</li>
              <li>✉️ faysalhasanmd393@gmail.com</li>
              <li>⏰ Mon–Sat, 8am – 7pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} CarClean. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
