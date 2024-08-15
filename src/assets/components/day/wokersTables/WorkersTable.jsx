import { useWorkersStore } from "../../../stores/dayStore";

// Desde este componente solo recibir los datos desde el store y pintarlos
// Se podría filtrar aquí los trabajadores por sus skills

const WorkersTable = () => {
    const availableHomeWorkers = useWorkersStore(state => state.availableHomeWorkers);

    return (
        <div>
            {availableHomeWorkers.map((worker) => (
                <span key={worker.id}>{worker.workerAlias}</span>
            ))}
        </div>
    );
}

export default WorkersTable;
