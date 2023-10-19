import { store } from '@/lib/types';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"




const MainNav = () => {
    const { diningHalls } = store;

    return (
        <div className='flex gap-x-1 h-10 m-2'>
            {/* {Array.from(diningHalls.halls.entries()).map(
                ([id, { name }]) => {
                    return (
                        // <Link href={''}>
                        <Button variant={'default'}>
                            {name}
                        </Button>
                        // </Link>
                    );
                }
            )} */}
            <Tabs defaultValue="all" className="">
                <TabsList className='bg-primary text-muted'>
                    <TabsTrigger value='all'>All</TabsTrigger>
                    {Array.from(diningHalls.halls.entries()).map(
                        ([id, { name }]) => {
                            return (
                                <TabsTrigger value={id}>{name}</TabsTrigger>
                            );
                        }
                    )}
                </TabsList>
                {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent> */}
            </Tabs>
        </div>
    )
}

export default MainNav