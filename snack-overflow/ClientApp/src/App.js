import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';
import { Post } from './components/Post';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route path='/posts/:name' component={Post} />
        {/* <Route exact path='/admin' component={} /> */}
        {/* <Layout> */}
          {/* <Route exact path='/' component={HomeHeader} /> */}
          {/* <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} /> */}
        {/* </Layout> */}
      </div>
    );
  }
}
