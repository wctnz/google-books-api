import React, { FC } from 'react';
import { IItem, ServerResponse } from '../../models/models';
import BookCard from '../bookCard/BookCard';
import cl from "./BookList.module.css"

interface BookListProps {
  localLoading: boolean
  isLoading: boolean
  data: ServerResponse<IItem> | undefined
  selected: IItem[] | null
  firstQuery: boolean
}

const BookList: FC<BookListProps> = ({ localLoading, isLoading, data, selected, firstQuery }) => {
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {localLoading && !firstQuery && <p>Loading...</p>}
      {!firstQuery &&  selected?.length === 0 && !localLoading && !isLoading ?
        <p>Книги не найдены</p>
        : selected?.map(book =>
          <BookCard key={book.etag} item={book} />
        )
      }
    </div>
  );
};

export default BookList;