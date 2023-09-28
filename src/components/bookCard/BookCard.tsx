import React, { useState } from 'react';
import { IItem } from '../../models/models';
import Modal from '../modal/Modal';
import cl from "./BookCard.module.css"

const BookCard = ({ item }: { item: IItem }) => {
  const [show, setShow] = useState<boolean>(false)
  const [bookItem, setBookItem] = useState<IItem>()

  const handleModalClick = () => {
    setShow(true)
    setBookItem(item)
  }

  return (
    <>
      <div
        onClick={handleModalClick}
        className={cl.main}
        key={item.id}>
        <div>
          <h3>{item.volumeInfo.title}, {item.volumeInfo.publishedDate + " г."}</h3>
          <ul>
            {item.volumeInfo.authors?.map(autor =>
              <li key={autor}>{autor}</li>
            )}
          </ul>
          <div className={cl.category}>{item.volumeInfo.categories ? item.volumeInfo.categories[0] : ""}</div>
        </div>
        <div>
          <img src={item.volumeInfo.imageLinks?.smallThumbnail} alt="bookImage" />
        </div>
      </div>
      <Modal show={show} item={item} onClose={() => setShow(false)} />
    </>
  );
};


export default BookCard;