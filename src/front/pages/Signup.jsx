import React, { useEffect, useState } from "react";

export const Signup = () => {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [statusMessage, setStatusMessage] = useState(null);

    const urlBase = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        if (statusMessage) {
            setTimeout(() => {
                setStatusMessage(null);
            }, 4000);
        }
    }, [statusMessage]);

    const SignupUser = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch(`${urlBase}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, last_name: lastName, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Signup successful:", data);
                setStatusMessage({ type: 'success', text: 'Registro exitoso' });
                setName("");
                setLastName("");
                setEmail("");
                setPassword("");
            } else {
                console.error("Signup failed:", data);
                setStatusMessage({ type: 'error', text: data.error || 'Fallo en el registro' });
            }
        } catch (error) {
            console.error("Network or server error:", error);
            setStatusMessage({ type: 'error', text: 'Error de red o servidor' });
        }
    }

    return <>
        <div className="row">
            <div className="col-12 col-md-6 align-items-center d-flex flex-column mx-auto vh-100 justify-content-center">
                <form className="form" onSubmit={SignupUser}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputLastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="exampleInputLastName" aria-describedby="lastNameHelp" value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" autoComplete="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" autoComplete="current-password" className="form-control" id="exampleInputPassword1" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >Submit</button>
                    {statusMessage && (
                        <div className={`mt-3 alert ${statusMessage.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {statusMessage.text}
                        </div>
                    )}
                </form>
            </div>
        </div>
    </>
}