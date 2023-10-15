import { StarIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface IStarMeterProps {
  stars: number;
}

const StarMeter: React.FC<IStarMeterProps> = ({ stars }) => {
  // max width (10 stars = ~160px) -> each star is ~16px
  // kinda jank but works :)
  return (
    <div
      className='overflow-hidden whitespace-nowrap'
      style={{ width: `${stars * 16}px` }}
    >
      {Array.from(Array(10)).map((v, i) => {
        return <StarIcon key={v} className='w-4 inline' />;
      })}
    </div>
  );
};

export default StarMeter;
