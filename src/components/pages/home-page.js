import React from "react";
import BookListContainer from "../book-list";
import ShoppingCartTable from "../shopping-cart-table/shopping-cart-table";

const HomePage = () => {
  return (
    <div>
      <BookListContainer />
      <ShoppingCartTable />
    </div>
  );
};

export default HomePage;
