import React, { useState, useEffect, useContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [gitHubUser, setGitHubUser] = useState(mockUser);
  const [followers, setFollowers] = useState(mockFollowers);
  const [repos, setRepos] = useState(mockRepos);
  const [request, setRequest] = useState(0);
  const [isLoading, SetIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  // get request
  const getRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        setRequest(remaining);
        if (remaining === 0) {
          displayError(true, 'sorry you have exceeded your hourly rate limit!');
        }
      })
      .catch((err) => console.log(err));
  };
  const displayError = (show = false, msg = '') => {
    setError({ show, msg });
  };
  // fetch user
  const searchGitHubUser = async (user) => {
    displayError();
    SetIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );

    if (response) {
      setGitHubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = 'fulfilled';
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      displayError(true, 'sorry user does not exist');
    }
    getRequest();
    SetIsLoading(false);
  };

  useEffect(getRequest, []);

  return (
    <GithubContext.Provider
      value={{
        gitHubUser,
        followers,
        repos,
        request,
        error,
        searchGitHubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GithubContext);
};

export { GithubContext, GithubProvider };
