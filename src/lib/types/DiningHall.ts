import { Instance, types } from 'mobx-state-tree';
import { DiningHall as PrismaDiningHall } from '@prisma/client';

const DiningHall = types.model({
  name: '',
  id: '',
});

const DiningHallMap = types
  .model('Tag Map', {
    halls: types.map(DiningHall),
  })
  .actions((self) => ({
    init(diningHalls: PrismaDiningHall[]) {
      diningHalls.forEach(({ id, name }) => {
        self.halls.set(id, { id, name });
      });
    },
  }));

export { DiningHallMap, DiningHallMap as TagMap };

type IDiningHall = Instance<typeof DiningHall>;

export { DiningHall };
export { type IDiningHall };
