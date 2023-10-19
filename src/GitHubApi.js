import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import './App.css';

function GitHubAPI() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const toprepositories = new Date();
    toprepositories.setDate(toprepositories.getDate() - 30);
    const Dates = toprepositories.toISOString().split('T')[0];
    const Api = `https://api.github.com/search/repositories?q=created:>${Dates}&sort=stars&order=desc&page=${page}`;

    axios.get(Api)
      .then(response => {
        setRepos(prevRepos => [...prevRepos, ...response.data.items]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {repos.map(repo => (
            <div className='card'>
              <div className='image'>
                <img className='img' src={repo.owner.avatar_url} alt="Avatar" />
              </div>
              <div className='info'>
                <div className='heading'>{repo.name}</div>
                <p>{repo.description}</p>
                <h3>Stars : <span>{repo.stargazers_count}</span></h3>
                <h3>Issues : <span>{repo.open_issues_count}</span> </h3>
                <h3>Username : <span>{repo.owner.login}</span></h3>
                <h3>Repository created <span>{formatDistanceToNow(new Date(repo.created_at))}</span>  ago by <span>{repo.owner.login}</span></h3>
              </div>
            </div>
          ))}
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default GitHubAPI;
