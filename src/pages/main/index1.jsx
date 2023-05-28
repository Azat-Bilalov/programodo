import { useNavigate } from "react-router-dom";

import { PowerIcon } from "@heroicons/react/24/outline";

export const MainPage = () => {
    const navigate = useNavigate();

    fetch("/api/auth/check", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        console.log(response);
        if (response.ok) {
            navigate("/community");
        } else {
            navigate("/login");
        }
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://www.svgrepo.com/download/96059/logo.svg"
                    alt="Your Company"
                />
                <PowerIcon className="mx-auto h-10 w-auto" />
            </div>
        </div>
    );
}
