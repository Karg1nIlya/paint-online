import Brush from "../../tools/Brush";
import Circle from "../../tools/Circle";
import Eraser from "../../tools/Eraser";
import Line from "../../tools/Line";
import Rect from "../../tools/Rect";

export const setTool = (type: string, tool: Brush | Rect | Circle | Line | Eraser) => {
    return {
        type,
        payload: tool
    };  
};

export const setFillColor = (type: string, color: string) => {
    return {
        type,
        payload: color
    }; 
};

export const setStrokeColor = (type: string, color: string) => {
    return {
        type,
        payload: color
    }; 
};

export const setLineWidth = (type: string, width: number) => {
    return {
        type,
        payload: width
    };  
};
