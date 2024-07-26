import * as React from "react";
import { ClientsMain } from "./assets/components/clients/ClientsMain";
import SideMenu from "./assets/components/sideMenu/SideMenu";
import TopBar from "./assets/ui/TopBar";
import { useState } from "react";
import { useGlobalView } from "./assets/stores/globalView";
import { CLIENTS, SUBCONTRACTORS } from "./db/collections";
import { SubContractorsMain } from "./assets/components/subcontractors/SubContractorsMain";

function App() {

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const globalView = useGlobalView((state)=> state.view)
  return (
    <React.Fragment>
      <div className="w-full bg-stone-100 ">
        <TopBar menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
        <SideMenu menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen}/>
        {globalView === CLIENTS ? <ClientsMain/>:""}
        {globalView === SUBCONTRACTORS ? <SubContractorsMain/>:""}

      </div>
    </React.Fragment>
  );
}
export default App;
