// import { CssBaseline } from "@mui/material";
import * as React from "react";
import { ClientList } from "./assets/components/clients/ClientsList";

function App() {
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <div className="App w-full h-svh flex flex-col gap-3 items-center justify-center bg-stone-100">
        <h4>Gestión de Personal</h4>
        <ClientList/>
      </div>
    </React.Fragment>
  );
}

export default App;
