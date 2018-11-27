// Ref: https://tylermcginnis.com/react-router-protected-routes-authentication/
// Only renders the passed in component if the user is logged in
// 1. Has the same API as <Route />
// 2. Renders a <Route /> and passes all props through to it
// 3. If the user is logged in, renders the component prop, if not, it redirects them to login
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UIContext } from './AppContainer';

const PrivateRoute = props => {
    const { render, component: Component, location, ...restOfProps } = props;

    return (
        <UIContext.Consumer>
            {
                ({ isLoggedIn }) => <Route {...restOfProps} render={routeProps => (
                    isLoggedIn
                    ? (render !== undefined ? render(routeProps) : <Component {...routeProps} />)
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: location }
                    }}/>
                )} />
            }
        </UIContext.Consumer>

    );
};
export default PrivateRoute;