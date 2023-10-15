'use client'

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
import { Input } from '@/components/ui/input';
import StarRating from '@/components/StarRating';
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
});

interface IAddItemButtonProps {
    onSuccess: VoidFunction;
    onFail: VoidFunction;
}

type IFormData = z.infer<typeof FormSchema>;

const AddItemButton: React.FC<IAddItemButtonProps> = ({
    onSuccess,
    onFail,
}) => {
    const addItem = async (data: IFormData) => {
        await fetch('/api/item/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                name: data.name,
            }),
        });
    }

    const makeReview = async (data: IFormData) => {
        console.log('make review');
        const reviewData = {
            score: data.score + '',
            comment: data.review,
            // item.id, //idk how to get the item id of the thing we just created 
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


    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                    <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
        addItem(data);
        makeReview(data);
    };

    const form = useForm<IFormData>({
        resolver: zodResolver(FormSchema),
    });


    return (
        <Dialog >
            <Toaster />
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className='w-4 h-4 mr-2' /> Item
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Add a Food Item</DialogTitle>
                    <DialogDescription>
                        {"Add a food item that doesn't have any reviews yet. Click submit when you're done."}
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
        </Dialog >

    );
};

export default AddItemButton;
