import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import vehicles from "./data/vehicles";
import VehivleView from './views/VehicleView.jsx';

const routes = [
  {
    path: "/",
    element: <App />
  }
];

vehicles.forEach(vehicles => {
  routes.push({
    path: vehicles.name,
    /*element: <div>{vehicles.name}</div>*/
    element: <VehivleView vehicle={vehicles}/>
  });
});

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
