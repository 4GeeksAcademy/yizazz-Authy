import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [statusMessage, setStatusMessage] = useState(null);
    const { dispatch } = useGlobalReducer();
    const navigation = useNavigate();

    useEffect(() => {
        if (statusMessage) {
            setTimeout(() => {
                setStatusMessage(null);
            }, 3000);
        }
    }, [statusMessage]);

    const LoginUser = async (e) => {
        e.preventDefault();

        try {
            const email = document.getElementById("exampleInputEmail1").value;
            const password = document.getElementById("exampleInputPassword1").value;

            const response = await fetch("https://fuzzy-cod-5g956v5464q7hvjwq-3001.app.github.dev/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login successful:", data);
                setStatusMessage({ type: 'success', text: 'Login successful' });
                setEmail("");
                setPassword("");

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                dispatch({
                    type: "LOGIN",
                    payload: {
                        user: data.user,
                        token: data.token
                    }
                })

                setStatusMessage({ type: 'success', text: 'Login successful' });
                setEmail("");
                setPassword("");

                setTimeout(() => {
                    navigation("/private");
                }, 2000);


            } else {
                console.error("Login failed:", data);
                setStatusMessage({ type: 'error', text: data.error || 'Login failed' });
            }
        }
        catch (error) {
            console.error("Network or server error:", error);
        }
    }
    return <>
        <div className="container">
            <form className="row vh-100 justify-content-center d-flex align-items-center" onSubmit={LoginUser}>
                <div className="col-12 col-md-6">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" autoComplete="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                        <input type="password" autoComplete="current-password" className="form-control" id="exampleInputPassword1" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="row">
                        <span className="col-6 col-md-6 col-sm-6 d-flex justify-content-between">
                            <Link to="/signup" className="d-flex justify-content-start align-items-center">
                                Create Account
                            </Link>
                        </span>
                        <span className="col-6 col-md-6 col-sm-6 d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </span>
                    </div>
                    {statusMessage && (
                        <div className={`alert mt-3 ${statusMessage.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {statusMessage.text}
                        </div>
                    )}

                </div>
            </form>
        </div>
    </>
}