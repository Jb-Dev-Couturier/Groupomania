import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RocketRoundedIcon from '@mui/icons-material/RocketRounded';

const LeftNavAdmin = () => {
  let pathname = window.location.pathname;
  useEffect(() => {
    // eslint-disable-next-line
    pathname = window.location.pathname;
  }, [window.location.pathname]);
  return (
    <div className="containerAdminNavLeft">
      <aside className="left-nav-container">
        <div className="icons">
          <nav className="icons-bis">
            <Link
              to="/dashboard"
              className={`${
                pathname.match('/dashboard')
                  ? 'active-left-nav-admin'
                  : ''
              }`}
            >
              <DashboardIcon className="iconsSVGAdmin" />
            </Link>
            <br />
            <Link
              to="/profil"
              className={`${
                pathname.match('/profil') ? 'active-left-nav-admin' : ''
              }`}
            >
              <Person2RoundedIcon className="iconsSVGAdmin" />
            </Link>
            <br />
            <Link
              to="/userslist"
              className={`${
                pathname.match('/userslist')
                  ? 'active-left-nav-admin'
                  : ''
              }`}
            >
              <ManageAccountsIcon className="iconsSVGAdmin" />
            </Link>
            <br />
            <Link
              to="/postslist"
              className={`${
                pathname.match('/postslist')
                  ? 'active-left-nav-admin'
                  : ''
              }`}
            >
              <RocketRoundedIcon className="iconsSVGAdmin" />
            </Link>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default LeftNavAdmin;
