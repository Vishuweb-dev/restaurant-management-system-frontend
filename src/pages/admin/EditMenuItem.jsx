import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import Loader from "../../components/Loader";
import FormField, { inputClass } from "../../components/FormField";

const CATEGORIES = ["Starter", "Main Course", "Dessert", "Beverage"];

const EditMenuItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    availability: "true",
  });
  const [currentImage, setCurrentImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/menu-items/${id}`);
        const item = res.data.data.item;
        setForm({
          name: item.name,
          description: item.description,
          category: item.category,
          price: item.price,
          availability: String(item.availability),
        });
        setCurrentImage(item.image);
      } catch (err) {
        setServerError(err.response?.data?.message || "Couldn't load that item.");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, image: "Only JPG, PNG or WEBP images are allowed." }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: "Image must be smaller than 5MB." }));
      return;
    }

    setErrors((prev) => ({ ...prev, image: undefined }));
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Item name is required.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!CATEGORIES.includes(form.category)) newErrors.category = "Select a valid category.";
    if (form.price === "" || Number(form.price) < 0) newErrors.price = "Enter a valid positive price.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("availability", form.availability);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    setSaving(true);
    try {
      await api.put(`/menu-items/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/menu-items");
    } catch (err) {
      setServerError(err.response?.data?.message || "Couldn't save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium text-rust mb-1">Editing</p>
      <h1 className="font-display text-3xl text-ink mb-8">Update menu item</h1>

      {serverError && (
        <p className="bg-rust/10 text-rust-dark text-sm px-4 py-2.5 rounded-xl mb-5">
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-ink/10 p-7 space-y-5">
        <FormField label="Item name" error={errors.name}>
          <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
        </FormField>

        <FormField label="Description" error={errors.description}>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className={inputClass}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-5">
          <FormField label="Category" error={errors.category}>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Price" error={errors.price}>
            <input
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={form.price}
              onChange={handleChange}
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField label="Availability">
          <select
            name="availability"
            value={form.availability}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="true">In stock</option>
            <option value="false">Out of stock</option>
          </select>
        </FormField>

        <FormField label="Item image" error={errors.image}>
          <p className="text-xs text-ink/40 mb-2">Leave empty to keep the current photo.</p>
          <img
            src={imagePreview || currentImage}
            alt="Current"
            className="h-28 w-28 object-cover rounded-xl border border-ink/10 mb-3"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
        </FormField>

        <button
          type="submit"
          disabled={saving}
          className="bg-ink text-parchment px-6 py-2.5 rounded-full text-sm font-medium hover:bg-rust transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
};

export default EditMenuItem;
