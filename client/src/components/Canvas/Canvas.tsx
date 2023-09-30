import React, { useEffect, useRef, useState } from "react";
import "./canvas.css";
import { useDispatch } from "react-redux";
import { pushToUndo, setCanvas, setSocket, setUserId } from "../../store/actions/canvasActions";
import { actionTypes } from "../../store/types/types";
import { setTool } from "../../store/actions/toolActions";
import Brush from "../../tools/Brush";
import { Modal } from "../Modal/Modal";
import { InputInfoModal } from "../Modal/InputInfoModal/InputInfoModal";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IWSMassage } from "../../models/IWebSocket";
import Rect from "../../tools/Rect";
import axios from "axios";
import Circle from "../../tools/Circle";
import Line from "../../tools/Line";
import Eraser from "../../tools/Eraser";

export function Canvas() {
    const params = useParams();
    const canvasState = useTypedSelector(state => state.canvasReducer);
    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(true)

    useEffect(()=>{
        if(canvasState.username) {
            const socket = new WebSocket('ws://localhost:9001/');
            dispatch(setSocket(actionTypes.SET_SOCKET, socket));
            dispatch(setUserId(actionTypes.SET_SESSION_ID, params.id!));
            dispatch(setTool(actionTypes.SET_TOOL, new Brush(canvasRef.current!, socket, params.id!)));
            socket.onopen = () => {
                console.log('good connection with WS');
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: 'connection'
                }));
            };
            socket.onmessage = (e) => {
                let msg: IWSMassage = JSON.parse(e.data);
                switch (msg.method) {
                    case 'connection': {
                        console.log(`Пользователь ${msg.username} присоединился к сессии`)
                        break;
                    };

                    case 'draw': {
                        drawHandler(msg)
                        break;
                    };

                    default:
                        break;
                };
            };
        }
    }, [canvasState.username]);

    useEffect(()=>{
        dispatch(setCanvas(actionTypes.SET_CANVAS, canvasRef.current!));
        let context = canvasRef.current!.getContext('2d')
        axios.get(`http://localhost:9001/api/image?id=${params.id}`)
        .then((result) => {
            const img = new Image();
            img.src = result.data;
            img.onload = () => {
                context!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
                context!.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    // useEffect(()=>{
    //     dispatch(setCanvas(actionTypes.SET_CANVAS, canvasRef.current!));
    //     let context = canvasRef.current!.getContext('2d')
    //     axios.get(`http://localhost:9001/api/image?id=${params.id}`)
    //     .then((result) => {
    //         const img = new Image();
    //         img.src = result.data;
    //         img.onload = () => {
    //             context!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    //             context!.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
    //         }
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }, [canvasState.redoList, canvasState.undoList]);

    const drawHandler = (msg: IWSMassage) => {
        const figure = msg.figure;
        const context = canvasRef.current?.getContext('2d');
        switch (figure.type) {
            case 'brush': {
                if(context) {
                    Brush.draw(figure.x1!, figure.y1!, context, figure.color, figure.lineWidth)
                }
                break;
            };

            case 'eraser': {
                if(context) {
                    Eraser.draw(figure.x1!, figure.y1!, context, figure.color, figure.lineWidth)
                }
                break;
            };

            case 'rect': {
                if(context) {
                    Rect.staticDraw(figure.x1!, figure.y1!, figure.x2!, figure.y2!, context, figure.color, figure.lineWidth)
                }
                break;
            };

            case 'circle': {
                if(context) {
                    Circle.staticDraw(figure.x1!, figure.y1!, figure.r!, context, figure.color, figure.lineWidth)
                }
                break;
            };

            case 'line': {
                if(context) {
                    Line.staticDraw(figure.x1!, figure.y1!, figure.x2!, figure.y2!, context, figure.color, figure.lineWidth)
                }
                break;
            };

            case 'finish': {
                context?.beginPath();
                break;
            }
        
            default:
                break;
        };
    };

    const onMouseUpHandler = () => {
        if(canvasRef.current !== null) {
            setTimeout(()=> {
                if(canvasRef.current !== null) {
                    axios.post(`http://localhost:9001/api/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
                    .then((result) => {
                        console.log(result);
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }, 1)
        }
    };

    const onMouseDownHandler = () => {
        if(canvasRef.current !== null) {
            dispatch(pushToUndo(actionTypes.PUSH_TO_UNDO, canvasRef.current.toDataURL()));
        }
    };

    return (
        <>
            {modalVisible && 
                <Modal>
                    <InputInfoModal onClose={()=>setModalVisible(false)}/>
                </Modal>
            }
            <div className="canvas">
                <canvas onMouseUp={onMouseUpHandler} onMouseDown={onMouseDownHandler} ref={canvasRef} width='1000px' height='800px'></canvas>
            </div>
        </>
    );
};
