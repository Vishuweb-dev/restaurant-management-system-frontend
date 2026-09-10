const AuthShell = ({ eyebrow, title, subtitle, children, footer }) => {
  return (
    <div className="auth-page">
      <div className="auth-visual hidden lg:block">
        <div className="auth-visual-content"><p>Fresh flavors. <span>Warm moments.</span></p><small>TastyBites — Good Food, Happy People</small></div>
      </div>
      <div className="auth-form-side">
        <div className="auth-card animate-rise">
          <p className="text-xs font-bold tracking-[0.16em] text-orange-600 uppercase mb-3">{eyebrow}</p>
          <h1 className="font-display text-4xl font-bold text-ink">{title}</h1>
          {subtitle && <p className="text-ink/55 text-sm mt-3 leading-6">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-ink/50">{footer}</div>}
        </div>
      </div>
    </div>
  );
};
export default AuthShell;
