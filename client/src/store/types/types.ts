import Brush from "../../tools/Brush";
import Circle from "../../tools/Circle";
import Eraser from "../../tools/Eraser";
import Line from "../../tools/Line";
import Rect from "../../tools/Rect";

export enum actionTypes {
    SET_TOOL = 'SET_TOOL',
    SET_FILL_COLOR = 'SET_FILL_COLOR',
    SET_STROKE_COLOR = 'SET_STROKE_COLOR',
    SET_LINE_WIDTH = 'SET_LINE_WIDTH',

    SET_CANVAS = 'SET_CANVAS',
    PUSH_TO_UNDO = 'PUSH_TO_UNDO',
    PUSH_TO_REDO = 'PUSH_TO_REDO',
    UNDO = 'UNDO',
    REDO = 'REDO',
    SET_USERNAME = 'SET_USERNAME',
    SET_SOCKET = 'SET_SOCKET',
    SET_SESSION_ID = 'SET_SESSION_ID'
};

export interface IStateTool {
    tool: Brush | Rect | Circle | Line | Eraser | null;
};

export interface IStateCanvas {
    canvas: HTMLCanvasElement | null;
    undoList: string[];
    redoList: string[];
    username: string;
    socket: WebSocket | null;
    sessionId: string | null;
};

export interface IAction {
    type: string;
    payload?: any; 
};

export const initialStateTool: IStateTool = {
    tool: null
};

export const initialStateCanvas: IStateCanvas = {
    canvas: null,
    undoList: [],
    redoList: [],
    username: '',
    socket: null,
    sessionId: null
};
