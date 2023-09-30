import { IAction, actionTypes, initialStateCanvas } from "../types/types";

export const canvasReducer = (state = initialStateCanvas, action: IAction) => {
    switch(action.type) {

        case actionTypes.SET_CANVAS: {
            state.canvas = action.payload;
            return { ...state };
        };

        case actionTypes.PUSH_TO_UNDO: {
            state.undoList.push(action.payload);
            return { ...state };
        };

        case actionTypes.PUSH_TO_REDO: {
            state.redoList.push(action.payload)
            return { ...state };
        };

        case actionTypes.UNDO: {
            let context = state.canvas?.getContext('2d');
            if(state.undoList.length > 0) {
                let dataUrl = state.undoList.pop() as string;
                state.redoList.push(state.canvas!.toDataURL());
                let img = new Image();
                img.src = dataUrl;
                img.onload = () => {
                    if(state.canvas) {
                        context?.clearRect(0, 0, state.canvas?.width, state.canvas?.height);
                        context?.drawImage(img, 0, 0, state.canvas?.width, state.canvas?.height);
                        // console.log(state)
                    }
                };
            } else {
                if(state.canvas) {
                    context?.clearRect(0, 0, state.canvas?.width, state.canvas?.height);
                }
            }
            return { ...state };
        };

        case actionTypes.REDO: {
            let context = state.canvas?.getContext('2d');
            if(state.redoList.length > 0) {
                let dataUrl = state.redoList.pop() as string;
                state.undoList.push(state.canvas!.toDataURL());
                let img = new Image();
                img.src = dataUrl;
                img.onload = () => {
                    if(state.canvas) {
                        context?.clearRect(0, 0, state.canvas.width, state.canvas?.height);
                        context?.drawImage(img, 0, 0, state.canvas.width, state.canvas?.height);
                    }
                };
            }
            // console.log(state)
            return { ...state };
        };

        case actionTypes.SET_USERNAME: {
            state.username = action.payload;
            return { ...state };
        };

        case actionTypes.SET_SESSION_ID: {
            console.log(action.payload)
            state.sessionId = action.payload;
            return { ...state };
        };

        case actionTypes.SET_SOCKET: {
            state.socket = action.payload;
            return { ...state };
        };

        default: {
            return state;
        };
    };
};
