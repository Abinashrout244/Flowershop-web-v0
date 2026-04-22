import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  MessageCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";

const supportItems = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 8249281685",
    sub: "Mon-Sun, 8:00 AM - 10:00 PM",
    gradient: "from-rose-400 to-pink-600",
    bg: "bg-rose-50",
  },
  {
    icon: Mail,
    title: "Email Support",
    value: "care@florabloom.com",
    sub: "We usually reply within 2-4 hours",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
  },
  {
    icon: MapPin,
    title: "Head Office",
    value: "Oxford,Bhubaneswar",
    sub: "Odisha, India",
    gradient: "from-emerald-400 to-teal-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Clock,
    title: "Delivery Support",
    value: "24 x 7 Order Tracking",
    sub: "Real-time delivery status updates",
    gradient: "from-violet-400 to-purple-600",
    bg: "bg-violet-50",
  },
];

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <NavHeader />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="transition-colors hover:text-[#c9a87c]">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="font-medium text-gray-600">Contact Us</span>
        </div>
      </div>

      {/* HERO BANNER */}
      <section className="relative mx-4 mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] via-[#2d1a0e] to-[#1a1a1a] md:mx-8 lg:mx-auto lg:max-w-7xl">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#c9a87c] opacity-10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-rose-500 opacity-10 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-400 opacity-5 blur-2xl" />

        <div className="relative z-10 grid items-center gap-8 px-6 py-12 md:grid-cols-2 md:px-12 md:py-16 lg:py-20">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a87c]/30 bg-[#c9a87c]/10 px-4 py-1.5">
              <MessageCircle size={12} className="text-[#c9a87c]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a87c]">
                We Are Here To Help
              </span>
            </div>
            <h1 className="font-serif text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
              Let's <span className="italic text-[#c9a87c]">Talk</span>
              <br />
              to Our Team
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-400 md:text-base">
              Need help with your order, delivery, or a special arrangement? Our
              dedicated floral experts are ready to make every moment bloom.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              {["Orders", "Deliveries", "Refunds", "Custom Bouquets"].map(
                (tag) => (
                  <div key={tag} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#c9a87c]" />
                    <span className="text-sm text-gray-300">{tag}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "50K+", label: "Happy Customers" },
              { num: "4.9★", label: "Average Rating" },
              { num: "<2hr", label: "Avg. Response" },
              { num: "24/7", label: "Order Tracking" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <p className="font-serif text-3xl font-light text-[#c9a87c]">
                  {s.num}
                </p>
                <p className="mt-1 text-xs text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 pb-20">
        {/* Support Cards */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supportItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                />
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg}`}
                >
                  <div
                    className={`bg-gradient-to-br ${item.gradient} inline-flex h-10 w-10 items-center justify-center rounded-xl`}
                  >
                    <Icon size={18} className="text-white" />
                  </div>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  {item.title}
                </p>
                <p className="mt-1.5 text-base font-bold text-gray-800">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-gray-500">{item.sub}</p>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${item.gradient} transition-all duration-500 group-hover:w-full`}
                />
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-5 lg:items-stretch">
          {/* LEFT */}
          <div className="flex lg:col-span-3">
            <div className="flex w-full flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a87c]">
                  Direct Message
                </p>
                <h2 className="font-serif text-2xl font-light text-gray-900 md:text-3xl">
                  Send Us A Message
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Fill in the form and we'll get back to you promptly.
                </p>
              </div>

              {submitted ? (
                <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-emerald-50 py-14 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    We'll reach out to you within 2-4 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-1 flex-col space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Shadow Doe"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 transition-all focus:border-[#c9a87c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a87c]/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="shadow@email.com"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 transition-all focus:border-[#c9a87c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a87c]/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 transition-all focus:border-[#c9a87c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a87c]/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500">
                        Order ID
                      </label>
                      <input
                        type="text"
                        value={form.orderId}
                        onChange={(e) =>
                          setForm({ ...form, orderId: e.target.value })
                        }
                        placeholder="#FB-2024-XXXX (optional)"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 transition-all focus:border-[#c9a87c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a87c]/20"
                      />
                    </div>
                  </div>

                  {/* Topic Tags */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-500">
                      Topic
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Order Issue",
                        "Delivery",
                        "Refund",
                        "Custom Order",
                        "General",
                      ].map((t) => (
                        <button
                          type="button"
                          key={t}
                          className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500 transition-all hover:border-[#c9a87c] hover:bg-[#fdf6ec] hover:text-[#c9a87c]"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Textarea grows to fill remaining space */}
                  <div className="flex flex-1 flex-col">
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Message *
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Tell us how we can help you today..."
                      className="min-h-[120px] flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 transition-all focus:border-[#c9a87c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a87c]/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1a1a1a] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#c9a87c] sm:w-auto"
                  >
                    <Send
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Map  */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              <div className="relative flex-1">
                <iframe
                  title="FloraBloom Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5422.505107422065!2d85.93151538307218!3d20.28415808673435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a197555eca1853d%3A0x60083b2363b95fc2!2sOXFORD%20COLLEGE%20OF%20ENGINEERING%20%26%20MANAGEMENT!5e0!3m2!1sen!2sin!4v1776780076105!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "220px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                />
                <div className="absolute left-3 top-3 rounded-xl bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur-sm">
                  <p className="text-xs font-bold text-gray-800">
                    FloraBloom HQ
                  </p>
                  <p className="text-xs text-gray-500">Bandra West, Mumbai</p>
                </div>
              </div>

              {/* Address strip */}
              <div className="shrink-0 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f7f1e8]">
                    <MapPin size={16} className="text-[#c9a87c]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Bandra West, Mumbai
                    </p>
                    <p className="text-xs text-gray-500">
                      Maharashtra 400050, India
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#c9a87c] hover:underline"
                    >
                      Get Directions <ArrowRight size={10} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA — fixed height, sits at bottom */}
            <div className="relative shrink-0 overflow-hidden rounded-3xl bg-gradient-to-br from-[#25D366] to-[#128C7E] p-5 text-white shadow-sm">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white opacity-10" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
                Instant Support
              </p>
              <h3 className="mt-1 font-serif text-xl font-light">
                Chat on WhatsApp
              </h3>
              <p className="mt-1 text-xs opacity-80">
                Fastest way to reach our team
              </p>
              <a
                href="https://wa.me/8249281685"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-xs font-semibold backdrop-blur-sm transition-all hover:bg-white/30"
              >
                Start Chat <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </main>

      <FlowerFooter />
    </div>
  );
};

export default ContactPage;
