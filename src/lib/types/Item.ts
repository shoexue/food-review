import { Instance, types } from 'mobx-state-tree';
import { ReviewArray } from './Review';
import { TagArray } from './Tag';
import { Item, Review as PrismaReview } from '@prisma/client';

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
    tags: TagArray,
  })
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
