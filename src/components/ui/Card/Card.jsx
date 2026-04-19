const Card = ({ children, className = "" }) => {
  return <div className={`rounded-xl border bg-white shadow-sm ${className}`}>{children}</div>;
};

export default Card;
