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
  name: z
    .string()
    .min(1, {
      message: 'Item name must be at least 1 characters long.',
    })
    .max(100, {
      message: 'Item name must not be longer than 100 characters.',
    }),
  tags: z.optional(z.array(z.string())),
});

interface IAddItemButtonProps {
  itemId: string;
  onSuccess: VoidFunction;
  onFail: VoidFunction;
}

type IFormData = z.infer<typeof FormSchema>;

const AddItemButton: React.FC<IAddItemButtonProps> = ({
  onSuccess,
  onFail,
}) => {
  const makeItem = async (data: IFormData) => {
    console.log('make item');

    const bodyParams = new URLSearchParams({
      name: data.name,
    });

    data.tags?.forEach((t) => {
      bodyParams.append('tags', t);
    });

    try {
      const res = await fetch('/api/review/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyParams.toString(),
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
    makeItem(data);
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
              name='name'
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
            <DialogFooter>
              <Button type='submit'>Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemButton;
