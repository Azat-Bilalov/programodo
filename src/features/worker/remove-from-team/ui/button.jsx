import { teamModel } from "@/entities/team"

export const RemoveFromTeamButton = ({ teamId, workerId, disabled, onRemove }) => {
    const [deleteWorkerFromTeam, { error, isLoading }] = teamModel.useDeleteWorkerFromTeamMutation();

    return (
        <button
            className="flex gap- text-white w-full p-2 justify-center rounded-md transition duration-300 delay-150 ease-in-out bg-rose-500 enabled:hover:bg-rose-600 disabled:bg-rose-400 disabled:cursor-not-allowed"
            onClick={() => {deleteWorkerFromTeam({ teamId, workerId }); onRemove()}}
            disabled={disabled}
        >
            Удалить из команды
            {disabled && <span className="transition ease-in-out delay-150 animate-bounce">❎</span>}
            {isLoading && <div className="transition ease-in-out delay-150 animate-spin ml-2">🔄</div>}
        </button>
    )
}