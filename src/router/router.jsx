import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/home/home";
import DetallePelicula from "../components/detallePelicula/detallePelicula";
import Card from "../components/card/card";
import SeleccionBoletos from "../components/seleccionBoletos/seleccionBoletos";
import SeleccionAsientos from "../components/seleccionAsientos/seleccionAsientos";
import PagoBoletos from "../components/pagoBoletos/pagoBoletos";
import LoginAdmi from "../components/loginAdmi/loginAdmi";
import PrivateRoutes from "./privateRoutes";
import { getSession } from "../service/sessionService/sessionService";
import { initialUser, userReducer } from "../service/admiReducer/admiReducer";
import Layout from "../components/layout/Layout";
import { createContext } from "react";
import HomeAdmin from "../componentsAdmi/homeAdmin/HomeAdmin";
import DetallesPeliculaAdmin from "../componentsAdmi/detallesPeliculaAdmin/DetallesPeliculaAdmin";
import CompraExitosa from "../components/compraExitosa/compraExitosa";
import DescargaBoletos from "../components/descargaBoletos/descargaBoletos";

export const AppContext = createContext({});

function Router() {
  const [nameUser, setNameUser] = useState([]);
  useEffect(() => {
    const user = getSession();
    if (user?.name) {
      userDispatch({
        type: "login",
        payload: {
          isAutenticated: true,
          user: user,
        },
      });
    }
  }, []);

  const [userLogin, userDispatch] = useReducer(userReducer, initialUser);
  const globalState = {
    user: {
      userLogin,
      userDispatch,
    },
  };

  return (
    <AppContext.Provider value={globalState}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Card />} />
            <Route path=":dataId" element={<Card />} />
            <Route path=":dataId/pelicula/:pelicula" element={<DetallePelicula />} />
            <Route path="/pelicula/:pelicula" element={<DetallePelicula />} />
            <Route path=":seleccionBoleto" element={<SeleccionBoletos />} />
            <Route path="/seleccionBoleto" element={<SeleccionBoletos />} />
            <Route path="/seleccionAsiento" element={<SeleccionAsientos />} />
            <Route path="/compraBoletos" element={<PagoBoletos />} />
            <Route path="/compraExitosa" element={<CompraExitosa />} />
            <Route path="/descargaBoletos" element={<DescargaBoletos />} />
          </Route>
          <Route path="/loginAdministrador" element={<LoginAdmi />} />

          <Route
            element={
              <PrivateRoutes isAutenticated={userLogin.isAutenticated} />
            }
          >
            <Route element={<Layout />}>
              <Route path="/administrador" element={<HomeAdmin />} />
              <Route
                path="/administrador/:pelicula"
                element={<DetallesPeliculaAdmin />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default Router;

// Parece que hay un problema con la configuración de tus rutas en React Router. Si no estás obteniendo el valor de pelicula en la ruta, podría ser debido a un error en la definición de la ruta correspondiente.

// Aquí tienes una posible corrección en tu código para asegurarte de que la ruta /:pelicula capture correctamente el valor de pelicula:

// jsx
// Copy code
// <BrowserRouter>
//   <Routes>
//     <Route path="/" element={<Home />}>
//       <Route path="/" element={<Card />} />
//       <Route path="/:dataId" element={<Card />} />
//       <Route path="/pelicula/:pelicula" element={<DetallePelicula />} />
//       <Route path="/seleccionBoleto" element={<SeleccionBoletos />} />
//       <Route path="/seleccionAsiento" element={<SeleccionAsientos />} />
//       <Route path="/compraBoletos" element={<PagoBoletos />} />
//       <Route path="/compraExitosa" element={<CompraExitosa />} />
//       <Route path="/descargaBoletos" element={<DescargaBoletos />} />
//     </Route>
//   </Routes>
// </BrowserRouter>
// En esta corrección, he agregado /pelicula/ antes de :pelicula en la ruta para asegurarme de que se capture correctamente el valor de pelicula. Por ejemplo, si tienes una URL como /pelicula/123, 123 será capturado como el valor de pelicula. Asegúrate de que esta configuración coincida con cómo estás pasando y recibiendo los parámetros en tu componente DetallePelicula.
