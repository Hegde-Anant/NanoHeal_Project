// src/GitHubAPI.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
                 <h3>Repository Name :</h3> <h2> {repo.name}</h2>
                <h3>Repository description : </h3><h2>{repo.description}</h2>
                <h3>Number of stars for the repo :</h3> <h2>{repo.stargazers_count}</h2>
                <h3>Number of issues for the repo :</h3> <h2>{repo.open_issues_count}</h2>
                <h3>Username :</h3> <h2>{repo.owner.login}</h2>
                <h3>Avatar : </h3><img className='img' src={repo.owner.avatar_url} alt="Avatar" />
                <h3>Created on {repo.created_at.split('T')[0]}</h3>
                <h3>Code pushed on {repo.pushed_at.split('T')[0]}</h3>
              </div>
            ))}
          
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default GitHubAPI;
