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
      setError(
        err.response?.data?.message ||
          "Couldn't load the menu right now."
      );
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

  const scrollToMenu = () => {
    document
      .getElementById("menu")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overflow-hidden">

      {/* HERO SECTION */}
      <section className="hero-section">

        <div className="hero-overlay" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 md:py-16 lg:py-20 relative z-10">

          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-center">

            {/* LEFT CONTENT */}
            <div className="hero-content animate-rise">

              <p className="hero-kicker">
                GOOD FOOD, HAPPY PEOPLE
              </p>

              <h1 className="hero-title">
                Delicious Food,
                <br />

                <span>
                  Delivered Fresh
                </span>
              </h1>

              <p className="hero-description">
                Explore a variety of mouth-watering dishes made with
                fresh ingredients and discover your favorite flavors.
              </p>

              <div className="hero-buttons">

                <button
                  onClick={scrollToMenu}
                  className="explore-button"
                >
                  Explore Menu
                  <span>→</span>
                </button>

                <a
                  href="#about"
                  className="story-button"
                >
                  <span className="play-icon">
                    ▶
                  </span>

                  Watch Our Story
                </a>

              </div>

              {/* FEATURES */}
              <div className="hero-features">

                <div className="hero-feature">

                  <div className="feature-icon">
                    🍃
                  </div>

                  <div>
                    <strong>
                      Fresh Ingredients
                    </strong>

                    <span>
                      Always fresh & healthy
                    </span>
                  </div>

                </div>


                <div className="hero-feature">

                  <div className="feature-icon">
                    🚚
                  </div>

                  <div>
                    <strong>
                      Fast Delivery
                    </strong>

                    <span>
                      Hot and on time
                    </span>
                  </div>

                </div>


                <div className="hero-feature">

                  <div className="feature-icon">
                    ♡
                  </div>

                  <div>
                    <strong>
                      Great Taste
                    </strong>

                    <span>
                      Loved by everyone
                    </span>
                  </div>

                </div>

              </div>

            </div>


            {/* RIGHT FOOD IMAGE */}
            <div
              className="hero-food-wrapper animate-rise"
              style={{ animationDelay: "120ms" }}
            >

              <div className="hero-food-image">

                <img
                  src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1600&q=90"
                  alt="Delicious restaurant food"
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* MENU SECTION */}
      <section
        id="menu"
        className="menu-section scroll-mt-24"
      >

        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          <div className="text-center max-w-2xl mx-auto">

            <p className="section-kicker">
              EXPLORE
            </p>

            <h2 className="section-title">
              Browse Our Menu
            </h2>

            <p className="section-description">
              Find your favorite food from our menu categories
            </p>

          </div>


          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="menu-search max-w-2xl mx-auto"
          >

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search your favorite dish..."
            />

            <button type="submit">
              Search
            </button>

          </form>


          {/* CATEGORY FILTER */}
          <div className="category-container">

            <button
              onClick={() =>
                handleCategoryClick("")
              }
              className={`category-filter ${
                activeCategory === ""
                  ? "active"
                  : ""
              }`}
            >
              All
            </button>


            {CATEGORIES.map((cat) => (

              <button
                key={cat}
                onClick={() =>
                  handleCategoryClick(cat)
                }
                className={`category-filter ${
                  activeCategory === cat
                    ? "active"
                    : ""
                }`}
              >
                {cat}
              </button>

            ))}

          </div>


          {/* MENU ITEMS */}
          <div className="mt-12">

            {loading && (
              <Loader />
            )}


            {!loading && error && (

              <div className="empty-state">

                <p>
                  {error}
                </p>

              </div>

            )}


            {!loading &&
              !error &&
              items.length === 0 && (

                <div className="empty-state">

                  <p className="font-display text-2xl text-ink/70">
                    No dishes found.
                  </p>

                  <span>
                    Try another search or category.
                  </span>

                </div>

              )}


            {!loading &&
              !error &&
              items.length > 0 && (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

                  {items.map((item, i) => (

                    <MenuCard
                      key={item._id}
                      item={item}
                      index={i}
                    />

                  ))}

                </div>

              )}

          </div>

        </div>

      </section>


      {/* ABOUT SECTION */}
      <section
        id="about"
        className="about-section scroll-mt-24"
      >

        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">

          <div className="about-photo-wrap">

            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85"
              alt="Restaurant dining experience"
            />

            <div className="about-card">

              <strong>
                Made Fresh
              </strong>

              <span>
                From our kitchen to your table
              </span>

            </div>

          </div>


          <div>

            <p className="section-kicker">
              WHY TASTYBITES
            </p>


            <h2 className="section-title text-left">

              A little restaurant experience
              in every bite.

            </h2>


            <p className="about-description">

              We combine comforting favorites,
              fresh ingredients, and a modern menu
              experience so discovering your next
              meal feels as good as eating it.

            </p>


            <div className="grid sm:grid-cols-3 gap-4 mt-8">

              {[
                ["🍃", "Fresh", "Quality ingredients"],
                ["👨‍🍳", "Crafted", "Made with care"],
                ["❤", "Loved", "Food for everyone"],
              ].map(([icon, title, text]) => (

                <div
                  key={title}
                  className="feature-mini"
                >

                  <span>
                    {icon}
                  </span>

                  <strong>
                    {title}
                  </strong>

                  <small>
                    {text}
                  </small>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="contact-banner scroll-mt-24"
      >

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 flex flex-col md:flex-row md:items-center justify-between gap-6">

          <div>

            <p className="contact-kicker">
              COME HUNGRY
            </p>

            <h2 className="contact-title">

              Your next favorite dish
              is waiting.

            </h2>

          </div>


          <button
            onClick={scrollToMenu}
            className="explore-button"
          >

            Explore the menu
            <span>→</span>

          </button>

        </div>

      </section>

    </div>
  );
};

export default Home;
