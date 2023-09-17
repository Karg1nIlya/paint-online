import React, { useEffect } from "react"
import "./modal.css"

interface IModalProps {
    children: React.ReactNode;
}

export function Modal({children}: IModalProps) {
    useEffect(()=>{
        document.querySelector('body')!.style.overflow = 'hidden'
        return () => {
            document.querySelector('body')!.style.overflow = 'visible'
        }
    },[])
    
    return (
        <div className='modal'>
            <div className="modal__wrapper">
                <div className='modal__content' onClick={e=>{
                    e.stopPropagation()
                }}>
                    {children}
                </div>
            
            </div>
        </div>
    )
}
