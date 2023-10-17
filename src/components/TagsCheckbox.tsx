import { store } from '@/lib/types';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface IFormData {
  tags: Record<string, boolean>;
}

interface ITagsCheckboxProps {}

const TagsCheckbox: React.FC<ITagsCheckboxProps> = () => {
  const form = useFormContext<IFormData>();
  const { tags } = store;

  return (
    <div>
      <FormLabel>What tags are associated with this item?</FormLabel>
      <div className='space-y-1.5 flex flex-col mt-2'>
        {Array.from(tags.tags.entries()).map(([id, { value }], i) => {
          return (
            <>
              <FormField
                key={i}
                control={form.control}
                name={`tags.${id}`}
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center space-x-2'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        ></Checkbox>
                      </FormControl>
                      <FormLabel>{value}</FormLabel>
                    </div>
                  </FormItem>
                )}
              ></FormField>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default TagsCheckbox;
