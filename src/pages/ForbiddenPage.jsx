import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";

function ForbiddenPage() {

    const {
        signIn,
    } = useAuthContext();


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', textAlign: "center" }}>
            <div className="right-content">
                <div className="forbidden-content">
                    <label className="f-label">403</label>
                    <label className="f-label-l">Access Denied</label>
                    <label className="f-label-m">You have don't permission to access page or resource</label>
                    <label className="f-label-link" onClick={() => signIn()}> Login</label>
                </div>
            </div>
        </div>
    );
}

export default ForbiddenPage;
