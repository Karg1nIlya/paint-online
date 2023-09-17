import React, { useState } from "react";
import "./inputInfoModal.css";
import { useDispatch } from "react-redux";
import { setUserName } from "../../../store/actions/canvasActions";
import { actionTypes } from "../../../store/types/types";

interface IInputInfoModal {
    onClose: ()=>void;
};

export function InputInfoModal({onClose}: IInputInfoModal) {
    const [inputValue, setInputValue] = useState('');
    const [goodInput, setGoodInput] = useState(false);
    const dispatch = useDispatch();

    const changeInputName = (e: React.FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        setInputValue(val);
        if(val.length > 3 && val.length < 30) {
            setGoodInput(true);
        } else {
            setGoodInput(false);
        }
    };

    const onEntry = () => {
        if(goodInput) {
            dispatch(setUserName(actionTypes.SET_USERNAME, inputValue));
            onClose();
        }
    };

    return (
        <div className="input-info-modal">
            <div className="input-info-modal__header">
                <div className="input-info-modal__title">Введите ваше имя</div>
            </div>
            <div className="input-info-modal__content">
                <input type="text" value={inputValue} onChange={changeInputName} placeholder="Введите ваше имя" className="input-info-modal__input"/>
            </div>
            <div className="input-info-modal__footer">
                <button className={`input-info-modal__entry-btn${goodInput ? '' : '--disabled'}`} onClick={onEntry}>Войти</button>
            </div>
        </div>
    );
};
