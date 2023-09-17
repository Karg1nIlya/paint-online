import React from "react";
import "./toolBar.css"
import { useDispatch } from "react-redux";
import { setFillColor, setStrokeColor, setTool } from "../../store/actions/toolActions";
import { actionTypes } from "../../store/types/types";
import Brush from "../../tools/Brush";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Rect from "../../tools/Rect";
import Circle from "../../tools/Circle";
import Eraser from "../../tools/Eraser";
import Line from "../../tools/Line";
import { redo, undo } from "../../store/actions/canvasActions";

export function ToolBar() {
    const dispatch = useDispatch();
    const canvasState = useTypedSelector(state => state.canvasReducer);

    const download = () => {
        const dataUrl = canvasState.canvas?.toDataURL();
        const link = document.createElement('a');
        link.href = dataUrl!;
        link.download = canvasState.sessionId + '.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const changeColor = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(setStrokeColor(actionTypes.SET_STROKE_COLOR, e.currentTarget.value));
        dispatch(setFillColor(actionTypes.SET_FILL_COLOR, e.currentTarget.value));
    };

    return (
        <div className="tool-bar">
            <button className="tool-bar__btn brush" onClick={() => dispatch(setTool(actionTypes.SET_TOOL, new Brush(canvasState.canvas!, canvasState.socket!, canvasState.sessionId!)))}></button>
            <button className="tool-bar__btn rect" onClick={() => dispatch(setTool(actionTypes.SET_TOOL, new Rect(canvasState.canvas!, canvasState.socket!, canvasState.sessionId!)))}></button>
            <button className="tool-bar__btn circle" onClick={() => dispatch(setTool(actionTypes.SET_TOOL, new Circle(canvasState.canvas!, canvasState.socket!, canvasState.sessionId!)))}></button>
            <button className="tool-bar__btn eraser" onClick={() => dispatch(setTool(actionTypes.SET_TOOL, new Eraser(canvasState.canvas!, canvasState.socket!, canvasState.sessionId!)))}></button>
            <button className="tool-bar__btn line" onClick={() => dispatch(setTool(actionTypes.SET_TOOL, new Line(canvasState.canvas!, canvasState.socket!, canvasState.sessionId!)))}></button>
            <input type="color" className="tool-bar__colors" onChange={changeColor}></input>
            <button className="tool-bar__btn undo" onClick={() => dispatch(undo(actionTypes.UNDO))}></button>
            <button className="tool-bar__btn redo" onClick={() => dispatch(redo(actionTypes.REDO))}></button>
            <button className="tool-bar__btn save" onClick={download}></button>
        </div>
    );
};
