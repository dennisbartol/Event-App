import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventPageLoader } from "./pages/EventPage";
import { EventsPage, loader as eventsPageLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import {
  AddEvent,
  loader as addEventLoader,
  action as addEvent,
} from "./pages/AddEvent";
import { EditEvent, loader as editEventLoader } from "./pages/EditEvent";
import React from "react";



// React routing

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsPageLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventPageLoader,
      },
      {
        path: "/event/addevent",
        element: <AddEvent />,
        loader: addEventLoader,
        action: addEvent,
      },
      {
        path: "editevent/:eventId",
        element: <EditEvent />,
        loader: editEventLoader,
     },
   ],
  },
]);



// Tapping into the index.html file .. 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
