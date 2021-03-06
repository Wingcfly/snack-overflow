import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class HomeHeader extends Component {
  static displayName = HomeHeader.name;

  render() {
    return (
      <header id="user_top" className="cf ">
          <figure id="user_logo" className="active">
            <Link to="/"/>
          </figure>
          <h2><Link to="/">Snack Overflow</Link></h2>
          <h4><span className="name_head">by</span> Nguyen Nguyen</h4>
          <h3>Tôi yêu máy bay, nhưng lại thích <a href="https://github.com/Wingcfly">code. Hiện tôi đang làm việc cho một công ty Outsourcing tại Việt Nam.</a></h3>
          <div className="header-top">
            <a href="https://facebook.com/" rel="noopener noreferrer" target="blank">Facebook</a>
            <a rel="me" href="https://github.com/Wingcfly">Github</a>
            <a href="https://ko-fi.com/wingcfly"><i className="em em-coffee"></i> Buy me a coffee</a>
            <Link to="admin/posts">Admin</Link>
          </div>
          {/* <div>
            <h4>UI Designed by <a href="https://thefullsnack.com/">The Full Snack Developer</a></h4>
          </div> */}
        </header>
    );
  }
}
