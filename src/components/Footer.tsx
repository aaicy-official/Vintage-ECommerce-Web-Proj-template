import Link from "next/link";

export default function Footer() {
  const footerNav = [
    { label: "Support Center", href: "#" },
    { label: "Invoicing", href: "#" },
    { label: "Contract", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "FAQ,s", href: "#" },
  ];

  return (
    <footer className="w-full border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-gray-100">
          {/* Brand Logo */}
          <Link href="/" className="font-serif text-3xl font-bold tracking-wider text-black">
            FASCO
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {footerNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-[#484848] hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-[#8A8A8A]">
          Copyright &copy; 2026 FASCO. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
