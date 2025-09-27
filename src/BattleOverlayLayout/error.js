import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, countdown: 5 };
    this.intervalId = null;
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
    // 既にエラーが発生してタイマーが作動中の場合は何もしない
    if (this.state.hasError && this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.setState(prevState => ({ countdown: prevState.countdown - 1 }));
    }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 5000); // 5秒
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
        return <p>Something went wrong.
            Reloading in {this.state.countdown} seconds...</p>;
    }

    return this.props.children;
  }
}