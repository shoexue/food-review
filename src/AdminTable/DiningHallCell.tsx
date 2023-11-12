import { store } from '@/lib/types';

interface DiningHallCellProps {
  diningHall: string;
}

const DiningHallCell: React.FC<DiningHallCellProps> = ({ diningHall }) => {
  // console.log(tags);
  return (
    <div className='flex items-center font-mono'>
      <p>
        {diningHall} ({store.diningHalls.halls.get(diningHall)?.name})
      </p>
    </div>
  );
};

export default DiningHallCell;
