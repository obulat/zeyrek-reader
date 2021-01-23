import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NewText from '../pages/NewText';

const routes = [
  {
    path: '/login',
    component: Login,
    isPrivate: false
  },
  {
    path: '/signup',
    component: Signup,
    isPrivate: false
  },
  {
    path: '/dashboard',
    component: Dashboard,
    isPrivate: true
  },
  {
    path: '/new_text',
    component: NewText,
    isPrivate: true
  },
  {
    path: '/',
    component: Home,
    isPrivate: false
  },
];

export default routes;
