import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import { ThreeDots } from "react-loader-spinner";
import { Alert, FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import axios from "axios";
import apis from "../apis.js";


const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

function getStyles() {
    return {
        fontSize: "0.7rem",
        color: "grey",
        fontFamily: "Poppins",
    };
}

function SuccessLogin() {
    const {
        state,
        getAccessToken
    } = useAuthContext();
    const [companies, setCompanies] = React.useState([]);
    const navigate = useNavigate();

    const [company, setCompany] = React.useState(null);

    const [user, setUser] = React.useState(true);
    const [alert, setAlertMessage] = React.useState(null);

    const fetchDataCompany = () => {
        axios
            .get(apis.server + `/companies`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
                        }`,
                },
            })
            .then((res) => {
                setCompanies(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const fetchUserMapping = () => {
        axios
            .get(apis.server + `/usermappings/userId?id=${state.sub}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
                        }`,
                },
            })
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data));
                setUser(false);
            })
            .catch((err) => {
                setUser(true);
                console.log(err);
            });
    }

    useEffect(() => {
        if (state.isAuthenticated) {
            fetchDataCompany();


            getAccessToken()
                .then((token) => {
                    localStorage.setItem("token", token);
                    fetchUserMapping();
                })
                .catch((error) => {
                    console.error("Unexpected error ex:", error);
                });
            if (!user) {
                navigate("/dashboard")
            }
        }
    }, [state.isAuthenticated, getAccessToken, navigate.user])



    const submitData = async (e) => {
        if (!company) {
            setAlertMessage("Please fill in all required fields");
            return;
        }
        setAlertMessage(null)
        axios({
            method: "post",
            url: apis.server + "/usermappings",
            data: {
                userId: state.sub,
                email: state.email,
                company: company
            },
            headers: {
                Authorization: `Bearer ${localStorage.token ? localStorage.token : ""
                    }`,
            },
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    setUser(false);
                    localStorage.setItem("user", JSON.stringify(response.data));
                    navigate("/dashboard");
                } else {
                    setUser(true);
                }
            })
            .catch(function (error) {
                console.log(error);
                setUser(true);
            });
    };
    if (!user) {
        navigate("/dashboard")
    }
    return (
        <>
            {!user ?
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
                </div> :
                <div className="content">
                    <div className="signup">
                        <div className="signup-form">
                            <div className="logo-signup">
                                {/* <img src={logo} alt="logo" className="logo-s" /> */}
                                <label>Complete Your Profile</label>
                                <label>Welcome to our platform! To enhance your experience, please take a moment to complete your profile.</label>
                            </div>
                            <div className="form-input">
                                <div className="input-item">
                                    <label>Select your company</label>
                                    <FormControl fullWidth style={{ minWidth: "200px" }}>
                                        <Select
                                            id="company"
                                            // className="input-style"
                                            value={company?.name}
                                            onChange={(e) => {
                                                const found = companies.find((company) => company.name === e.target.value);
                                                setCompany(found);
                                            }}
                                            size="small"
                                            displayEmpty
                                            input={<OutlinedInput />}
                                            renderValue={(selected) => {
                                                if (selected) {
                                                    return (
                                                        <label style={getStyles()}>{selected}</label>
                                                    );
                                                }
                                                return <em style={getStyles()}>-</em>;
                                            }}
                                            MenuProps={MenuProps}
                                            inputProps={{ "aria-label": "Without label" }}
                                        >
                                            <MenuItem key="1" value="" style={getStyles()}>
                                                <em>Pilih Unit</em>
                                            </MenuItem>
                                            {companies.map((company, index) => (
                                                <MenuItem key={company.id} name={company.id} value={company.name} id={company.id} style={getStyles()}>
                                                    {company.name}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        {alert !== null ? <Alert severity="error">{alert}</Alert> : ""}
                        <div className="submit-form-2">
                            <button className="submit" onClick={submitData}>Continue</button>
                        </div>
                    </div>
                </div>}

        </>
    );
}

export default SuccessLogin;
