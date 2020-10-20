/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
// import axios from 'axios';

import Header from 'view/shared/header';
import Sidebar from 'view/sidebar';
import GoogleMaps from 'view/map';

import './app.css';

function App(): ReactElement {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <Sidebar />
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4 map-pad">
            <GoogleMaps />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
