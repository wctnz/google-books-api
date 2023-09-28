import React, { FC } from 'react';
import cl from "./Modal.module.css"
import { AiOutlineClose } from 'react-icons/ai';
import { IItem } from '../../models/models';

interface ModalProps {
    show: boolean
    item: IItem
    onClose: () => void
}
const Modal: FC<ModalProps> = ({ show, item, onClose }) => {
    if (!show) {
        return null
    }
    return (
        <div className={cl.overlay}>
            <div className={cl.overlayInner}>
                <button
                    onClick={onClose}
                    className={cl.close}
                ><AiOutlineClose /></button>
                <div className={cl.innerBox}>
                    <img src={item.volumeInfo.imageLinks?.smallThumbnail} alt='bookItem' />
                    <div className={cl.info}>
                        <h1>{item.volumeInfo.title}</h1>
                        <h3>{item.volumeInfo.publishedDate} г.</h3>
                        {item.volumeInfo.authors?.map(autor =>
                            <h3 key={autor}>{autor}</h3>
                        )}
                        <p>{item.volumeInfo.categories ? item.volumeInfo.categories.map(category=> 
                            <p>{ category }</p>
                            ) : ""}</p><br />
                        <a href={item.volumeInfo.previewLink}><button>More</button></a>
                    </div>
                </div>
                <p>{item.volumeInfo.description ? item.volumeInfo.description : "Описание отсутствует"}</p>
            </div>
        </div>
    );
};

export default Modal;

