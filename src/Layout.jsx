import { Outlet } from 'react-router-dom';
import './App.css';

const Layout = () => {
  return (
    <div className="App-light-mode">
        <Outlet />
    </div>
  )
}

export default Layout