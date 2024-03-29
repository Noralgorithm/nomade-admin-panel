import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './main-routes';
import AuthenticationRoutes from './authentication-routes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthenticationRoutes]);
}
