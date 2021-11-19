import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { useGlobalContext } from '../context/context';
const Dashboard = () => {
  const { isLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <main>
        <section className='section-center'>
          <Navbar />
          <Search />
          <div className='loading-img'>
            <img src={loadingImage} alt='laoding' />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className='section-center'>
        <Navbar />
        <Search />
        <Info />
        <User />
        <Repos />
      </section>
    </main>
  );
};

export default Dashboard;
