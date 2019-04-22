const updateBookList = (state, action) => {
  // Проверяем тип действия
  if (state === undefined) {
    // Возвращает первоначальный state от BookList
    return {
      books: [],
      loading: true,
      error: null
    };
  }

  switch (action.type) {
    case "FETCH_BOOKS_REQUEST":
      return {
        books: [],
        loading: true,
        error: null
      };
    case "FETCH_BOOKS_SUCCESS":
      return {
        books: action.payload,
        loading: false,
        error: null
      };
    case "FETCH_BOOKS_FAILURE":
      return {
        books: [],
        loading: false,
        error: action.payload // Чтобы узнать детали ошибки
      };
    default:
      return state.bookList; // Если не знаем тип действия, то возвращает state, что был до этого
  }
};

export default updateBookList;
