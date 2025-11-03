import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.isAuthenticated) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [store.isAuthenticated, navigate]);


    return (
        <div className="text-center vh-100 d-flex flex-column justify-content-center align-items-center">
            {store.isAuthenticated ? (
                <div>
                    <h1>Bienvenido 🎉</h1>
                    <p>Ahora que estás registrado, puedes ver esta sección privada.</p>
                </div>
            ) : (
                <div>
                    <h1>Private Section</h1>
                    <h6 className="pt-3">This is a private section of the application. You must be logged in to view this content.</h6>
                    <p className="pt-3">Redirecting to Login in 5 seconds...</p>
                </div>
            )}
        </div>
    );
}