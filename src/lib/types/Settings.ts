import { types } from 'mobx-state-tree';

const Settings = types
  .model('Settings', {
    showUnverified: true,
  })
  .actions((self) => ({
    toggleShowUnverified() {
      self.showUnverified = !self.showUnverified;
      console.log(self.showUnverified);
    },
  }));

export { Settings };
