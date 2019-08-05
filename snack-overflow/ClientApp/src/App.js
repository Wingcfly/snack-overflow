import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';
import { Post } from './components/Post';
import { View } from './components/admin/View';
import { Edit } from './components/admin/posts/Edit';
import { New } from './components/admin/posts/New';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route path='/posts/paper-review-what-do-sketches-say-about-thinking' component={Post} />
        <Route exact path='/admin/posts' component={View} />
        <Route path='/admin/posts/new' component={New} />
        <Route path='/admin/posts/edit/:id' component={Edit} />
        {/* <Layout> */}
          {/* <Route exact path='/' component={HomeHeader} /> */}
          {/* <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} /> */}
        {/* </Layout> */}
      </div>
    );
  }
}
