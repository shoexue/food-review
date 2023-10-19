import { store } from '@/lib/types';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MainNav = () => {
  const { diningHalls, settings } = store;
  console.log(settings.selectedDiningHallId);

  return (
    <div className='flex gap-x-1 h-10 m-2'>
      <Tabs defaultValue='all' className=''>
        <TabsList className='bg-primary text-muted'>
          <TabsTrigger
            value='all'
            onClick={() => settings.setSelectedDiningHallId('all')}
          >
            All
          </TabsTrigger>
          {Array.from(diningHalls.halls.entries()).map(([id, { name }]) => {
            return (
              <TabsTrigger
                value={id}
                key={id}
                onClick={() => {
                  settings.setSelectedDiningHallId(id);
                }}
              >
                {name}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MainNav;
