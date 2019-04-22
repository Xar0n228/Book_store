const booksRequested = () => {
  return {
    //type: "BOOKS_REQUESTED"
    type: "FETCH_BOOKS_REQUEST"
  };
};
const booksLoaded = newBooks => {
  return {
    type: "FETCH_BOOKS_SUCCESS",
    payload: newBooks
  };
};
const booksError = error => {
  return {
    type: "FETCH_BOOKS_FAILURE",
    payload: error
  };
};

export const bookAddedToCart = bookId => {
  return {
    type: "BOOK_ADDED_TO_CART",
    payload: bookId
  };
};

export const bookRemovedFromCart = bookId => {
  return {
    type: "BOOK_REMOVED_FROM_CART",
    payload: bookId
  };
};

export const allBooksRemovedFromCart = bookId => {
  return {
    type: "ALL_BOOKS_REMOVED_FROM_CART",
    payload: bookId
  };
};

const fetchBooksOld = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService
    .getBooks()
    .then(data => dispatch(booksLoaded(data)))
    .catch(err => dispatch(booksError(err)));
  // получаем данные и записываем их в store
};
//export { booksLoaded, booksRequested, booksError, };

// Пробуем создать action-creator, который будет получать список книг. Для thunk Middleware
const fetchBooks = bookstoreService => id => dispatch => {
  // action-creator обёрнут в функцию, которая его возвращает
  dispatch(booksRequested());
  bookstoreService
    .getBooks()
    .then(data => dispatch(booksLoaded(data)))
    .catch(err => dispatch(booksError(err)));
  // получаем данные и записываем их в store
};
export { fetchBooksOld, fetchBooks };
