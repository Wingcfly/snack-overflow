import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPosts: []
        }
    }
    componentDidMount() {
        axios.get('api/post/listpoststitle')
            .then(response => {
                let newData = response.data.sort(this.sortArrayObjects);
                this.setState({ listPosts: newData })
            })
            .catch(() => console.log("can't get data from server"));
    }
    sortArrayObjects(a, b) {
        if (a.id < b.id) {
            return 1;
        } else {
            return -1;
        }
    }
    render() {
        return (
            <div className="container">
                <div className="main">
                    {this.state.listPosts.length ? (this.state.listPosts.map(post => {
                        let tag = "";
                        for (let tagName of post.tags) {
                            if (post.tags.indexOf(tagName) === post.tags.length - 1) {
                                tag += tagName;
                            } else {
                                tag += tagName + ", ";
                            }
                        }
                        let date = new Date(post.date);
                        let time = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
                        let link = "posts/" + post.seo;
                        return (
                            <div key={post.id} className='home-list-item'><span className='home-date-indicator'>{time}</span>{tag}<br /><Link to={link}>{post.title}</Link></div>
                        )
                    })) : ""}
                </div>
            </div>
        );
    }
}