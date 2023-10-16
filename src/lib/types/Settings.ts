import { types } from 'mobx-state-tree';

const Settings = types
  .model('Settings', {
    showUnverified: true,
  })
  .actions((self) => ({
    toggleShowUnverified() {
      self.showUnverified = !self.showUnverified;
    },
  }));

export { Settings };
