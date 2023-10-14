import { types } from 'mobx-state-tree';
import { string } from 'zod';

const Tag = types.model('Tag', {
  id: '',
  value: '',
});

const TagArray = types
  .model('TagArray', {
    tags: types.array(Tag),
  })
  .actions((self) => ({
    get() {
      return self.tags;
    },
  }));

export { Tag, TagArray };
