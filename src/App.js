import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [progress, setProgress] = useState(0);

  // Base URL template
  const apiKey = "{API_Token}";
  const pageSize = 5;
  const baseURL = "https://newsapi.org/v2/top-headlines?country=us";

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Switch>
          <Route exact path="/">
            <News setProgress={setProgress} key="general" url={`${baseURL}&category=general&apiKey=${apiKey}&page=1&pageSize=${pageSize}`} />
          </Route>
          <Route exact path="/business">
            <News setProgress={setProgress} key="business" url={`${baseURL}&category=business&apiKey=${apiKey}&page=1&pageSize=${pageSize}`} />
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={setProgress} key="entertainment" url={`${baseURL}&category=entertainment&apiKey=${apiKey}&page=1&pageSize=${pageSize}`} />
          </Route>
          <Route exact path="/general">
            <News setProgress={setProgress} key="general" url={`${baseURL}&category=general&apiKey=${apiKey}&page=1&pageSize=${pageSize}`} />
          </Route>
          <Route exact path="/health">
            <News setProgress={setProgress} key="health" url={`${baseURL}&category=health&apiKey=${apiKey}&page=1&pageSize=${pageSize}`} />
          </Route>
          <Route exact path="/science">
            <News setProgress={setProgress} key="science" url={`${baseURL}&category=science&apiKey=${apiKey}&page=1&pageSize=${pageSize}`} />
          </Route>
          <Route exact path="/sports">
            <News setProgress={setProgress} key="sports" url={`${baseURL}&category=sports&apiKey=${apiKey}&page=1&pageSize=${pageSize}`} />
          </Route>
          <Route exact path="/technology">
            <News setProgress={setProgress} key="technology" url={`${baseURL}&category=technology&apiKey=${apiKey}&page=1&pageSize=${pageSize}`} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
