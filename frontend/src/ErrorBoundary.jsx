import React from "react";
import pages from "./pages";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            componentStack: null
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        this.setState({
            error: error,
            componentStack: info.componentStack
        });
        console.error(this.state.error)
    }

    render() {
        if (this.state.error) return <pages.Errors code={this.state.error} />
        return this.props.children;
    }
}