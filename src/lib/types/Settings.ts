import { getParentOfType, types } from 'mobx-state-tree';
import { TagMap } from './Tag';
import { RootStore } from '.';

const Settings = types
  .model('Settings', {
    showUnverified: true,
    selectedDiningHallId: 'all',
    selectedTags: TagMap,
  })
  .actions((self) => ({
    toggleShowUnverified() {
      self.showUnverified = !self.showUnverified;
      console.log(self.showUnverified);
    },
    setSelectedDiningHallId(id: string) {
      self.selectedDiningHallId = id;
    },
    setSelectedTags(tagIds: string[]) {
      const tags: Record<string, { id: string; value: string }> = {};
      const parent = getParentOfType(self, RootStore);
      tagIds.forEach((id) => {
        tags[id] = parent.tags.tags.get(id)!;
      });
      self.selectedTags.init(Object.values(tags));
    },
  }));

export { Settings };
