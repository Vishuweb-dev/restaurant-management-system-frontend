import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import AuthShell from "../../components/AuthShell";
import FormField, { inputClass } from "../../components/FormField";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      const { token, user } = res.data.data;
      login(token, user);
      navigate("/");
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Join TastyBites"
      title="Create your account"
      subtitle="Save time browsing and keep track of what you order."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-rust font-medium hover:underline">
            Log in
          </Link>
        </>
      }
    >
      {serverError && (
        <p className="bg-rust/10 text-rust-dark text-sm px-4 py-2.5 rounded-xl mb-5">
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Full name" error={errors.name}>
          <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
        </FormField>

        <FormField label="Email" error={errors.email}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        <FormField label="Password" error={errors.password}>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        <FormField label="Confirm password" error={errors.confirmPassword}>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-parchment py-3 rounded-full text-sm font-medium hover:bg-rust transition-colors disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
};

export default Register;
