import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
    return <>
        <div className="row vh-100 justify-content-center d-flex align-items-center mt-5">
            <div className="form col-12 col-md-6">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <span className="d-flex justify-content-between">
                    <Link to="/signup" className="d-flex justify-content-start align-items-center">
                        <a>Create Account</a>
                    </Link>
                    <span className="justify-content-end d-flex">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </span>
                </span>
            </div>
        </div>
    </>
}