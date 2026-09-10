// Color-codes each menu category so the menu reads like a real kitchen board,
// not a generic label chip.
const CATEGORY_STYLES = {
  Starter: "bg-sage/10 text-sage-dark",
  "Main Course": "bg-rust/10 text-rust-dark",
  Dessert: "bg-saffron/15 text-saffron-dark",
  Beverage: "bg-teal/10 text-teal-dark",
};

const CategoryTag = ({ category }) => {
  const style = CATEGORY_STYLES[category] || "bg-ink/10 text-ink";
  return <span className={`category-tag ${style}`}>{category}</span>;
};

export default CategoryTag;
