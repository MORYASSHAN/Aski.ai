import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-bone">
          <p className="label">Something broke</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-white">
            This section failed to render.
          </h1>
          <pre className="mt-6 max-w-xl overflow-auto rounded-xl border border-white/10 bg-white/5 p-4 text-left text-sm text-fog">
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button
            className="btn-ghost mt-8"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
