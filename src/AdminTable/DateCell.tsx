import { formatDate } from '@/lib/utils';

interface DateCellProps {
  date: Date;
}

const DateCell: React.FC<DateCellProps> = ({ date }) => {
  return <div>{`${date.toISOString()} (${formatDate(date)})`}</div>;
};

export default DateCell;
