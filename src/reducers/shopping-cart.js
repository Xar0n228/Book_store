let forTotal = 0;

const updateCartItems = (cartItems, item, idx) => {
  // Удаляем item, если у нас больше не осталось книг
  if (item.count === 0) {
    //__________________  УДАЛЯЕТ МАССИВ
    return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
  }

  if (idx === -1) {
    //__________________ ДОБАВЛЯЕТ К МАССИВУ
    return [
      // Возвращает весь cartItems и + новый элемент item
      ...cartItems,
      item
    ];
  }
  //__________________ ОБНОВЛЯЕТ МАССИВ
  return [...cartItems.slice(0, idx), item, ...cartItems.slice(idx + 1)];
};

const updateCartItem = (book, item = {}, quantity) => {
  //  quantity - передаём кол-во книг, которые мы хотим добавить. + 1 или - 1

  // Если item=undefined, то пусть будет пустым элементом
  // if (item) {
  //   return {
  //     // новый объект по типу книги
  //     ...item,
  //     count: item.count + 1,
  //     total: item.total + book.price
  //   };
  // } else {
  //   return {
  //     // новый объект по типу книги
  //     id: book.id,
  //     title: book.title,
  //     count: 1,
  //     total: book.price
  //   };
  // }

  // Если значений нет - даём им значения по умолчанию
  const { id = book.id, count = 0, title = book.title, total = 0 } = item;
  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity * book.price // может быть -1
  };
};

const updateOrder = (state, bookId, quantity) => {
  //const { books, cartItems } = state;
  const {
    bookList: { books },
    shoppingCart: { cartItems }
  } = state;

  const book = books.find(({ id }) => id === bookId);
  const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
  const item = cartItems[itemIndex];
  forTotal = forTotal + book.price * quantity;
  console.log(forTotal);
  const newItem = updateCartItem(book, item, quantity);

  // const for_add = books[itemIndex].total;
  // console.log(for_add);
  // forTotal = forTotal + item.data.price;

  return {
    // ...state,
    orderTotal: forTotal,
    cartItems: updateCartItems(cartItems, newItem, itemIndex)
  };
};

const updateShoppingCart = (state, action) => {
  if (state === undefined) {
    return {
      cartItems: [],
      orderTotal: 0
    };
  }
  switch (action.type) {
    case "BOOK_ADDED_TO_CART":
      return updateOrder(state, action.payload, 1);
    case "BOOK_REMOVED_FROM_CART":
      return updateOrder(state, action.payload, -1);
    case "ALL_BOOKS_REMOVED_FROM_CART":
      const item = state.shoppingCart.cartItems.find(
        ({ id }) => id === action.payload
      );
      return updateOrder(state, action.payload, -item.count); // Отнимаем текущее значение, чтобы было 0
    default:
      return state.shoppingCart; // Если не знаем тип действия, то возвращает state, что был до этого
  }
};

export default updateShoppingCart;
