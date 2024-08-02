

const TodayRow = ({i, client, site, homeWorkers, outsideWorkers})=>{

    return (
        <div className="border border-stone-300 flex w-full">
            <div className="divide-y"> {i} </div>
            <div className="divide-y"> {client} </div>
            <div className="divide-y"> {site} </div>
            <div className="divide-y"> {homeWorkers} </div>
            <div className="divide-y"> {outsideWorkers} </div>

        </div>
    )
}

export default TodayRow;