const sizes = {
  sm: "h-5 w-5 border-2",
  md: "h-9 w-9 border-[3px]",
  lg: "h-12 w-12 border-4",
};

const Loader = ({ size = "md", fullScreen = false, className = "" }) => {
  const spinner = (
    <div
      role="status"
      aria-label="Loading"
      className={`animate-spin rounded-full border-[#c9a87c]/25 border-t-[#c9a87c] ${sizes[size] ?? sizes.md}`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return (
    <div
      className={`flex w-full items-center justify-center py-16 ${className}`}
    >
      {spinner}
    </div>
  );
};

export default Loader;
