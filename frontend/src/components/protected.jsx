import React from 'react'
import { Redirect, Route } from 'react-router-dom';

export default function Protected({ component: Cmp, ...rest }) {

    let checkLogin=sessionStorage.getItem('token');

    return <Route
        {...rest}
        render={(props) => (
            checkLogin ? (
                <>
                    <Cmp {...props} />
                </>
            ) :
                (
                    <>
                        <Redirect to='/sign-in' />
                    </>
                )


        )} />
}
