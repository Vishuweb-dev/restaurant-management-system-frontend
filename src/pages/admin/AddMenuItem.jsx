import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Loader from "../../components/Loader";
import ConfirmModal from "../../components/ConfirmModal";
import CategoryTag from "../../components/CategoryTag";

const MenuItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchItems = async (searchTerm = "") => {
    setLoading(true);

    try {
      const res = await api.get("/menu-items", {
        params: searchTerm ? { search: searchTerm } : {},
      });

      setItems(res.data.data.items);
    } catch (err) {
      setError(
        err.response?.data?.message || "Couldn't load menu items."
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
    fetchItems(search);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/menu-items/${deleteTarget._id}`);

      setItems((prev) =>
        prev.filter((i) => i._id !== deleteTarget._id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Couldn't delete that item."
      );
    } finally {
      setDeleteTarget(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-medium text-rust mb-1">
            Kitchen inventory
          </p>

          <h1 className="font-display text-3xl text-ink">
            Menu board
          </h1>
        </div>

        <Link
          to="/admin/menu-items/add"
          className="bg-rust text-parchment px-5 py-2.5 rounded-full text-sm font-medium hover:bg-rust-dark transition-colors"
        >
          + Add item
        </Link>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="max-w-sm mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name…"
          className="w-full bg-white border border-ink/15 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rust/40"
        />
      </form>

      {/* Error */}
      {error && (
        <p className="bg-rust/10 text-rust-dark text-sm px-4 py-2.5 rounded-xl mb-5">
          {error}
        </p>
      )}

      {/* Menu Table */}
      <div className="bg-white rounded-2xl border border-ink/10 overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="text-left text-ink/40 border-b border-ink/10">
            <tr>
              <th className="px-6 py-4 font-medium"></th>

              <th className="px-6 py-4 font-medium">
                Name
              </th>

              <th className="px-6 py-4 font-medium">
                Category
              </th>

              <th className="px-6 py-4 font-medium">
                Price
              </th>

              <th className="px-6 py-4 font-medium">
                Status
              </th>

              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-ink/5">
            {items.map((item) => (
              <tr key={item._id}>
                {/* Image */}
                <td className="px-6 py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-11 w-11 rounded-lg object-cover"
                  />
                </td>

                {/* Name */}
                <td className="px-6 py-3 text-ink font-medium">
                  {item.name}
                </td>

                {/* Category */}
                <td className="px-6 py-3">
                  <CategoryTag category={item.category} />
                </td>

                {/* Price in INR */}
                <td className="px-6 py-3 text-ink/70">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </td>

                {/* Availability */}
                <td className="px-6 py-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      item.availability
                        ? "bg-sage/10 text-sage-dark"
                        : "bg-ink/8 text-ink/50"
                    }`}
                  >
                    {item.availability
                      ? "In stock"
                      : "Out of stock"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-3 text-right space-x-4 whitespace-nowrap">
                  <Link
                    to={`/admin/menu-items/edit/${item._id}`}
                    className="text-sm font-medium text-ink/60 hover:text-ink"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="text-sm font-medium text-rust hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {items.length === 0 && (
          <p className="text-center text-ink/40 py-12">
            No menu items match that search.
          </p>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete menu item"
        message={`"${deleteTarget?.name}" will be removed from the board for good.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default MenuItems;