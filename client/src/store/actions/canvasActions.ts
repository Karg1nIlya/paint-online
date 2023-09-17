export const setCanvas = (type: string, canvas: HTMLCanvasElement) => {
    return {
        type,
        payload: canvas
    };  
};

export const pushToUndo = (type: string, data: string) => {
    return {
        type,
        payload: data
    };  
};

export const pushToRedo = (type: string, data: string) => {
    return {
        type,
        payload: data
    };  
};

export const undo = (type: string) => {
    return {
        type
    };
};

export const redo = (type: string) => {
    return {
        type
    };
};

export const setUserName = (type: string, username: string) => {
    return {
        type,
        payload: username
    };
};

export const setSocket = (type: string, socket: WebSocket) => {
    return {
        type,
        payload: socket
    };
};

export const setUserId = (type: string, userId: string) => {
    return {
        type,
        payload: userId
    };
};
