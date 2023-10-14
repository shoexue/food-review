import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface StarRatingProps {
  max?: number;
  onStarClick: (stars: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ max = 10, onStarClick }) => {
  const [stars, setStars] = useState(0);

  const onClick = (stars: number) => {
    setStars(stars);
    onStarClick(stars);
  };

  return (
    <div className='flex space-x-1 items-center'>
      {Array.from(Array(max)).map((v, i) => {
        return (
          <div key={i}>
            {stars > i ? (
              <StarIconSolid
                className={`w-6 h-6 cursor-pointer text-yellow-400`}
                onClick={(e) => onClick(i + 1)}
              />
            ) : (
              <StarIconOutline
                className={`w-6 h-6 cursor-pointer text-yellow-400`}
                onClick={(e) => onClick(i + 1)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
