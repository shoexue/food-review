'use client'; //Form needs use client

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
import { Input } from './ui/input';
import StarRating from './StarRating';
import { store } from '@/lib/types';
import { makeReview } from '@/lib/review/make-review';
// import { toast } from "@/components/ui/use-toast"

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchema = z.object({
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
  image: z
    // .instanceof(File)
    .any()
    // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .optional(),
});

interface IReviewButtonProps {
  itemId: string;
  open: boolean;
  onClose: VoidFunction;
}

type IFormData = z.infer<typeof FormSchema>;

const ReviewModal: React.FC<IReviewButtonProps> = ({
  itemId,
  open,
  onClose,
}) => {
  const form = useForm<IFormData>({
    resolver: zodResolver(FormSchema),
  });

  const reset = () => {
    form.setValue('score', 0);
    form.setValue('review', '');
    form.setValue('title', '');
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    makeReview({ ...data, itemId })
      .then((review) => {
        const item = store.findItemById(itemId);
        if (item) {
          item.addReview(review);
        }
      })
      .then(() => {
        reset();
        onClose();
      });
  };

  const onCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open}>
      <Toaster />
      <DialogContent className='overflow-y-scroll max-w-sm md:max-w-l lg:max-w-xl max-h-[36rem]'>
        <DialogHeader>
          <DialogTitle>Add a Review</DialogTitle>
          <DialogDescription>
            {"Add a review of the dish. Click submit when you're done."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                  <FormLabel>Review</FormLabel>
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
                  <Input id="image" type="file" className='' accept=".png,.jpeg,.jpg" {...field} />
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

export default ReviewModal;
