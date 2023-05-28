import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { dateToFormat } from "@/shared/lib/date";
import { Modal, ErrorAlert } from "@/shared/ui";
import { taskModel } from "@/entities/task";

export const TaskEditModal = ({ taskId, open, setOpen }) => {
    const { user } = useSelector(state => state.session);

    // const { task, isLoading: isLoadingTask } = taskModel.useGetTaskQuery(taskId);
    const { task, isLoading: isLoadingTask } = taskModel.useGetTasksQuery(undefined, {
        selectFromResult: ({ data }) => ({
            task: data?.find(task => task.id === taskId)
        })
    });

    const { data: logs, isLoading: isLoadingLogs, isFetching } = taskModel.useGetTaskLogsQuery(taskId, {
        skip: !taskId,
    });
    
    const [
        addLog,
        {
            error: errorAddLog,
            isLoading: isLoadingAddLog,
            isSuccess: isSuccessAddLog
        }
    ] = taskModel.useAddTaskLogMutation();

    // костыль вывода ошибки
    const [errorAlert, setErrorAlert] = useState(null);
    useEffect(() => {
        if (errorAddLog) {
            console.log(errorAddLog);
            setErrorAlert(<ErrorAlert message={errorAddLog.data.error} />);
        }
    }, [errorAddLog]);
    useEffect(() => {
        if (errorAlert) {
            setTimeout(() => setErrorAlert(null), 3000);
        }
    }, [errorAlert]);

    // const [activeLog, setActiveLog] = useState({ text: '', body: '', worker: null });
    const [activeLog, setActiveLog] = useState(null);

    useEffect(() => {
        if (logs?.length > 0) {
            setActiveLog(logs[logs.length - 1])
        } else {
            setActiveLog({ text: '', worker: null })
        }
    }, [logs])

    const onSubmit = () => {
        if (!activeLog.text || activeLog.text.length < 3) {
            setErrorAlert(<ErrorAlert message="Название лога должно быть не менее 3 символов" />);
            return false;
        }
        if (activeLog.body && activeLog.body.length < 3) {
            setErrorAlert(<ErrorAlert message="Тело лога должно быть не менее 3 символов" />);
            return false;
        }

        addLog({
            task: taskId,
            text: activeLog.text,
            body: activeLog.body || undefined,
            worker: user.id,
        });

        setActiveLog({ text: '', body: '', worker: null });

        return true;
    }

    if (!open && activeLog) return null;

    return (
        <>
            <Modal
                open={open}
                setOpen={setOpen}
                onSubmit={onSubmit}
                className="w-full max-w-2xl"
            >
                <h2 className="text-xl font-semibold leading-tight tracking-wide">
                    {task ? task.name :
                        <div className="bg-gray-300 h-6 w-1/2 animate-pulse"></div>
                    }
                </h2>
                <p className="flex-1 dark:text-gray-400">
                    {task ? task.description :
                        <div className="bg-gray-300 h-4 w-full animate-pulse"></div>
                    }
                    {isLoadingTask && <div className="bg-gray-300 h-4 w-full animate-pulse"></div>}
                </p>
                {isFetching && <div className="bg-gray-300 h-4 w-full animate-pulse"></div>}
                <div className="flex flex-col gap-2">
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">Текст лога</span>
                        <input
                            type="text"
                            value={activeLog?.text || ''}
                            onChange={e => setActiveLog({ ...activeLog, text: e.target.value })}
                            className="px-4 py-2 rounded-sm text-gray-900" />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">Тело лога</span>
                        <textarea
                            rows={5}
                            value={activeLog?.body || ''}
                            onChange={e => setActiveLog({ ...activeLog, body: e.target.value })}
                            className="px-4 py-2 rounded-sm text-gray-900" />
                    </label>

                    {logs?.length > 0 ? (
                        <label className="flex flex-col gap-1">
                            <span className="text-sm font-semibold">История изменений</span>
                            <select
                                className="px-4 py-2 rounded-sm bg-white text-gray-900"
                                value={activeLog?.id}
                                onChange={e => setActiveLog(logs.find(log => log.id === +e.target.value))}
                            >
                                {logs && [...logs].reverse().map(log =>
                                    <option key={log.id} value={log.id}>
                                        {log.text.slice(0, 50)} ({dateToFormat(log.created_at, 'DD.MM.YYYY HH:mm:ss')})
                                    </option>
                                )}
                            </select>
                        </label>
                    ) : (
                        <p>История изменений пуста</p>
                    )}
                </div>
            </Modal>
            {errorAlert}
        </>
    );
}