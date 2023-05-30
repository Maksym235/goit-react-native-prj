import { configureStore, combineReducers } from "@reduxjs/toolkit";

// import { authSlice } from "./auth/authReducer";
import { authReducer } from "./auth/authReduser";
// console.log(authSlice)

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// import { configureStore } from "@reduxjs/toolkit";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { authReduser } from "./auth/authReduser";

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
// };

// const reducer = persistReducer(persistConfig, authReduser);

// const store = configureStore({
//   reducer: {
//     auth: authReduser,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// const persistor = persistStore(store);

// export default { store, persistor };
