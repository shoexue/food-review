import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface StarRatingProps {
  max?: number;
}

interface FormContext {
  score: number;
}

const StarRating: React.FC<StarRatingProps> = ({ max = 10 }) => {
  const formContext = useFormContext<FormContext>();

  const onClick = (stars: number) => {
    formContext.setValue('score', stars);
  };

  const rating = formContext.watch().score;

  useEffect(() => { }, [rating]);

  return (
    <div className='flex space-x-1 items-center'>
      {Array.from(Array(max)).map((v, i) => {
        return (
          <div key={i}>
            {rating > i ? (
              <StarIconSolid
                className={`w-6 h-6 cursor-pointer text-secondary`}
                onClick={(e) => onClick(i + 1)}
              />
            ) : (
              <StarIconOutline
                className={`w-6 h-6 cursor-pointer text-secondary`}
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
