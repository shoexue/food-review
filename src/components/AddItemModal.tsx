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
import TagsCheckbox from './TagsCheckbox';
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
    .min(0, {
      message: 'Review must be at least 10 characters long.',
    })
    .max(160, {
      message: 'Review must not be longer than 160 characters.',
    })
    .default(""),
  title: z
    .string()
    .min(0, {
      message: 'Review title must be at least 1 character long',
    })
    .max(30, { message: 'Review title must not be longer than 30 characters' })
    .default(""),
  score: z
    .number()
    .min(1, { message: 'min is 1' })
    .max(10, { message: 'max is 10' })
    .default(0),
  diningHall: z.string(),
  tags: z.record(z.string().optional(), z.boolean().optional()),
  image: z
    .any()
    // .refine((files) => files?.length == 1, "Image is required.")
    // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
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
    //reset the tags
  };

  const onCancel = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // toast({
    //   title: 'Item Added!',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    const { tags: _tags, ...rest } = data;
    const tags = Object.entries(_tags)
      .filter(([id, checked]) => !!checked)
      .map(([id, checked]) => id);

    const _item = await makeItem({ ...rest, tags });
    const review = await makeReview({ ...data, itemId: _item.id });
    const item = await getItem(_item.id); // necessary because this will have the correct score

    store.addItem(item);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} modal>
      <Toaster />
      <DialogContent className='overflow-y-scroll max-w-sm md:max-w-2xl lg:max-w-4xl max-h-[36rem]'>
        <DialogHeader>
          <DialogTitle>Add a Food Item</DialogTitle>
          <DialogDescription>
            {
              "Add a food item that doesn't have any reviews yet. Click submit when you're done."
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
            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-3'>
              <DiningHallSelect />
              <TagsCheckbox />
            </div>
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
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <div className='w-fit'>
                    {/* <div className='absolute w-[6.5rem] h-10 bg-primary -z-10 rounded-l-md'></div> */}
                    <Input id="image" type="file" className='' />
                  </div>
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
