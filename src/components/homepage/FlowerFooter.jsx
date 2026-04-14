import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  Company: ["About Us", "Weddings", "Careers", "Press & Media", "Blog"],
  Help: ["Contact Us", "FAQ", "Track Order", "Returns Policy", "Privacy Policy"],
  Legal: ["Terms & Conditions", "Cookie Policy", "Sitemap"],
};

const flowerLists = {
  "Flowers for Special Days": [
    "Birthday Flowers", "Anniversary Flowers", "Valentine Flowers",
    "Mother's Day Flowers", "Congratulations Flowers", "Get Well Soon Flowers",
  ],
  "Flower Types": [
    "Roses", "Lilies", "Orchids", "Sunflowers", "Tulips",
    "Gerberas", "Carnations", "Mixed Bouquets",
  ],
  "Colors": [
    "Red Flowers", "Pink Flowers", "White Flowers", "Yellow Flowers",
    "Purple Flowers", "Peach Flowers", "Orange Flowers",
  ],
  "Delivery Cities": [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
    "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Surat",
  ],
};

const paymentIcons = ["💳 Visa", "💳 Mastercard", "📱 UPI", "💰 PayPal", "📲 GPay", "🔒 COD"];
const footerRouteMap = {
  "About Us": "/about",
  Weddings: "/weddings",
  Careers: "/careers",
  "Press & Media": "/press-media",
  Blog: "/blog",
  
  "Contact Us": "/contact",
  FAQ: "/faq",
  "Returns Policy": "/returns-policy",
  "Privacy Policy": "/privacy-policy",
  "Terms & Conditions": "/terms-conditions",
  "Cookie Policy": "/cookie-policy",
  Sitemap: "/sitemap",
};

const flowerLinkRouteMap = {
  "Birthday Flowers": "/flowers?search=Birthday",
  "Anniversary Flowers": "/flowers?search=Anniversary",
  "Valentine Flowers": "/flowers?search=Valentine",
  "Mother's Day Flowers": "/flowers?search=Mother%27s%20Day",
  "Congratulations Flowers": "/flowers?search=Congratulations",
  "Get Well Soon Flowers": "/flowers?search=Get%20Well%20Soon",
  Roses: "/shop?category=Roses",
  Lilies: "/shop?category=Lilies",
  Orchids: "/shop?category=Orchids",
  Sunflowers: "/shop?category=Sunflowers",
  Tulips: "/shop?category=Tulips",
  Gerberas: "/flowers?search=Gerberas",
  Carnations: "/flowers?search=Carnations",
  "Mixed Bouquets": "/shop?category=Mixed",
  "Red Flowers": "/flowers?search=Red",
  "Pink Flowers": "/flowers?search=Pink",
  "White Flowers": "/flowers?search=White",
  "Yellow Flowers": "/flowers?search=Yellow",
  "Purple Flowers": "/flowers?search=Purple",
  "Peach Flowers": "/flowers?search=Peach",
  "Orange Flowers": "/flowers?search=Orange",
};

const FlowerFooter = () => (
  <footer className="bg-[#0f0f0f] text-white">
    {/* Trust strip */}
    <div className="border-b border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { icon: "🌸", title: "100% Fresh", sub: "Or your money back" },
          { icon: "🚀", title: "Same Day", sub: "Delivery available" },
          { icon: "🌍", title: "135+ Countries", sub: "Worldwide delivery" },
          { icon: "⭐", title: "4.9 / 5 Rating", sub: "28,000+ reviews" },
        ].map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-2">
            <span className="text-3xl">{item.icon}</span>
            <p className="font-semibold text-sm text-white">{item.title}</p>
            <p className="text-xs text-white/40">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Main footer */}
    <div className="max-w-7xl mx-auto px-4 py-14">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">

        {/* Brand column */}
        <div className="md:col-span-3">
          <div className="mb-5">
            <span className="font-serif-display text-2xl font-light tracking-[0.15em]">Flora</span>
            <span className="text-[10px] text-[#c9a87c] tracking-[0.35em] ml-1 uppercase">& Bloom</span>
          </div>
          <p className="text-white/50 text-xs leading-relaxed mb-6 font-light">
            Celebrating over 100 years of bringing nature's most beautiful creations to life's most meaningful moments.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { Icon: Instagram, href: "#" },
              { Icon: Facebook, href: "#" },
              { Icon: Linkedin, href: "#" },
              { Icon: Twitter, href: "#" },
              { Icon: Youtube, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 border border-white/15 rounded-full flex items-center justify-center text-white/50 hover:text-[#c9a87c] hover:border-[#c9a87c]/40 transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="md:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4">
              {title}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  {footerRouteMap[link] ? (
                    <Link
                      to={footerRouteMap[link]}
                      className="footer-link text-xs text-white/45 hover:text-[#c9a87c] transition-colors"
                    >
                      {link}
                    </Link>
                  ) : (
                    <a href="#" className="footer-link text-xs text-white/45 hover:text-[#c9a87c] transition-colors">
                      {link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="md:col-span-3">
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4">
            Stay In Bloom
          </h4>
          <p className="text-xs text-white/45 leading-relaxed mb-4 font-light">
            Get exclusive offers, floral inspiration, and seasonal updates delivered to your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#c9a87c]/50 transition-colors"
            />
            <button className="bg-[#c9a87c] text-white px-4 py-2.5 rounded-full text-xs font-semibold hover:bg-[#b8966b] transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Extended flower link lists */}
      <div className="border-t border-white/10 pt-10 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(flowerLists).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60 mb-3">
                {title}
              </h4>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link}>
                    {flowerLinkRouteMap[link] ? (
                      <Link
                        to={flowerLinkRouteMap[link]}
                        className="footer-link text-[11px] text-white/35 hover:text-[#c9a87c] transition-colors"
                      >
                        {link}
                      </Link>
                    ) : (
                      <a href="#" className="footer-link text-[11px] text-white/35 hover:text-[#c9a87c] transition-colors">
                        {link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-white/30 order-2 md:order-1">
          © {new Date().getFullYear()} Flora & Bloom. All rights reserved. Est. 1924.
        </p>

        {/* Payment methods */}
        <div className="flex flex-wrap items-center justify-center gap-2 order-1 md:order-2">
          {paymentIcons.map((icon) => (
            <span
              key={icon}
              className="text-[10px] text-white/40 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md"
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default FlowerFooter;
