import { useState, useEffect } from "react"
import { teamModel } from "@/entities/team"
import { ErrorAlert } from "@/shared/ui/alert"

export const TeamRemoveButton = ({ teamId, disabled, onRemove }) => {
    const [deleteTeam, { error }] = teamModel.useDeleteTeamMutation();

    const [errorAlert, setErrorAlert] = useState(null);

    useEffect(() => {
        if (error) {
            setErrorAlert(<ErrorAlert message={error.data.error} />);
            setTimeout(() => setErrorAlert(null), 3000);
        }
    }, [error]);

    return (
        <>
            <button
                className="flex items-center text-white w-full p-2 justify-center rounded-md transition duration-300 delay-150 ease-in-out bg-rose-500 enabled:hover:bg-rose-600 disabled:bg-rose-400 disabled:cursor-not-allowed"
                onClick={() => {deleteTeam(teamId); onRemove()}}
                disabled={disabled}
            >
                Удалить команду
            </button>
            {errorAlert}
        </>
    )
}