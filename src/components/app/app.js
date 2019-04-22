import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage, CartPage } from "../pages";
import ShopHeader from "../shop-header";
import { withBookstoreService } from "../hoc";
import "./app.css";

// const App = ({ bookstoreService }) => {

//   // withBookstoreService()(App); сделала так, что нам теперь доступен bookstoreService

//   console.log(bookstoreService.getBooks());
//   return <div>App</div>;
// };

// export default withBookstoreService()(App);

const App = () => {
  return (
    <main role="main" className="container">
      <ShopHeader numItems={5} total={210} />
      <Switch>
        <Route path="/" component={HomePage} exact />

        <Route path="/cart" component={CartPage} />
      </Switch>
    </main>
  );
};

export default App;
