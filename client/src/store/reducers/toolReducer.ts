import { IAction, actionTypes, initialStateTool } from "../types/types"

export const toolReducer = (state = initialStateTool, action: IAction) => {
    switch(action.type) {

        case actionTypes.SET_TOOL: {
            state.tool = action.payload
            return { ...state }
        };

        case actionTypes.SET_FILL_COLOR: {
            if(state.tool) {
                state.tool.fillColor = action.payload
            }
            return { ...state }
        };

        case actionTypes.SET_STROKE_COLOR: {
            if(state.tool) {
                state.tool.strokeColor = action.payload
            }
            return { ...state }
        };

        case actionTypes.SET_LINE_WIDTH: {
            console.log(action.payload)
            if(state.tool) {
                state.tool.lineWidth = action.payload
            }
            return { ...state }
        };

        default: {
            return state;
        }
    }
}
