import React, { useState } from "react";
import "./settingBar.css";
import { setLineWidth } from "../../store/actions/toolActions";
import { actionTypes } from "../../store/types/types";
import { useDispatch } from "react-redux";

export function SettingBar() {
    const [inputValue, setInputValue] = useState(1);
    const dispatch = useDispatch();

    const changeValue = (e: React.FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        
        if(val!=='' && (Number(val)>=1 && Number(val)<=50)) {
            setInputValue(Number(val));
            dispatch(setLineWidth(actionTypes.SET_LINE_WIDTH, Number(val)));
        }
    };

    return (
        <div className="setting-bar">
            <label htmlFor="line-width" className="setting-bar__label">Толщина линии</label>
            <input type="number" id="line-width" value={inputValue} onChange={changeValue} min={1} max={50}/>
        </div>
    );
};
