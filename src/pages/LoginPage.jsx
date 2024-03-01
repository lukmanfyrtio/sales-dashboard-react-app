import React, { useEffect } from "react";

import { useAuthContext } from "@asgardeo/auth-react";
import { ThreeDots } from "react-loader-spinner";
import { useLocation } from "react-router-dom";



function LoginPage() {
    const {
        signIn,
        state
    } = useAuthContext();

    const location = useLocation();
    const redirectUrl = new URLSearchParams(location.search).get('code');


    useEffect(() => {
        if (state.isAuthenticated) {
            return;
        }
        console.log(redirectUrl);
        if (!redirectUrl) {
            signIn();
        }

    }, [state.isAuthenticated])


    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', textAlign: "center" }}>
            <ThreeDots
                visible={true}
                color="#0c75d6"
                radius="10"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
            <p>If the page does not change within 5 seconds, please <a href="/">click here</a>.</p>
        </div>
    );
}

export default LoginPage;
