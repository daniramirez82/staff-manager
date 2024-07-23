import * as React from "react";
import { ClientList } from "./assets/components/clients/ClientsList";
import SideMenu from "./assets/components/sideMenu/SideMenu";
import TopBar from "./assets/ui/TopBar";
import { useState } from "react";

function App() {

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  console.log(menuIsOpen);
  return (
    <React.Fragment>
      <div className="w-full bg-stone-100 ">
        <TopBar menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
        <SideMenu menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen}/>
        <ClientList/>
      </div>
    </React.Fragment>
  );
}

export default App;
