const Button = ({ onClick, children, variant = "primary", type = "button", disabled = false }) => {
  const variantClasses = {
    primary: "btn-primary",
    error: "btn-error",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
  };

  const variantClass = variantClasses[variant] || "btn-primary";

  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        type={type}
        className={`btn ${variantClass}`}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
