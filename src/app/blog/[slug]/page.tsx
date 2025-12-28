import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ================= BLOG DATA ================= */

type Blog = {
  type: "image" | "text";
  slug: string;
  category: string;
  title: string;
  image?: string;
  author?: string;
  date?: string;
  content?: string;
};

const BLOGS: Blog[] = [
  {
    type: "image",
    slug: "hayya-vision",
    category: "HAYYA",
    title: "Hayya — A New Way to Discover Life Around You",
    image: "/movies/timeless.jpg",
    author: "Hayya Editorial",
    date: "March 10, 2025",
    content: `
      <p>Hayya is a discovery platform designed for people who value experiences.</p>
      <p>From movies and live events to cafés and weekend plans.</p>
      <p>Hayya exists to reduce noise and increase meaning.</p>
    `,
  },
  {
    type: "text",
    slug: "about-hayya",
    category: "ABOUT",
    title: "What is Hayya?",
    author: "Hayya Team",
    date: "March 12, 2025",
    content: `
      <p>Hayya is not just another listings app.</p>
      <p>No clutter. No noise. Just meaningful recommendations.</p>
    `,
  },
  {
    type: "image",
    slug: "kantara-impact",
    category: "MOVIES",
    title: "Why Kantara Became a Cultural Moment",
    image: "/movies/kantara.jpg",
    author: "Cinema Desk",
    date: "March 15, 2025",
    content: `<p>Kantara wasn’t just a film — it was a cultural movement.</p>`,
  },
];

/* ================= STATIC PARAMS ================= */

export function generateStaticParams() {
  return BLOGS.map((blog) => ({ slug: blog.slug }));
}

/* ================= PAGE ================= */

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = BLOGS.find((b) => b.slug === slug);
  if (!blog) notFound();

  return (
    <>
      <Header />

      <main className="bg-white">
        {/* BACK LINK */}
        <div className="max-w-6xl mx-auto px-6 pt-10">
          <Link
            href="/blog"
            className="text-sm text-gray-500 hover:text-black transition"
          >
            ← Back to Journal
          </Link>
        </div>

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-14 items-center">
            {/* LEFT */}
            <div>
              <span className="inline-block mb-4 rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold tracking-wide text-gray-600">
                {blog.category}
              </span>

              <h1 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                {blog.title}
              </h1>

              <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  {blog.author}
                </span>
                <span>•</span>
                <span>{blog.date}</span>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            {blog.image && (
              <div className="relative h-[420px] w-full overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </section>

        {/* CONTENT */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* ARTICLE */}
            <article className="lg:col-span-8">
              <div
                className="
                  prose prose-lg max-w-none
                  prose-p:leading-[1.9]
                  prose-p:text-gray-700
                  prose-h2:text-2xl
                  prose-h2:font-semibold
                  prose-h2:mt-12
                  prose-h2:mb-4
                "
                dangerouslySetInnerHTML={{ __html: blog.content ?? "" }}
              />
            </article>

            {/* SIDEBAR */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <h3 className="text-lg font-semibold border-b pb-3">
                  Editor&apos;s Pick
                </h3>

                {BLOGS.filter((b) => b.slug !== blog.slug).map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="block rounded-xl border p-4 transition hover:bg-gray-50"
                  >
                    <p className="text-sm font-semibold text-gray-900 leading-snug">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.date}
                    </p>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
