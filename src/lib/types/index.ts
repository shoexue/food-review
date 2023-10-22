import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { Review, ReviewArray } from './Review';
import { Item } from './Item';
import { Tag, TagMap } from './Tag';
import { Settings } from './Settings';
import { DiningHallMap } from './DiningHall';
import { UseItemsItem } from '@/hooks/useItems';

const RootStore = types
  .model('Root Store', {
    itemsInitialized: false,
    items: types.array(Item),
    tags: TagMap,
    diningHalls: DiningHallMap,
    settings: Settings,
  })
  .actions((self) => ({
    setItemsInitialized() {
      self.itemsInitialized = true;
    },
    setItems(items: UseItemsItem[]) {
      const x = items
        .map((item, i) => {
          const { createdAt, updatedAt, diningHallId, reviews, tags, ...rest } =
            item;

          const ra = ReviewArray.create();
          ra.init(reviews);
          return {
            ...rest,
            reviews: ra,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
            tags: tags.map(({ tagId }) => tagId),
            diningHall: diningHallId,
          };
        })
        .map((item) => Item.create(item));

      self.items.replace(x);
    },
    init(items: UseItemsItem[]) {
      self.itemsInitialized = false;
      console.log('initialize store with %o', items);
      this.setItems(items);
      this.setItemsInitialized();
    },
    findItemBySlug(slug: string) {
      const i = self.items.find((i) => i.slug === slug);
      return i;
    },
    findItemById(id: string) {
      const i = self.items.find((i) => i.id === id);
      return i;
    },
    addItem(item: UseItemsItem) {
      const { createdAt, updatedAt, reviews, tags, ...rest } = item;

      const x = ReviewArray.create().init(reviews);

      const i = Item.create({
        ...rest,
        reviews: x,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        diningHall: item.diningHallId,
        tags: tags.map(({ tagId }) => tagId),
      });

      self.items.push(i);
    },
  }));

export type IStore = Instance<typeof RootStore>;
export type IStoreSnapshotIn = SnapshotIn<typeof RootStore>;
export type IStoreSnapshotOut = SnapshotOut<typeof RootStore>;

const store = RootStore.create({
  itemsInitialized: false,
  items: [],
  tags: {},
  diningHalls: {},
  settings: {
    showUnverified: true,
    selectedTags: {},
    selectedDiningHallId: 'all',
  },
});

export { RootStore, Review, Item, Tag, store };
