import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

const Rating = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  showLabel = false,
  className = '',
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
  };

  const handleClick = (value) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    const isFilled = i <= Math.floor(rating);
    const isHalf = i - 0.5 <= rating && rating < i;

    stars.push(
      <span
        key={i}
        onClick={() => handleClick(i)}
        className={interactive ? 'cursor-pointer' : ''}
        role={interactive ? 'button' : undefined}
        aria-label={`${i} star${i > 1 ? 's' : ''}`}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={(e) => {
          if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleClick(i);
          }
        }}
      >
        {isFilled ? (
          <StarIcon className={`${sizes[size]} text-yellow-400`} />
        ) : isHalf ? (
          <div className="relative">
            <StarOutlineIcon className={`${sizes[size]} text-gray-300`} />
            <StarIcon
              className={`${sizes[size]} text-yellow-400 absolute inset-0 overflow-hidden`}
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
          </div>
        ) : (
          <StarOutlineIcon className={`${sizes[size]} text-gray-300`} />
        )}
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`} role="img" aria-label={`Rating: ${rating} out of ${maxRating}`}>
      <div className="flex">{stars}</div>
      {showLabel && (
        <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)} / {maxRating}
        </span>
      )}
    </div>
  );
};

export default Rating;

