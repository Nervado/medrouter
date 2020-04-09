import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'cv_reformas',
      storage,
      whitelist: ['auth', 'user', 'budgets'],
    },
    reducers,
  );
  return persistedReducer;
};
