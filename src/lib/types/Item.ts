import { Instance, types } from 'mobx-state-tree';
import { ReviewArray } from './Review';
import { Item, Review as PrismaReview } from '@prisma/client';
import { DiningHall } from './DiningHall';

const Item = types
  .model('Item', {
    id: '',
    slug: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '',
    rating: 0.0,
    imageUrl: '',
    reviews: ReviewArray,
    tags: types.array(types.string),
    diningHall: '',
  })
  .views((self) => ({
    hasAllTags(ids: string[]) {
      const isMissingTag = ids.some((id) => {
        const found = self.tags.findIndex((t) => t === id) !== -1;
        return !found;
      });
      return !isMissingTag;
    },
    hasSomeTags(ids: string[]) {
      const hasATag = ids.some((id) => {
        const found = self.tags.findIndex((t) => t === id) !== -1;
        return found;
      });
      return hasATag;
    },
  }))
  .actions((self) => ({
    addReview(review: PrismaReview) {
      const numReviews = self.reviews.reviews.length;
      self.rating =
        (self.rating * numReviews + review.rating) / (numReviews + 1);
      self.reviews.addReview(review);
    },
  }));

type IItem = Instance<typeof Item>;

export { Item };
export type { IItem };
