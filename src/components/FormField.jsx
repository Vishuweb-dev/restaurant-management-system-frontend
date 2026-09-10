const FormField = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-ink/70 mb-2">{label}</label>
    {children}
    {error && <p className="text-rust text-xs mt-1.5">{error}</p>}
  </div>
);

export const inputClass =
  "w-full bg-white border border-ink/15 rounded-2xl px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-colors";

export default FormField;
