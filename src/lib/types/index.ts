import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { Review, ReviewArray } from './Review';
import { Item } from './Item';
import { Tag, TagArray } from './Tag';
import { Item as PrismItem, Review as PrismaReview } from '@prisma/client';

const RootStore = types
  .model('Root Store', {
    items: types.array(Item),
    tags: types.map(Tag),
  })
  .actions((self) => ({
    ready() {
      return !!self.items.length;
    },
    setItems(items: PrismItem[], reviews: PrismaReview[][]) {
      const x = items
        .map((item, i) => {
          const { createdAt, updatedAt, ...rest } = item;

          const x = ReviewArray.create();
          x.init(reviews[i]);
          return {
            ...rest,
            reviews: x,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
            tags: TagArray.create(),
          };
        })
        .map((item) => Item.create(item));

      self.items.replace(x);
    },
    init(items: PrismItem[]) {
      console.log('initialize store with %o', items);
      const promises = items.map((item) => {
        const queryParams = new URLSearchParams({
          itemId: item.id,
        });

        const p: Promise<PrismaReview[]> = fetch(
          `/api/review/get?${queryParams}`,
          { method: 'GET' }
        ).then((res) => res.json());

        return p;
      });

      Promise.all(promises)
        .then((x) => {
          console.log('set items with ', items, x);
          this.setItems(items, x);
        })
        .finally(() => {
          console.log('done init');
        });
    },
    findItemBySlug(slug: string) {
      const i = self.items.find((i) => i.slug === slug);
      return i;
    },
    findItemById(id: string) {
      const i = self.items.find((i) => i.id === id);
      return i;
    },
    addItem(item: PrismItem, reviews: PrismaReview[]) {
      const { createdAt, updatedAt, ...rest } = item;

      const x = ReviewArray.create().init(reviews);

      const i = Item.create({
        ...rest,
        reviews: x,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        tags: TagArray.create(),
      });

      self.items.push(i);
    },
  }));

export type IStore = Instance<typeof RootStore>;
export type IStoreSnapshotIn = SnapshotIn<typeof RootStore>;
export type IStoreSnapshotOut = SnapshotOut<typeof RootStore>;

const store = RootStore.create({
  items: [],
  tags: {},
});
export { RootStore, Review, Item, Tag, store };
