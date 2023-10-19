// src/App.js
import React from 'react';
import './App.css';
import GitHubAPI from './GitHubApi';

function App() {
  return (
    <div className="App">
      <h1>Most Starred GitHub Repositories (Last 30 Days)</h1>
      <GitHubAPI />
    </div>
  );
}

export default App;
