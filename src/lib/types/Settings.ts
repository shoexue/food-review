import { types } from 'mobx-state-tree';

const Settings = types
  .model('Settings', {
    showUnverified: true,
    selectedDiningHallId: 'all',
  })
  .actions((self) => ({
    toggleShowUnverified() {
      self.showUnverified = !self.showUnverified;
      console.log(self.showUnverified);
    },
    setSelectedDiningHallId(id: string) {
      self.selectedDiningHallId = id;
    },
  }));

export { Settings };
