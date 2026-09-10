import { Link } from "react-router-dom";
import CategoryTag from "./CategoryTag";

const MenuCard = ({ item, index = 0 }) => {
  return (
    <Link
      to={`/menu/${item._id}`}
      className="menu-card group animate-rise"
      style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
    >
      <div className="relative h-52 overflow-hidden bg-ink/5">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
        {!item.availability && <span className="absolute top-4 left-4 text-xs font-semibold bg-ink/85 text-white px-3 py-1.5 rounded-full">Out of stock</span>}
        <span className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-orange-500 shadow-lg transition-transform group-hover:rotate-12">↗</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold leading-snug text-ink group-hover:text-orange-600 transition-colors">{item.name}</h3>
          <span className="price-pill">${Number(item.price).toFixed(2)}</span>
        </div>
        <p className="text-sm text-ink/55 mt-2 leading-6 line-clamp-2 min-h-[48px]">{item.description}</p>
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-ink/[0.07]">
          <CategoryTag category={item.category} />
          <span className="text-xs font-semibold text-ink/45 group-hover:text-orange-600 transition-colors">View dish →</span>
        </div>
      </div>
    </Link>
  );
};

export default MenuCard;
