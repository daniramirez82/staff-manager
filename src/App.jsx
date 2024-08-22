import * as React from "react";
import { ClientsMain } from "./assets/components/clients/ClientsMain";
import SideMenu from "./assets/components/sideMenu/SideMenu";
import TopBar from "./assets/ui/TopBar";
import { useState } from "react";
import { useGlobalView } from "./assets/stores/globalView";
import {
  CLIENTS,
  HOMEWORKERS,
  OUTSIDEWORKERS,
  SUBCONTRACTORS,
  DAYS
} from "./db/collections";
import { SubContractorsMain } from "./assets/components/subcontractors/SubContractorsMain";
import { HomeWorkersMain } from "./assets/components/homeWorkers/HomeWorkersMain";
import { OutsideWorkersMain } from "./assets/components/outsideWorkers/OutsideWorkersMain";
import Today from "./assets/components/day/Today";

function App() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const globalView = useGlobalView((state) => state.view);
  return (
    <React.Fragment>
      <div className="w-full bg-stone-100 min-w-[1024px]">
        <TopBar menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
        <SideMenu menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
        {globalView === CLIENTS ? <ClientsMain /> : ""}
        {globalView === SUBCONTRACTORS ? <SubContractorsMain /> : ""}
        {globalView === HOMEWORKERS ? <HomeWorkersMain /> : ""}
        {globalView === OUTSIDEWORKERS ? <OutsideWorkersMain /> : ""}
        {globalView === DAYS ? <Today /> : ""}

      </div>
    </React.Fragment>
  );
}
export default App;
