import { Link } from "react-router-dom";
import { ChevronRight, Clock3 } from "lucide-react";
import NavHeader from "../homepage/NavHeader";
import FlowerFooter from "../homepage/FlowerFooter";

const featuredPosts = [
  {
    title: "How To Choose The Perfect Bouquet For Every Occasion",
    excerpt: "A practical guide to selecting blooms that match the mood, moment, and message you want to send.",
    tag: "Gifting Guide",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=1400&q=85&auto=format",
  },
  {
    title: "7 Expert Tips To Keep Fresh Flowers Beautiful Longer",
    excerpt: "Use these florist-approved care rituals to help your bouquet stay fresh and vibrant for days.",
    tag: "Flower Care",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1457089328109-e5d9f56adce9?w=1400&q=85&auto=format",
  },
  {
    title: "The Rise Of Luxury Floral Styling In Modern Weddings",
    excerpt: "Explore how statement florals, texture layering, and color palettes are defining upscale wedding decor.",
    tag: "Weddings",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1400&q=85&auto=format",
  },
];

const BlogPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />

    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link to="/" className="transition-colors hover:text-[#c9a87c]">Home</Link>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-600">Blog</span>
      </div>
    </div>

    <main className="mx-auto max-w-7xl px-4 pb-16">
      <section className="rounded-2xl border border-gray-200 bg-white p-7 md:p-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a87c]">Journal</p>
        <h1 className="font-serif-display text-4xl font-light text-gray-900 md:text-5xl">
          Floral Stories & Inspirations
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
          Discover styling ideas, gifting trends, care tips, and behind-the-scenes craftsmanship
          from the world of premium florals.
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featuredPosts.map((post) => (
          <article key={post.title} className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-xl">
            <div className="relative h-52 overflow-hidden">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e9cfa9]">
                {post.tag}
              </span>
            </div>
            <div className="p-5">
              <h2 className="font-serif-display text-2xl font-light text-gray-900">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                  <Clock3 size={13} />
                  {post.readTime}
                </span>
                <button className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a87c] hover:underline">
                  Read More
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>

    <FlowerFooter />
  </div>
);

export default BlogPage;
