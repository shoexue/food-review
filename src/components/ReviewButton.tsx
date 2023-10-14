'use client'; //Form needs use client

import { PlusIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { toast } from '@/components/ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Toaster } from '@/components/ui/toaster';
import { Input } from './ui/input';
import StarRating from './StarRating';
// import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
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
});

interface IReviewButtonProps {
  itemId: string;
  onSuccess: VoidFunction;
  onFail: VoidFunction;
}

type IFormData = z.infer<typeof FormSchema>;

const ReviewButton: React.FC<IReviewButtonProps> = ({
  itemId,
  onSuccess,
  onFail,
}) => {
  const makeReview = async (data: IFormData) => {
    console.log('make review');
    const reviewData = {
      score: data.score + '',
      comment: data.review,
      itemId,
      title: data.title,
    };

    try {
      const res = await fetch('/api/review/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(reviewData).toString(),
      });
      console.log(res);
      onSuccess();
    } catch (e) {
      onFail();
    }
  };

  const form = useForm<IFormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    makeReview(data);
  };

  return (
    <Dialog>
      <Toaster />
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className='w-4 h-4 mr-2' /> Review
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
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
                  <FormLabel>Title</FormLabel>
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
                  <StarRating
                    onStarClick={(stars) => {
                      form.setValue('score', stars);
                    }}
                  ></StarRating>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit'>Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewButton;
