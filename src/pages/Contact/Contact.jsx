import { Link } from "react-router-dom";
import { ChevronRight, Mail, MapPin, Phone, Clock } from "lucide-react";
import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";

const supportItems = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 98765 43210",
    sub: "Mon-Sun, 8:00 AM - 10:00 PM",
  },
  {
    icon: Mail,
    title: "Email Support",
    value: "care@florabloom.com",
    sub: "We usually reply within 2-4 hours",
  },
  {
    icon: MapPin,
    title: "Head Office",
    value: "Bandra West, Mumbai",
    sub: "Maharashtra, India",
  },
  {
    icon: Clock,
    title: "Delivery Support",
    value: "24 x 7 Order Tracking",
    sub: "Real-time delivery status updates",
  },
];

const ContactPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />

    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link to="/" className="transition-colors hover:text-[#c9a87c]">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-600">Contact Us</span>
      </div>
    </div>

    <main className="mx-auto max-w-7xl px-4 pb-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a87c]">
          We Are Here To Help
        </p>
        <h1 className="font-serif-display text-3xl font-light text-gray-900 md:text-5xl">
          Contact Customer Service
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-500 md:text-base">
          Need help with your order, delivery, or refund? Reach out and our support team
          will assist you quickly.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {supportItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f1e8] text-[#c9a87c]">
                <Icon size={18} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">{item.title}</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">{item.value}</p>
              <p className="mt-1 text-sm text-gray-500">{item.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
        <h2 className="font-serif-display text-2xl font-light text-gray-900 md:text-3xl">Send Us A Message</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Full Name"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#c9a87c] focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#c9a87c] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#c9a87c] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Order ID (optional)"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#c9a87c] focus:outline-none"
          />
          <textarea
            rows={5}
            placeholder="Tell us how we can help..."
            className="md:col-span-2 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#c9a87c] focus:outline-none"
          />
        </div>
        <button className="mt-5 rounded-full bg-[#1a1a1a] px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#c9a87c]">
          Submit Request
        </button>
      </div>
    </main>

    <FlowerFooter />
  </div>
);

export default ContactPage;


