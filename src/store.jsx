// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import { imcReducer } from './Imc'; 

const store = configureStore({
  reducer: {
    imc: imcReducer,
  },
});

export default store;
