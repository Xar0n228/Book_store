// ОДНА ФУНКЦИЯ    для списка книг
// ДРУГАЯ ФУНКЦИЯ  для списка заказов

// const initialState = {
//   // Основной state
//   books: [], // именно это и передаём в BookList
//   loading: true, // Свойство для индикатора загрузки(спиннера)
//   error: null,
//   cartItems: [],
//   orderTotal: 220
// };
import updateBookList from "./book-list";
import updateShoppingCart from "./shopping-cart";
const initialState = {
  bookList: {
    books: [], // именно это и передаём в BookList
    loading: true, // Свойство для индикатора загрузки(спиннера)
    error: null
  },
  shoppingCart: {
    cartItems: [],
    orderTotal: 0
  }
};

//______________________ ВЫНОСИМ ОБНОВЛЕНИЕ МАССИВА В НОВУЮ ФУНКЦИЮ

const reducer = (state, action) => {
  //const reducer = (state = initialState, action) => {
  // 1 - текущий state. 2 - действие, которое мы пытаемся выполнить
  // switch (action.type) {
  //   case "FETCH_BOOKS_REQUEST":
  //     return {
  //       ...state, // Деструктуризация объектов и затем обновляем там 3 поля
  //       books: [],
  //       loading: true,
  //       error: null
  //     };
  //   case "FETCH_BOOKS_SUCCESS":
  //     return {
  //       ...state,
  //       books: action.payload,
  //       loading: false,
  //       error: null
  //     };
  //   case "FETCH_BOOKS_FAILURE":
  //     return {
  //       ...state,
  //       books: [],
  //       loading: false,
  //       error: action.payload // Чтобы узнать детали ошибки
  //     };

  // Переносим всю эту функцию в отдельную
  // case "BOOK_ADDED_TO_CART":

  //   const bookId = action.payload; // получаем из action.payload
  //   const book = state.books.find(book => book.id === bookId);
  //   // по id ищем книгу в state.books
  //   // const newItem = {
  //   //   // новый объект по типу книги
  //   //   id: book.id,
  //   //   title: book.title,
  //   //   count: 1,
  //   //   total: book.price
  //   // };
  //   // return {
  //   //   // передаём новый элемент в массив cartItems: [],
  //   //   ...state,
  //   //   cartItems: [
  //   //     //возвращаем новый state, у которого будут все старые элементы + newItem
  //   //     ...state.cartItems,
  //   //     newItem
  //   //   ]
  //   // };

  //   const itemIndex = state.cartItems.findIndex(({ id }) => id === bookId);
  //   const item = state.cartItems[itemIndex]; // Если не существует, присвоит undefined

  //   /// Это место, где мы создаём новый элемент, может быть отдельной функцией

  //   // let newItem; // чтобы можно было изменять
  //   // if (item) {
  //   //   newItem = {
  //   //     // новый объект по типу книги
  //   //     ...item,
  //   //     count: item.count + 1,
  //   //     total: item.total + book.price
  //   //   };
  //   // } else {
  //   //   newItem = {
  //   //     // новый объект по типу книги
  //   //     id: book.id,
  //   //     title: book.title,
  //   //     count: 1,
  //   //     total: book.price
  //   //   };
  //   // }

  //   // Сначала мы должны проверить, есть ли уже такой элемент в нашем списке
  //   // Когда есть новый элемент, стоит обновить массив

  //   // if (itemIndex < 0) {
  //   //   return {
  //   //     // передаём новый элемент в массив cartItems: [],
  //   //     ...state,
  //   //     cartItems: [
  //   //       //возвращаем новый state, у которого будут все старые элементы + newItem
  //   //       ...state.cartItems,
  //   //       newItem
  //   //     ]
  //   //   };
  //   // } else {
  //   //   // Здесь обновляем массив
  //   //   // Разбиваем массив на части по индексу
  //   //   return {
  //   //     ...state,
  //   //     cartItems: [
  //   //       ...state.cartItems.slice(0, itemIndex), // до индекса
  //   //       newItem, // Здесь вставляем новый элемент
  //   //       ...state.cartItems.slice(itemIndex + 1) // после индекса
  //   //     ]

  //   //   };
  //   // }

  //   const newItem = updateCartItem(book, item);
  //   return {
  //     ...state,
  //     cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
  //   };
  //   case "BOOK_ADDED_TO_CART":
  //     return updateOrder(state, action.payload, 1);
  //   case "BOOK_REMOVED_FROM_CART":
  //     return updateOrder(state, action.payload, -1);

  //   case "ALL_BOOKS_REMOVED_FROM_CART":
  //     const item = state.cartItems.find(({ id }) => id === action.payload);
  //     return updateOrder(state, action.payload, -item.count); // Отнимаем текущее значение, чтобы было 0
  //   default:
  //     return state;
  // }

  //return state; // Возвращает новый state

  return {
    bookList: updateBookList(state, action),
    shoppingCart: updateShoppingCart(state, action)
  };
};

export default reducer;
