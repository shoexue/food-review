'use client';
import React, { useState } from 'react';
import MainNav from './MainNav';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { store } from '@/lib/types';
import { Button } from './ui/button';
import { PlusIcon } from '@heroicons/react/24/solid';
import AddItemModal from './AddItemModal';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from './ui/dialog';
import { useForm } from 'react-hook-form';
import DiningHallSelect from './DiningHallSelect';
import StarRating from './StarRating';
import TagsCheckbox from './TagsCheckbox';
import { DialogHeader, DialogFooter } from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from './ui/textarea';
import { Toaster } from './ui/toaster';
import { toast } from './ui/use-toast';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
  diningHall: z.string().optional(),
  tags: z.record(z.string().optional(), z.boolean().optional()),
});

type IFormData = z.infer<typeof FormSchema>;

interface SiteHeader {}

const SiteHeader: React.FC<SiteHeader> = ({}) => {
  const { items, settings, itemsInitialized } = store;
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const form = useForm<IFormData>({
    resolver: zodResolver(FormSchema),
  });

  const reset = () => {
    form.setValue('diningHall', '');
    //reset the tags
  };

  const onCancel = () => {
    reset();
    setFilterModalOpen(false);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    const { tags: _tags, ...rest } = data;
    const tags = Object.entries(_tags)
      .filter(([id, checked]) => !!checked)
      .map(([id, checked]) => id);

    setFilterModalOpen(false);
  };

  return (
    <header>
      <div className='flex flex-row w-screen max-w-5xl justify-between py-2 '>
        {/* <div className='flex flex-row items-center'> */}
        {/* <MainNav /> */}
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>
          {'McGill Food Reviews'}
        </h1>
        <div className='flex items-center space-x-3'>
          <Dialog open={filterModalOpen} modal>
            <Toaster />
            <DialogContent className='overflow-y-scroll max-w-[425px] max-w-sm md:max-w-l lg:max-w-xl max-h-[36rem]'>
              <DialogHeader>
                <DialogTitle>Filter Items</DialogTitle>
                <DialogDescription>
                  {
                    "Add some filters to narrow down the search to the item you're looking for."
                  }
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, (e) => {
                    console.log(e);
                  })}
                  className='space-y-4'
                >
                  <DiningHallSelect />
                  <TagsCheckbox />
                  {/* <FormField
                                        control={form.control}
                                        name='score'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Score</FormLabel>
                                                <StarRating />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                  <DialogFooter>
                    <div className='flex justify-between w-full'>
                      <Button onClick={() => onCancel()}>Cancel</Button>
                      <Button type='submit'>Apply</Button>
                    </div>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Button onClick={() => setFilterModalOpen(true)}>Filters</Button>
          <Button onClick={() => setAddItemModalOpen(true)}>
            <PlusIcon className='w-4 h-4 mr-2' /> Item
          </Button>
          <Switch
            id='airplane-mode'
            checked={settings.showUnverified}
            onCheckedChange={(e) => settings.toggleShowUnverified()}
          />
          <Label htmlFor='airplane-mode'>Show unverified</Label>
        </div>
        {/* </div> */}
        {/* <div className='w-96 relative '>
                    <Input />
                </div> */}
      </div>
      <AddItemModal
        open={addItemModalOpen}
        onClose={() => setAddItemModalOpen(false)}
      />
    </header>
  );
};

export default SiteHeader;
