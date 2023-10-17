'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Toaster } from '@/components/ui/toaster';
import { Input } from '@/components/ui/input';
import StarRating from '@/components/StarRating';
import { store } from '@/lib/types';
import { makeItem } from '@/lib/review/make-item';
import { makeReview } from '@/lib/review/make-review';
import { getItem } from '@/lib/review/get-item';
import DiningHallSelect from './DiningHallSelect';
// import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Dish name must be at least 2 characters long.',
    })
    .max(20, {
      message: 'Dish name must not be longer than 20 characters.',
    }),
  review: z
    .string()
    .min(10, {
      message: 'Review must be at least 10 characters long.',
    })
    .max(160, {
      message: 'Review must not be longer than 160 characters.',
    }),
  title: z
    .string()
    .min(1, {
      message: 'Review title must be at least 1 character long',
    })
    .max(30, { message: 'Review title must not be longer than 30 characters' }),
  score: z
    .number()
    .min(0, { message: 'min is 0' })
    .max(10, { message: 'max is 10' }),
  diningHall: z.string(),
});

type IFormData = z.infer<typeof FormSchema>;

interface IAddItemModal {
  open: boolean;
  onClose: VoidFunction;
}

const AddItemModal: React.FC<IAddItemModal> = ({ open, onClose }) => {
  const form = useForm<IFormData>({
    resolver: zodResolver(FormSchema),
  });

  const reset = () => {
    form.setValue('score', 0);
    form.setValue('name', '');
    form.setValue('review', '');
    form.setValue('title', '');
    form.setValue('diningHall', '');
  };

  const onCancel = () => {
    reset();
    onClose();
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

    const _item = await makeItem(data);
    const review = await makeReview({ ...data, itemId: _item.id });
    const item = await getItem(_item.id); // necessary because this will have the correct score

    store.addItem(item, [review]);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} modal>
      <Toaster />
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add a Food Item</DialogTitle>
          <DialogDescription>
            {
              "Add a food item that doesn't have any reviews yet. Click submit when you're done."
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='The dishes name'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DiningHallSelect />

            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your review title'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='review'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='What did you think of this dish?'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='score'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Score</FormLabel>
                  <StarRating />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <div className='flex justify-between w-full'>
                <Button onClick={() => onCancel()}>Cancel</Button>
                <Button type='submit'>Submit</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemModal;
