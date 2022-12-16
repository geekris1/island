import { useRoutes } from "react-router-dom";
import { routes } from "virtual:island-routes";

function Router() {
  let routerElement = useRoutes(routes);
  return routerElement;
}

export default Router;
