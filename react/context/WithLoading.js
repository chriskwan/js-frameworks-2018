import React from 'react';
import { UIContext } from './AppContainer';

const WithLoading = (WrappedComponent) => {
    return (props) => {
        return (
            <UIContext.Consumer>
                {({ isLoading }) => {
                    return isLoading ? <div>Loading...</div> : <WrappedComponent {...props}/>;
                }}
            </UIContext.Consumer>
        );
    }
}

export default WithLoading;