import { useEffect, useState } from "react";
import api from "../../api/axios";
import MenuCard from "../../components/MenuCard";
import Loader from "../../components/Loader";

const CATEGORIES = ["Starter", "Main Course", "Dessert", "Beverage"];

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const fetchItems = async (searchTerm = "", category = "") => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (category) params.category = category;
      const res = await api.get("/menu-items", { params });
      setItems(res.data.data.items);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load the menu right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchItems(search, activeCategory);
  };

  const handleCategoryClick = (cat) => {
    const next = activeCategory === cat ? "" : cat;
    setActiveCategory(next);
    fetchItems(search, next);
  };

  const scrollToMenu = () => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="overflow-hidden">
      <section className="hero-section relative border-b border-white/5">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 md:py-16 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-center">
            <div className="animate-rise">
              <p className="hero-kicker"><span>✦</span> Good Food, Happy People</p>
              <h1 className="hero-title mt-4">
                Delicious Food,<br />
                <span>Delivered Fresh</span>
              </h1>
              <p className="mt-6 max-w-xl text-[15px] sm:text-lg leading-7 text-white/65">
                Explore a variety of mouth-watering dishes made with fresh ingredients and discover your favorite flavors.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <button onClick={scrollToMenu} className="btn-primary hero-cta">Explore Menu <span>→</span></button>
                <a href="#about" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white transition-colors">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5">▶</span>
                  Our story
                </a>
              </div>

              <div className="flex flex-wrap gap-7 mt-10 text-white/75">
                <div><strong className="block text-xl text-white">20+</strong><span className="text-xs text-white/45">Signature dishes</span></div>
                <div><strong className="block text-xl text-white">4.8★</strong><span className="text-xs text-white/45">Happy food lovers</span></div>
                <div><strong className="block text-xl text-white">100%</strong><span className="text-xs text-white/45">Fresh ingredients</span></div>
              </div>
            </div>

            <div className="relative animate-rise" style={{ animationDelay: "120ms" }}>
              <div className="hero-image-card">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=90"
                  alt="Fresh gourmet burger"
                  className="w-full h-[320px] sm:h-[420px] lg:h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
              <div className="floating-review hidden sm:flex">
                <span className="text-xl">★</span>
                <div><strong>Fresh & tasty</strong><small>Made with love every day</small></div>
              </div>
              <div className="floating-badge">Chef&apos;s <br /><strong>Special</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="scroll-mt-24 bg-[#fffdf9] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="section-kicker">OUR KITCHEN</p>
            <h2 className="section-title">Browse Our Menu</h2>
            <p className="mt-3 text-ink/55">Find your favorite food from our delicious restaurant menu.</p>
          </div>

          <form onSubmit={handleSearch} className="menu-search max-w-2xl mx-auto mt-8">
            <span className="text-ink/35">⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your favorite dish..."
            />
            <button type="submit">Search</button>
          </form>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <button onClick={() => handleCategoryClick("")} className={`category-filter ${activeCategory === "" ? "active" : ""}`}>All</button>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => handleCategoryClick(cat)} className={`category-filter ${activeCategory === cat ? "active" : ""}`}>{cat}</button>
            ))}
          </div>

          <div className="mt-12">
            {loading && <Loader />}
            {!loading && error && <div className="empty-state"><p>{error}</p></div>}
            {!loading && !error && items.length === 0 && (
              <div className="empty-state"><p className="font-display text-2xl text-ink/70">No dishes found.</p><span>Try another search or category.</span></div>
            )}
            {!loading && !error && items.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {items.map((item, i) => <MenuCard key={item._id} item={item} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 bg-[#f7f3ed] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="about-photo-wrap">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85" alt="Restaurant dining experience" />
            <div className="about-card"><strong>Made fresh</strong><span>From our kitchen to your table</span></div>
          </div>
          <div>
            <p className="section-kicker">WHY TASTYBITES</p>
            <h2 className="section-title text-left">A little restaurant experience in every bite.</h2>
            <p className="mt-5 text-ink/60 leading-7">We combine comforting favorites, fresh ingredients, and a modern menu experience so discovering your next meal feels as good as eating it.</p>
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              {[["🍃", "Fresh", "Quality ingredients"], ["👨‍🍳", "Crafted", "Made with care"], ["❤", "Loved", "Food for everyone"]].map(([icon, title, text]) => (
                <div key={title} className="feature-mini"><span>{icon}</span><strong>{title}</strong><small>{text}</small></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 contact-banner">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div><p className="section-kicker text-orange-300">COME HUNGRY</p><h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">Your next favorite dish is waiting.</h2></div>
          <button onClick={scrollToMenu} className="btn-primary hero-cta shrink-0">Explore the menu <span>→</span></button>
        </div>
      </section>
    </div>
  );
};

export default Home;
