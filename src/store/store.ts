// store.ts

import { createStore } from 'redux';
import rootReducer from './reducers.ts'; // Adjust the path as needed

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Create and export the store
const store = createStore(rootReducer);

export { store };
