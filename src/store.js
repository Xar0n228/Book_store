import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import reducer from "./reducers";
//__________________ МЕХАНИЗМЫ РАСШИРЕНИЯ БАЗОВОЙ ФУНКЦИОНАЛЬНОСТИ

// // 1: Store Enhancers - функции, позволяющие изменять то, как работает весь объект store
// const stringEnhancer = createStore => (...args) => {
// // Контролирует создание store. Поэтому есть доступ к store
//   const store = createStore(...args);
//   const originalDispatch = store.dispatch; // Здесь будет сохранена оригинальная функция
//   store.dispatch = action => {
//     if (typeof action === "string") {
//       // Если тип действия - строка
//       return originalDispatch({
//         // Создаём объект обёртку и передаём этот объект в оригинальную функцию
//         type: action
//       });
//     }
//     return originalDispatch(action); // Никак не вмешиваемся
//   };
//   return store;
// };
// const logEnhancer = createStore => (...args) => {
//   const store = createStore(...args);
//   const originalDispatch = store.dispatch; // Здесь будет сохранена оригинальная функция
//   store.dispatch = action => {
//     console.log(action.type);
//     return originalDispatch(action); // Никак не вмешиваемся
//   };
//   return store;
// };

//const store = createStore(reducer, stringEnhancer);
//const store = createStore(reducer, logEnhancer);
// const store = createStore(
//   reducer,
//   compose(
//     stringEnhancer,
//     logEnhancer
//   )
// );
// Встроенный compose для функциональной композиции функций.
// Сначала stringEnhancer, а затем logEnhancer

// 2: Redux Middleware - функции, позволяющие изменять то, как работает dispatch
// const logMiddleware = store => dispatch => action => {
//   // Нет дефолтного доступа к store
//   console.log(action.type, store.getState()); // Если нужен доступ к state на момент исполнения
//   return dispatch(action);
// };
//  _____   dispatch = next
//  _____   store = {getState, dispatch }
const logMiddleware = ({ getState, dispatch }) => next => action => {
  // next - передача контроля в следующую функцию Middleware
  // Доступ в store возможен только к этим функциям: {getState, dispatch}
  // Нет дефолтного доступа к store
  //console.log(action.type, getState()); // Если нужен доступ к state на момент исполнения
  return next(action);
};
const stringMiddleware = store => next => action => {
  if (typeof action === "string") {
    // Если тип действия - строка
    return next({
      // Создаём объект обёртку и передаём этот объект в оригинальную функцию
      type: action
    });
  }
  return next(action);
};

// const store = createStore(
//   reducer,
//   applyMiddleware(stringMiddleware, logMiddleware)
// );

// const store = createStore(reducer);

//store.dispatch("HELLO_WORLD"); // Передаём необычный объект. Не работает
// Можно изменить поведение в методе dispatch

///____________ MONKEY PATCHING
// Замена одного из методов Api на собственную реализацию этого метода
// const originalDispatch = store.dispatch; // Здесь будет сохранена оригинальная функция
// store.dispatch = action => {
//   if (typeof action === "string") {
//     // Если тип действия - строка
//     return originalDispatch({
//       // Создаём объект обёртку и передаём этот объект в оригинальную функцию
//       type: action
//     });
//   }
//   return originalDispatch(action); // Никак не вмешиваемся
// };

//_______________ СЮДА ДОБАВЛЯЕМ thunkMiddleware
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware)
);

const myAction = dispatch => {
  // Вызывается через 2000 ms автоматически после создания store
  // Позволяет описывать асинхронные процессы в виде action-ов
  setTimeout(
    () =>
      dispatch({
        type: "DELAYED_ACTION"
      }),
    2000
  );
};

// Если для thunk функция - это action, то actionCreator - это функция, которая создаёт action-функцию
// Создаём action-creator для thunk
const delayedActionCreator = timeout => dispatch => {
  // Принимает параметры, Создаёт действие
  setTimeout(
    () =>
      dispatch({
        type: "DELAYED_ACTION"
      }),
    timeout
  );
};

//store.dispatch(myAction)
store.dispatch(delayedActionCreator(3000)); // timeout = 3000

//_______________ ЗДЕСЬ ОПИСАНА ВНУТРЕННЯ ФУНКЦИЯ thunkMiddleware
// function createThunkMiddleware(extraArgument) {
//   return ({dispatch, getState})  => next => action => {

//     if(typeof action === 'function') {
//       return action(dispatch, getState, extraArgument);
//     }
//     return next(action);
//   };

// }
// const thunk = createThunkMiddleware();
// thunk.withExtraArgument = createThunkMiddleware;

export default store;
