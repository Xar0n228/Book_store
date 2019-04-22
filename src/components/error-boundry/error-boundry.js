import React, { Component } from "react";
import ErrorIndicator from "../error-indicator";

export default class ErrorBoundry extends Component {
  state = {
    hasError: false
  };

  componentDidCatch() {
    // Вызывается, если ошибка возникла
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    return this.props.children; // Отрисовываем это, если ошибки нет
  }
}
