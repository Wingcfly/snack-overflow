import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './components/Home';
import { Post } from './components/Post';
import { View } from './components/admin/View';
import { Edit } from './components/admin/posts/Edit';
import { New } from './components/admin/posts/New';
import Tag from './components/Tag';

export default class App extends Component {
  static displayName = App.name;
  render() {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/admin/posts' component={View} />
        <Route path='/admin/posts/new' component={New} />
        <Route path='/admin/posts/edit/:id' component={Edit} />
        <Route path='/posts/:id' component={Post} />
        <Route path='/tag/:id' component={Tag} />
      </div>
    );
  }
}