import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { IItem } from '@/lib/types/Item';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { HeaderContext } from '@tanstack/react-table';

interface HeaderCellProps {
  col: HeaderContext<IItem, unknown>;
  title: string;
}

const HeaderCell: React.FC<HeaderCellProps> = ({ col, title }) => {
  const handleCheckedChange = (checked: boolean) => {
    if (!checked) {
      col.column.clearSorting();
    } else {
      col.column.toggleSorting(false);
    }
  };

  const sorted = col.column.getIsSorted() !== false;
  const ascending = sorted && col.column.getIsSorted() === 'asc';

  return (
    <div className='flex items-center'>
      <span>{title}</span>
      <Popover>
        <PopoverTrigger className='ml-auto'>
          <EllipsisHorizontalIcon className='w-4' />
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <div className='border-black border-2 px-3 py-2 rounded-md'>
              <div className='flex items-center space-x-2'>
                <Label>Sort?</Label>
                <Checkbox
                  onCheckedChange={handleCheckedChange}
                  checked={sorted}
                />
              </div>
              <div
                className={`flex flex-col space-y-2 ${sorted ? '' : 'hidden'}`}
              >
                <div className='flex items-center space-x-2'>
                  <Label>Ascending</Label>
                  <Checkbox
                    checked={ascending}
                    onCheckedChange={() => col.column.toggleSorting(false)}
                  />
                </div>
                <div className='flex items-center space-x-2'>
                  <Label>Descending</Label>
                  <Checkbox
                    checked={!ascending}
                    onCheckedChange={() => col.column.toggleSorting(true)}
                  />
                </div>
              </div>
            </div>
            <div className='border-black border-2 px-3 py-2 rounded-md'>
              <Label>
                Filter:
                <Input
                  value={col.column.getFilterValue() as string}
                  onChange={(e) => col.column.setFilterValue(e.target.value)}
                />
              </Label>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HeaderCell;
