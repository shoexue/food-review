"use client" //Form needs use client

import { PlusIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { toast } from "@/components/ui/use-toast"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Toaster } from '@/components/ui/toaster';
// import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  review: z
    .string()
    .min(10, {
      message: "Review must be at least 10 characters long.",
    })
    .max(160, {
      message: "Review must not be longer than 30 characters.",
    }),
})


interface IReviewButtonProps {
  itemId: string;
  onSuccess: VoidFunction;
  onFail: VoidFunction;
}

const ReviewButton: React.FC<IReviewButtonProps> = ({
  itemId,
  onSuccess,
  onFail,
}) => {
  const makeReview = async () => {
    const reviewData = {
      score: 7 + '', // int out of ten
      comment: 'test',
      itemId,
    };
    try {
      const res = await fetch('/api/create-review', {
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Dialog>
      <Toaster />
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            makeReview();
          }}
        >
          <PlusIcon className="w-4 h-4 mr-2" /> Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Review</DialogTitle>
          <DialogDescription>
            Add a review of the dish. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What did you think of this dish?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent >
    </Dialog >

  );
};

export default ReviewButton;
