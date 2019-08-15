import React, { Component } from 'react';
import { HomeHeader } from './home/HomeHeader';
import { HomeBody } from './home/HomeBody';

export class Home extends Component {
    componentDidMount() {
        document.title = "Nguyen's blog";
    }
    render() {
        document.getElementById('body').className = "index";
        return (
            <div>
                <HomeHeader/>
                <HomeBody/>
            </div>
        );
    }
}