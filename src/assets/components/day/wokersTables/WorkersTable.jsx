import { useWorkersStore } from "../../../stores/dayStore";

// Desde este componente solo recibir los datos desde el store y pintarlos
// Se podría filtrar aquí los trabajadores por sus skills

const WorkersTable = () => {
    const availableHomeWorkers = useWorkersStore(state => state.availableHomeWorkers);
    const availableOutsideWorkers = useWorkersStore(state => state.availableOutsideWorkers);
    return (
        <div className="w-full max-w-full flex">
            <div className="bg-fuchsia-400 p-2 flex-1">
                <div className="text-lg font-bold">Trabajadores Cisa</div>
                <div className="flex flex-wrap">
                    {availableHomeWorkers.map((worker) => (
                        <span className="pl-2" key={worker.id}>{worker.workerAlias}</span>
                    ))}
                </div>
            </div>
            <div className="bg-green-300 p-2 flex-1">
                <div className="text-lg font-bold">Trabajadores externos</div>
                <div className="flex flex-wrap">
                    {availableOutsideWorkers.map((worker) => (
                        <span className="pl-2" key={worker.id}>{worker.workerAlias}</span>
                    ))}
                </div>
            </div>
        </div>


    );
}

export default WorkersTable;
