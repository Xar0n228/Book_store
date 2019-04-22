import React, { Component } from "react";
import BookListItem from "../book-list-item";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ErrorIndicator from "../error-indicator";
import { withBookstoreService } from "../hoc"; //BookstoreServiceConsumer
//import { booksLoaded, booksRequested, booksError } from "../../actions";
import { fetchBooks, bookAddedToCart, fetchBooksOld } from "../../actions";
import { compose } from "../../utils"; // утилита для более удобной композиции КОМПОНЕНТОВ ВЫСШЕГО ПОРЯДКА
import Spinner from "../spinner";

import "./book-list.css";

const BookList = ({ books, onAddedToCart }) => {
  // Только для оботражения списка книг. Инкапсуляция
  return (
    <ul className="book-list">
      {books.map(book => {
        // Для каждой книги вызываем данную функцию-стрелку
        return (
          <li key={book.id}>
            <BookListItem
              book={book}
              onAddedToCart={() => onAddedToCart(book.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

// Этот компонент будет запрашивать данные как только он загружается
class BookListContainer extends Component {
  // ТИпа как оборачивает компонент BookList. Связь компонента с реакт-сторе
  // BookList не может напрямую получить данные из Redux.store
  // НО BookList может передать в Redux.store действие-action  и тогда наш reducer обновит данные

  // componentDidMount() {
  //   // Вызывается при создании.
  //   // Как только загружается BookList, он получает данные из сервиса и dispatch-ит новое событие
  //   // и передаёт данные в store

  //   // 1. получить данные. Нужно вызвать метод из сервиса. А сервис мы получаем из контекста при помощи
  //   // компонентов высшего порядка withBookstoreService. Оборачиваем им export
  //   const {
  //     bookstoreService,
  //     booksLoaded,
  //     booksRequested,
  //     booksError
  //   } = this.props; //BookstoreServiceConsumer
  //   //const data = bookstoreService.getBooks();
  //   booksRequested();
  //   bookstoreService
  //     .getBooks()
  //     .then(data => booksLoaded(data))
  //     .catch(err => booksError(err));
  //   // получаем данные и записываем их в store

  //   // 2. передать(dispatch) действие в store
  //   // Пытаемся вызвать свойство-функцию booksLoaded из mapDispatchToProps из connect-обёртки export-а
  //   //this.props.booksLoaded(data);
  // }

  //
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <ErrorIndicator />;
    }
    // return (
    //   <ul className="book-list">
    //     {books.map(book => {
    //       // Для каждой книги вызываем данную функцию-стрелку
    //       return (
    //         <li key={book.id}>
    //           <BookListItem book={book} />
    //         </li>
    //       );
    //     })}
    //   </ul>
    // );
    return <BookList books={books} onAddedToCart={onAddedToCart} />;
  }
}

const mapStateToProps = ({ bookList: { books, loading, error } }) => {
  // Деструктурируем значения из state, который определили в reducer
  // Возвращает объект, где ключи - названия свойств, которые мы присвоим нашему компоненту,
  // а значения - значения из state, которые мы присвоим
  return {
    books,
    loading,
    error
  };
};

//____________________________ ОДНАКО можно использовать action-creators
const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  // Обычная форма, которая принимает dispatch
  // и возвращает объект, где ключи - свойства, которые мы будем присваивать нашему компоненту
  // а значения - функции, которые мы будем вызывать
  // return {
  //   booksLoaded: newBooks => {
  //     // Функция, которая будет принимать newBooks и dispatch-ить action-действие с типом:'BOOKS_LOADED'
  //     //__________ Слишком сложно, мы можем просто импортировать action-функцию и вызвать её
  //     // dispatch({
  //     //   type: "BOOKS_LOADED",
  //     //   payload: newBooks
  //     // });

  //     //__________ Вызываем импортированную action-функцию
  //     dispatch(booksLoaded(newBooks));
  //   }
  // };
  //_________________ НО ТАК_ЖЕ можно использовать функцию binActionCreators
  // return bindActionCreators(
  //   {
  //     // Созданная таким образом обёртка делает так, что как только мы вызываем функцию booksLoaded,
  //     // она автоматически будет создавать новое действие и передавать его в dispatch
  //     // 1-ый агумент:  объект с action-creator-ами, которые будут нам нужны
  //     // 2-ой аргумент:  dispatch
  //     booksLoaded,
  //     booksRequested,
  //     booksError
  //   },
  //   dispatch
  // );
  //const { bookstoreService } = ownProps;

  // return {
  //   // Здесь вся логика обработки ирз контекста
  //   // fetchBooks: () => {
  //   //   console.log("buck");
  //   //   dispatch(booksRequested());
  //   //   bookstoreService
  //   //     .getBooks()
  //   //     .then(data => dispatch(booksLoaded(data)))
  //   //     .catch(err => dispatch(booksError(err)));
  //   //   // получаем данные и записываем их в store
  //   // }
  //   fetchBooks: fetchBooks(bookstoreService, dispatch),
  //   onAddedToCart: id => dispatch(bookAddedToCart(id))
  // };

  //_______________ Здесь обновляем через ThunkMiddleware
  return bindActionCreators(
    {
      fetchBooks: fetchBooks(bookstoreService),
      onAddedToCart: bookAddedToCart
    },
    dispatch
  );
  // 1-ый аргумент - список action-creator-ов
  // 2-ой аргумент - функция dispatch
};

// export default withBookstoreService()(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(BookList)
// );
// 1 - конфигурация ДАННЫХ, которые мы будем получать из Redux.store
// 2 - конфигурация, которые
// Оборачивается двумя КОМПОНЕНТАМИ ВЫСШЕГО ПОРЯДКА. Сначала connect, затем withBookstoreService

//_____________ С помощью утилиты compose облегчаем функциональную композицию элементов высшего порядка
export default compose(
  withBookstoreService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
  //)(BookList);
)(BookListContainer);
