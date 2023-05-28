import { useEffect, useState } from "react";
import { taskModel } from "@/entities/task";
import { logModel } from "@/entities/log";
import { dateToFormat } from "@/shared/lib/date";
import { useSelector } from "react-redux";

export const Modal = (props) => {
    const {
        open,
        setOpen,
        cancelTitle = 'Отмена',
        submitTitle = 'Сохранить',
        onCancel = () => { },
        onSubmit = () => { },
        children,
        ...rest
    } = props;


    const handleCancel = () => {
        onCancel();
        setOpen(false);
    }

    const handleSubmit = () => {
        if (onSubmit() !== false) {
            setOpen(false);
        }
    }

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
            onClick={e => e.target === e.currentTarget && handleCancel()}
        >
            <div {...rest}>
                <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-gray-100 text-gray-900">
                    {children}
                    <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                        <button className="px-6 py-2 rounded-sm shadow-sm bg-gray-300 hover:bg-gray-400 text-gray-900" onClick={handleCancel}>{cancelTitle}</button>
                        <button className="px-6 py-2 rounded-sm shadow-sm bg-indigo-500 hover:bg-indigo-600 text-gray-100" onClick={handleSubmit}>{submitTitle}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}