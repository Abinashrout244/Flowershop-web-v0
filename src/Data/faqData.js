import {
  Building2,
  Ban,
  Truck,
  RotateCcw,
  CreditCard,
  ShoppingBag,
} from "lucide-react";

export const FAQ_CATEGORIES = [
  { id: "about", label: "About Interflora.in", icon: Building2 },
  { id: "cancellation", label: "Cancellation", icon: Ban },
  { id: "tracking", label: "Order Tracking and Delivery", icon: Truck },
  { id: "refunds", label: "Replacements, Returns and Refunds", icon: RotateCcw },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "ordering", label: "Ordering at Interflora.in", icon: ShoppingBag },
];

export const DEFAULT_FAQ_CATEGORY = "ordering";

export const FAQ_DATA = {
  about: [
    {
      question: "What is Interflora.in?",
      answer:
        "Interflora.in is an online gifting platform where you can send premium flowers, plants, and curated gifts across multiple cities with flexible delivery options.",
    },
    {
      question: "Do you deliver on weekends and public holidays?",
      answer:
        "Yes, deliveries are available on most weekends and selected holidays. Availability depends on city and product type, and is shown at checkout.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our support team through the help center, live chat, or customer service contact options available on the website.",
    },
  ],
  cancellation: [
    {
      question: "Can I cancel my order after placing it?",
      answer:
        "You can request cancellation before your order enters dispatch. Once processing begins, cancellation may not be possible for fresh products.",
    },
    {
      question: "Will I get a full refund on cancellation?",
      answer:
        "Eligible cancellations are refunded as per the cancellation policy. Payment gateway timelines may vary between banks and wallets.",
    },
    {
      question: "How long does cancellation processing take?",
      answer:
        "Cancellation requests are typically reviewed within a few business hours, and approved refunds are initiated immediately after confirmation.",
    },
  ],
  tracking: [
    {
      question: "How can I track my order?",
      answer:
        "Use the tracking link shared via email/SMS after dispatch, or visit the order tracking section and enter your order details.",
    },
    {
      question: "What if the recipient is unavailable?",
      answer:
        "Our delivery partner will attempt contact and may reattempt delivery or coordinate a suitable handover based on local policy.",
    },
    {
      question: "Can I schedule delivery for a specific time slot?",
      answer:
        "Specific slots are available for selected products and pincodes. You can choose a preferred slot at checkout where supported.",
    },
  ],
  refunds: [
    {
      question: "What if I receive a damaged product?",
      answer:
        "Please share clear photos within the support window. Our team will review and offer replacement, refund, or resolution as applicable.",
    },
    {
      question: "Do you accept returns for perishable items?",
      answer:
        "Fresh flowers and perishables are generally non-returnable, but quality issues are handled through replacement/refund support.",
    },
    {
      question: "When will my refund reflect in my account?",
      answer:
        "After approval, refunds usually reflect within 5-7 business days depending on your original payment method.",
    },
  ],
  payment: [
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept major debit/credit cards, UPI, net banking, and selected wallets depending on your location.",
    },
    {
      question: "Is online payment secure?",
      answer:
        "Yes, payments are processed through secure encrypted gateways that follow industry-standard compliance and protection practices.",
    },
    {
      question: "Can I get an invoice for my order?",
      answer:
        "Yes, a digital invoice is shared on your registered email and can also be accessed from your order details.",
    },
  ],
  ordering: [
    {
      question: "How can I buy an item?",
      answer:
        "Browse the catalog, select your preferred product, add it to cart, enter delivery details, and complete checkout using your preferred payment method.",
    },
    {
      question: "Can I place an order without creating an account?",
      answer:
        "Yes, guest checkout is available for most orders. Creating an account helps you track orders faster and save preferences.",
    },
    {
      question: "Can I add a message card to my gift?",
      answer:
        "Yes, you can include a personalized message during checkout. The message is printed and sent with your order.",
    },
    {
      question: "How do I apply a coupon code?",
      answer:
        "Enter your coupon in the promo code field at checkout. Eligible discounts are applied instantly before payment.",
    },
  ],
};
