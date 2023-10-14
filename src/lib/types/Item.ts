import { Instance, types } from 'mobx-state-tree';
import { ReviewArray } from './Review';
import { TagArray } from './Tag';
import { Item as PrismaItem, Review as PrismaReview } from '@prisma/client';

const Item = types
  .model('Item', {
    id: '',
    slug: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    totalReviews: 0,
    name: '',
    rating: 0.0,
    imageUrl: '',
    reviews: ReviewArray,
    tags: TagArray,
  })
  .actions((self) => ({
    addReview(review: PrismaReview) {
      self.totalReviews++;
      self.reviews.addReview(review);
    },
  }));

type IItem = Instance<typeof Item>;

export { Item };
export type { IItem };
