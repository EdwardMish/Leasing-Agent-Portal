import * as React from 'react';

class ApplicationErrorBoundary extends React.Component<{}, { hasError: boolean }> {
    constructor(props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log('Error has been caught: ', error);

        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Error API Interaction: ', error, errorInfo);
    }

    render() {
        if (this.state.hasError) return <h1>Something went wrong.</h1>;

        return this.props.children;
    }
}

export default ApplicationErrorBoundary;
