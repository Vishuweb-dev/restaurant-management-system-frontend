import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import Loader from "../../components/Loader";
import CategoryTag from "../../components/CategoryTag";

const MenuDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true); setError("");
      try { const res = await api.get(`/menu-items/${id}`); setItem(res.data.data.item); }
      catch (err) { setError(err.response?.data?.message || "We couldn't find that item."); }
      finally { setLoading(false); }
    };
    fetchItem();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="max-w-xl mx-auto px-5 py-24 text-center"><p className="font-display text-2xl text-ink">{error}</p><Link to="/" className="text-orange-600 text-sm font-semibold mt-4 inline-block">← Back to the menu</Link></div>;

  return (
    <section className="bg-[#fffdf9] min-h-[70vh] py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink/50 hover:text-orange-600 transition-colors">← Back to the menu</Link>
        <div className="mt-7 grid md:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="details-image-card"><img src={item.image} alt={item.name} /></div>
          <div className="py-2">
            <CategoryTag category={item.category} />
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mt-5 leading-tight">{item.name}</h1>
            <p className="text-ink/60 mt-5 leading-7 text-[15px]">{item.description}</p>
            <div className="h-px bg-ink/10 my-7" />
            <div className="flex items-center gap-4 flex-wrap"><span className="text-4xl font-display font-bold text-orange-600">${Number(item.price).toFixed(2)}</span><span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${item.availability ? "bg-green-50 text-green-700" : "bg-ink/10 text-ink/50"}`}>{item.availability ? "Available now" : "Currently unavailable"}</span></div>
            <div className="mt-8 rounded-2xl border border-orange-100 bg-orange-50/60 p-5 text-sm text-ink/60"><strong className="block text-ink mb-1">Made with care</strong>Every dish on TastyBites is presented fresh and ready for you to discover.</div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MenuDetails;
