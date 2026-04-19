const Button = ({ children, className = "", ...props }) => {
  return (
    <button className={`inline-flex items-center justify-center rounded-md px-4 py-2 ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
