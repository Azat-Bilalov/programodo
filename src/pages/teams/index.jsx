import { useState, useEffect } from "react"
import { SideNav } from "@/widgets/sidenav"
import { WorkerTable } from "@/entities/worker"
import { TeamTable } from "@/entities/team"
import { teamModel } from "@/entities/team"
import { AddToTeamButton } from "@/features/worker/add-to-team"
import { RemoveFromTeamButton } from "@/features/worker/remove-from-team"
import { TeamCreateButton } from "@/features/team/create"
import { TeamRemoveButton } from "@/features/team/remove"

export const TeamsPage = () => {
    const { data: teams, isLoading } = teamModel.useGetTeamsQuery();

    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [notInTeam, setNotInTeam] = useState(false);

    const { data: workers, isLoading: isWorkersLoading } = teamModel.useGetTeamWorkersQuery(selectedTeam?.id, {
        skip: !selectedTeam,
    });

    const { data: workersWithoutTeam } = teamModel.useGetWorkersWithoutTeamQuery({
        skip: selectedTeam,
    });

    useEffect(() => {
        setSelectedWorker(null);
    }, [selectedTeam]);

    return (
        <div className="flex flex-row">
            <SideNav />
            <main className="w-full overflow-y-auto gap-3 h-screen p-3 flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2">
                    <TeamTable
                        teamIds={teams?.map(team => team.id)}
                        onTeamClick={(team) => setSelectedTeam(team)}
                        selectedTeam={selectedTeam}
                    />
                    <div className="flex justify-center gap-3">
                        <button
                            className={notInTeam
                                ? "w-full p-2 text-white rounded-md text-center transition duration-300 delay-150 ease-in-out bg-green-500 hover:bg-green-600"
                                : "w-full p-2 text-green-600 rounded-md text-center transition duration-300 delay-150 ease-in-out bg-white hover:bg-green-500 hover:text-white border-2 border-green-500"
                            }
                            onClick={() => {
                                setSelectedWorker(null);
                                setNotInTeam(!notInTeam);
                            }}
                        >
                            Сотрудники без команды
                        </button>
                        <TeamCreateButton />
                        <TeamRemoveButton
                            teamId={selectedTeam?.id}
                            onRemove={() => setSelectedTeam(null)}
                            disabled={!selectedTeam}
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <WorkerTable
                        workerIds={!notInTeam
                            ? workers?.map(worker => worker.id)
                            : workersWithoutTeam?.map(worker => worker.id)
                        }
                        onWorkerClick={(worker) => setSelectedWorker(worker)}
                        selectedWorker={selectedWorker}
                    />
                    <div className="flex justify-center gap-3">
                    <AddToTeamButton
                        teamId={selectedTeam?.id}
                        workerId={selectedWorker?.id}
                        disabled={!notInTeam || !selectedTeam || !selectedWorker}
                    />
                    <RemoveFromTeamButton
                        teamId={selectedTeam?.id}
                        workerId={selectedWorker?.id}
                        disabled={notInTeam || !selectedTeam || !selectedWorker}
                        onRemove={() => setSelectedWorker(null)}
                    />
                    </div>
                </div>
            </main>
        </div>
    )
}
