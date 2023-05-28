import { teamModel } from "@/entities/team"

export const AddToTeamButton = ({ teamId, workerId, disabled }) => {
    const [addWorkerToTeam, { error, isLoading }] = teamModel.useAddWorkerToTeamMutation();

    return (
        <button
            className="flex gap- text-white w-full p-2 justify-center rounded-md transition duration-300 delay-150 ease-in-out bg-green-500 enabled:hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed"
            onClick={() => addWorkerToTeam({ teamId, workerId })}
            disabled={disabled}
        >
            Добавить в команду
            {disabled && <span className="transition ease-in-out delay-150 animate-bounce">👆</span>}
            {isLoading && <div className="transition ease-in-out delay-150 animate-spin ml-2">🔄</div>}
        </button>
    )
}