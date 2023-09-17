import { combineReducers } from "redux";
import { toolReducer } from "./toolReducer";
import { canvasReducer } from "./canvasReducer";

export const rootReducer = combineReducers({
    toolReducer: toolReducer,
    canvasReducer: canvasReducer
});

export type RootState = ReturnType<typeof rootReducer>;
