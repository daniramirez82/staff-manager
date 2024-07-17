import * as React from "react";
import { ClientList } from "./assets/components/clients/ClientsList";

function App() {
  return (
    <React.Fragment>
      <div className="w-full bg-stone-100">
        <h4>Gestión de Personal</h4>
        <ClientList/>
      </div>
    </React.Fragment>
  );
}

export default App;
