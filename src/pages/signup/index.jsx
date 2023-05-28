import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { SignupForm } from "@/features/auth/signup";

export const SignupPage = () => {
    const navigate = useNavigate();

    const [ message, setMessage ] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("Подождите...");

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        let response = await fetch("api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(await response.json()));
            navigate("/products");
        } else {
            const message = await response.json();
            setMessage(message.error);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://www.svgrepo.com/download/96059/logo.svg"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Регистрация нового аккаунта
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <SignupForm />
            </div>
        </div>
    );
}
