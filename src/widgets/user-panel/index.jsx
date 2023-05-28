import { useSelector } from "react-redux";
import { LogoutButton } from "@/features/auth/logout";

export const UserPanel = ({ open, setOpen }) => {
    const user = useSelector(state => state.session.user);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
            onClick={e => e.target === e.currentTarget && setOpen(false)}
        >
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-gray-100 text-gray-900">
                    <div className="grid grid-cols-2 gap-2">
                        <img
                            src="https://source.unsplash.com/100x100/?portrait"
                            className="w-20 rounded-lg"
                            alt=""
                        />
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-semibold text-center">{user?.fio}</h2>
                            <p className="text-center">{user?.email}</p>
                        </div>
                    </div>
                    <LogoutButton />

                    <div className="flex flex-col gap-2">
                        <button
                            className="px-4 py-2 rounded-sm text-gray-900 bg-gray-200 hover:bg-gray-300"
                            onClick={() => setOpen(false)}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}