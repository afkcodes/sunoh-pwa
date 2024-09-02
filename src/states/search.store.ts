import { create } from '~helper/store/createStore';

const {
  useStore: useSearchStore,
  set: setSearchStore,
  getStoreSnapshot: searchStoreSnapshot,
} = create('SEARCH', {
  key: 'all',
  query: '',
  categories: [],
});

export { searchStoreSnapshot, setSearchStore, useSearchStore };
