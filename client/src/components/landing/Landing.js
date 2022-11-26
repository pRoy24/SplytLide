import React from 'react';
import LoginView from './LoginView';
import HomeView from './HomeView';
import { TopNav } from '../nav/TopNav';

export function Landing(props) {
  const { isLoggedIn } = props;  
  let defaultView = <span />;
  if (isLoggedIn) {
    defaultView = <LoginView />;
  } else {
    defaultView = <HomeView />;
  }
  return (
    <div>
      <TopNav/>
      <div className='container mx-auto px-4'>
       <div>
        {defaultView}
       </div>
      </div>
    </div>
  )
}