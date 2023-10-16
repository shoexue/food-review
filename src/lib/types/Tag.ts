import { types } from 'mobx-state-tree';
import { Tag as PrismaTag } from '@prisma/client';

const Tag = types.model('Tag', {
  id: '',
  value: '',
});

const TagArray = types.model('TagArray', {
  tags: types.array(Tag),
});

const TagMap = types
  .model('Tag Map', {
    tags: types.map(Tag),
  })
  .actions((self) => ({
    init(tags: PrismaTag[]) {
      tags.forEach(({ id, value }) => {
        self.tags.set(id, { id, value });
      });
    },
  }));

export { Tag, TagMap, TagArray };
