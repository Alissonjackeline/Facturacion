import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./routes/public/publicRoutes";
import { privateRoutes } from "./routes/private/privateRoutes";

export default function App() {
  return useRoutes([publicRoutes, privateRoutes]);
}