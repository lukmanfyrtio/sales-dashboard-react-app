import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import { ThreeDots } from "react-loader-spinner";



function SuccessLogin() {
    const {
        state,
        getAccessToken
    } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (state.isAuthenticated) {
            localStorage.setItem("bup", "ALL");
            getAccessToken()
                .then((token) => {
                    localStorage.setItem("token", token);
                })
                .catch((error) => {
                    console.error("Unexpected error ex:", error);
                });
                navigate("/dashboard")
        }
    }, [state.isAuthenticated])



    return (
<>
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
        </>
    );
}

export default SuccessLogin;
