import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";


const persitConfig = {
    key: "root",
    storage
};

const rootReducer = combineReducers({
    userSlice: userReducer,
    projectSlide: projectReducer,
    taskSlice: taskReducer,

});

const persistedReducer = persistReducer(persitConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);