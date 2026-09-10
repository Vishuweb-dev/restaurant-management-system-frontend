const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <div className="h-9 w-9 border-[3px] border-ink/15 border-t-rust rounded-full animate-spin" />
      <p className="text-sm text-ink/40">Plating things up…</p>
    </div>
  );
};

export default Loader;
