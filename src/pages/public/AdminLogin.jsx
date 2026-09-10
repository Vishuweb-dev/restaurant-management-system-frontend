import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import AuthShell from "../../components/AuthShell";
import FormField, { inputClass } from "../../components/FormField";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      const { token, user } = res.data.data;
      if (user.role !== "admin") {
        setError("This login is for admin accounts only.");
        return;
      }
      login(token, user);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell eyebrow="Kitchen access" title="Admin login" subtitle="For staff only.">
      {error && (
        <p className="bg-rust/10 text-rust-dark text-sm px-4 py-2.5 rounded-xl mb-5">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Email">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </FormField>

        <FormField label="Password">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </FormField>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-parchment py-3 rounded-full text-sm font-medium hover:bg-rust transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
    </AuthShell>
  );
};

export default AdminLogin;
