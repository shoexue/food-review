import { Instance, types } from 'mobx-state-tree';
import { Tag as PrismaTag, TagOnItem as TOI } from '@prisma/client';

const Tag = types.model('Tag', {
  id: '',
  value: '',
});

const TagMap = types
  .model('Tag Map', {
    tags: types.map(Tag),
  })
  .views((self) => ({
    toRecord() {
      const record: Record<string, boolean> = {};
      Array.from(self.tags.values()).forEach(({ id, value }) => {
        record[id] = true;
      });
      return record;
    },
    toIdArray() {
      return Array.from(self.tags.values()).map(({ id }) => id);
    },
  }))
  .actions((self) => ({
    init(tags: PrismaTag[]) {
      tags.forEach(({ id, value }) => {
        self.tags.set(id, { id, value });
      });
    },
  }));

type ITag = Instance<typeof Tag>;
export { Tag, TagMap };
export { type ITag };
