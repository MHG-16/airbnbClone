"use client"

import React, { useCallback, useEffect, useState } from 'react';
import {IoMdClose } from "react-icons/io";
import Button from '../share/Button';


interface ModalProps {
    isOpen?: boolean
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body, 
    footer, 
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) 
        return null
    
    setShowModal(false);

    setTimeout( () => { onClose() }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled)
        return null
    
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback( () => {
    if(disabled || !secondaryAction) 
        return;
    
    secondaryAction();
  }, [disabled, secondaryAction]);

  if ( !isOpen)
    return null;
  return (
    <>
        <div className="justify-center items-center
        flex overflow-x-auto overflow-y-auto fixed
        inset-0 z-50 outline-none focus:outline-none
        bg-neutral-800/70">
            <div className="relative w-full md:w-2/3 lg:w-1/2 xl:w-2/5
            my-6 mx-auto h-full md:h-auto">
                <ContentModal 
                footer={footer}
                showModal={showModal} handleClose={handleClose} 
                title={title} handleSubmit={handleSubmit} body={body}
                disabled={disabled} actionLabel={actionLabel}
                />
            </div>
        </div>
    </>
  )
}

interface ContentModalProps {
    showModal?: boolean;
    handleClose: () => void;
    title?: string;
    body?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    handleSubmit: () => void;
    footer?: React.ReactElement;
}
const ContentModal: React.FC<ContentModalProps> = ({
    showModal,
    handleClose,
    title,
    body,
    actionLabel,
    handleSubmit,
    disabled,
    footer
}) => {
    return(
        <div className={`translate duration-300 h-full
        ${showModal ? 'translate-y-0' : 'translate-y-full'}
        ${showModal ? 'opacity-100' : 'opacity-0'}
        `}>
            <div className='translate h-full md:h-auto
            border-0 rounded-lg shadow-lg relative sm
            flex flex-col w-full bg-white outline-none
            focus:outline-none
            '>
                <HeaderModal handleClose={handleClose} title={title}/>
                <BodyModal body={body}/>
                <FooterModal actionLabel={actionLabel} disabled={disabled} 
                onClick={handleSubmit} footer={footer}/>
            </div>
        </div>
    )
}

interface HeaderModalProps {
    handleClose: () => void
    title?: string
}
const HeaderModal: React.FC<HeaderModalProps> = ({handleClose, title}) => {
    return (
        <div className="flex items-center p-6
        rounded-t justify-center relative border-b-[1px]">
            <button onClick={handleClose}
            className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                <IoMdClose size={18}/>
            </button>
            <div className='text-lg font-semibold'>
                {title}
            </div>
        </div>
    );
}


interface BodyModalProps {
    body?: React.ReactElement
}
const BodyModal: React.FC<BodyModalProps> = ({body}) => {
    return (
        <div className="relative p-6  flex-auto">
            {body}
        </div>
    )
}

interface FooterModalProps{
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    onClick: () => void;
    secondaryActionLabel?: string;
    handleSecondaryAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FooterModal: React.FC<FooterModalProps> = ({
    actionLabel,
    disabled,
    onClick,
    secondaryActionLabel,
    handleSecondaryAction,
    footer
}) => {
    return (
        <div className='flex flex-col gap-2 p-6'>
            <div className="flex flex-row items-center gap-4 w-full">
                {secondaryActionLabel && handleSecondaryAction && (
                    <Button outline disabled={disabled} 
                    label={secondaryActionLabel} onClick={handleSecondaryAction} /> 
                )}
                <Button label={actionLabel}  onClick={onClick} disabled={disabled}/>
            </div>
            {footer}
        </div>
    )
}
export default Modal
