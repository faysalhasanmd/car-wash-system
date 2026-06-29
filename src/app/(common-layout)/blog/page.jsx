export const metadata = {
  title: "Blog | CarClean",
  description: "Read the latest blog posts and tips from CarClean.",
};

const blogs = [
  {
    id: 1,
    title: "5 Easy Ways to Keep Your Car Clean",
    date: "June 10, 2025",
    category: "Tips",
    excerpt:
      "Want to keep your car spotless all the time? These 5 simple tips will make car care much easier and more effective.",
  },
  {
    id: 2,
    title: "Why Professional Car Wash Matters",
    date: "May 25, 2025",
    category: "Guide",
    excerpt:
      "What's the difference between washing your car at home and a professional service? Find out which one is better for you.",
  },
  {
    id: 3,
    title: "Special Car Care During Rainy Season",
    date: "May 15, 2025",
    category: "Seasonal",
    excerpt:
      "Learn how to properly clean and protect the inside and outside of your car during the rainy season.",
  },
  {
    id: 4,
    title: "Best Car Cleaning Products of 2025",
    date: "April 30, 2025",
    category: "Reviews",
    excerpt:
      "We tested dozens of car cleaning products so you don't have to. Here are our top picks for every budget.",
  },
  {
    id: 5,
    title: "How Often Should You Wash Your Car?",
    date: "April 12, 2025",
    category: "Tips",
    excerpt:
      "Most people either wash too often or not enough. Here's the expert-recommended frequency based on your driving habits.",
  },
  {
    id: 6,
    title: "Interior Detailing: A Step-by-Step Guide",
    date: "March 28, 2025",
    category: "Guide",
    excerpt:
      "A clean exterior means nothing if the inside is a mess. Follow this complete interior detailing guide for a fresh cabin.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Hero */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full mb-3">
            Our Blog
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Tips, Guides & Stories
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl text-base">
            Read expert advice and the latest updates on keeping your car in
            perfect condition.
          </p>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group cursor-pointer"
            >
              <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full mb-3">
                {blog.category}
              </span>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                {blog.title}
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {blog.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {blog.date}
                </span>
                <button className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                  Read more →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
