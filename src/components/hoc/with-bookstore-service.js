import React from "react";
import { BookstoreServiceConsumer } from "../bookstore-service-context";

const withBookstoreService = () => Wrapped => {
  // КОМПОНЕНТ ВЫСШЕГО ПОРЯДКА для контекста Consumer
  return props => {
    return (
      // Возвращает кусочек JSX-разметки

      // Так получаем доступ к сервису
      <BookstoreServiceConsumer>
        {bookstoreService => {
          // РЭНДЕР-функция, которая принимает тот Servic, который мы передадим через Context
          return <Wrapped {...props} bookstoreService={bookstoreService} />;
        }}
      </BookstoreServiceConsumer>
    );
  };
};

export default withBookstoreService;
