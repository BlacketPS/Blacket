import React from "react";
import Errors from "@views/Errors";

/**
 * A component that catches errors and displays them.
 * @export
 * @class ErrorBoundary
 * @extends {React.Component}
 */
export default class ErrorBoundary extends React.Component {
    /**
     * Creates an instance of ErrorBoundary.
     * @param {Object} props The properties of the component.
     * @memberof ErrorBoundary
     * @constructor
     * @returns {void}
     */
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            componentStack: null
        }
    }

    /**
     * Get the derived state of the error.
     * @returns {Object} The state of the error.
     */
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    /**
     * Catch an error and log it.
     * @param {*} error The error that was caught.
     * @param {Object} info Other information about the error. The stack trace shall be used.
     */
    componentDidCatch(error, info) {
        this.setState({
            error: error,
            componentStack: info.componentStack
        });
        console.error(this.state.error);
    }

    /**
     * Render the error boundary.
     * @returns {JSX.Element} The error boundary.
     */
    render() {
        if (this.state.error) return <Errors code={{
            error: this.state.error.toString().replace("Error: ", ""),
            componentStack: this.state.componentStack.toString()
        }} />;
        return this.props.children;
    }
}