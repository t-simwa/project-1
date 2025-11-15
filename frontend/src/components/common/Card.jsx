const Card = ({
  children,
  variant = 'default',
  className = '',
  hover = false,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-md p-6';
  
  const variants = {
    default: '',
    elevated: 'shadow-lg',
    outlined: 'border-2 border-gray-200 shadow-none',
  };

  const hoverClasses = hover ? 'transition-shadow hover:shadow-lg cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

