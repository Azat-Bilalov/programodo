import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sessionApi } from '@/entities/session';

import { ConfirmModal } from '@/shared/ui/';

export const LogoutButton = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(sessionApi.logout());
        navigate('/login');
    };

    const modalProps = {
        open: showModal,
        setOpen: setShowModal,
        title: "Выход из аккаунта",
        message: "Вы уверены, что хотите выйти из аккаунта?",
        onConfirm: handleLogout,
    };

    return (
        <>
            <ConfirmModal {...modalProps} />
            <button
                className="text-sm font-semibold leading-6 text-gray-900 bg-rose-100 hover:bg-rose-200"
                onClick={() => setShowModal(true)}
            >
                Выход из аккаунта <span aria-hidden="true">&rarr;</span>
            </button>
        </>
    );
}