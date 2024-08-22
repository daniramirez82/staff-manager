import { useWorkersStore } from "../../../stores/dayStore";

// Desde este componente solo recibir los datos desde el store y pintarlos
// Se podría filtrar aquí los trabajadores por sus skills

const WorkersTable = () => {
    const availableHomeWorkers = useWorkersStore(state => state.availableHomeWorkers);
    const availableOutsideWorkers = useWorkersStore(state => state.availableOutsideWorkers);
    return (
        <div className="flex ">
            <div className=" bg-fuchsia-400">
                <div>Trabajadores Cisa</div>
                <div className="">
                    
                {availableHomeWorkers.map((worker) => (
                    <span className="pl-2" key={worker.id}>{worker.workerAlias}</span>
                ))}
                </div>
            </div>
            <div className="bg-green-300">
                <div>Trabajadores externos</div>
                <div className="">
                {availableOutsideWorkers.map((worker) => (
                    <span className="pl-2" key={worker.id}>{worker.workerAlias}</span>
                ))}
                </div>
            </div>
        </div>
    );
}

export default WorkersTable;
