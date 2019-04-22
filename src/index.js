import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/app";
import ErrorBoundry from "./components/error-boundry";
import BookstoreService from "./services/bookstore-service";
import { BookstoreServiceProvider } from "./components/bookstore-service-context";

import store from "./store";

const bookstoreService = new BookstoreService();

ReactDOM.render(
  // Такова структура приложения
  <Provider
    store={store} // предоставляет доступ к Redux Store
  >
    <ErrorBoundry // Обработка ошибок в компонентах ниже по иерархии
    >
      <BookstoreServiceProvider
        value={bookstoreService} // Передаёт сервис через ContextAPI
      >
        <Router // Router из пакета react-router
        >
          <App // Само приложение
          />
        </Router>
      </BookstoreServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
