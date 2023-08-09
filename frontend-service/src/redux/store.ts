import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import userReducer from "./slices/userReducer";
import projectReducer from "./slices/projectReducer";
import taskReducer from "./slices/taskReducer";
import statsReducer from "./slices/statsReducer";


const persitConfig = {
    key: "root",
    storage
};

const rootReducer = combineReducers({
    userSlice: userReducer,
    taskSlice: taskReducer,
    projectSlice: projectReducer,
    statsSlice: statsReducer
});

const persistedReducer = persistReducer(persitConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);