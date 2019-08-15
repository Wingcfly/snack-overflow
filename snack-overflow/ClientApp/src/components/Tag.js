import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: '',
            listPosts: [],
            listTags: []
        }
    }
    componentDidMount() {
        let tagName = this.props.match.params.id;
        axios.all([this.getListPosts(tagName), this.getListTags()])
            .then(axios.spread((lposts, ltags) => {
                this.setState({ tag: tagName, listPosts: lposts.data, listTags: ltags.data })
            }))
            .catch(() => console.log("Can't get data from server!"));
        document.title = tagName + " | Nguyen's blog";
    }
    componentWillReceiveProps(props) {
        let tagName = props.match.params.id;
        let link = 'api/tag/' + tagName;
        axios.get(link)
            .then(response => {
                this.setState({ listPosts: response.data, tag: tagName })
            })
            .catch(() => console.log("Can't get data from server!"));
        document.title = tagName + " | Nguyen's blog";
    }
    getListTags() {
        return axios.get('api/tag');
    }
    getListPosts(tagName) {
        let link = 'api/tag/' + tagName;
        return axios.get(link);
    }
    render() {
        document.getElementById('body').className = "";
        let isListPostsNotNull = this.state.listPosts.length != 0;
        let isListTagsNotNull = this.state.listTags.length != 0;
        return (
            <div>
                <div className="header lightweight-theme">
                    <Link to="/"><span className="avatar"></span></Link>
                </div>
                <div className="container">
                    <div className="main">
                        <h1>{this.state.tag}</h1>
                        <ul>
                            {isListPostsNotNull ? (
                                this.state.listPosts.map(post => {
                                    let postSeo = "/posts/" + post.seo;
                                    return (
                                        <li key={post.id}><Link to={postSeo}>{post.title}</Link></li>
                                    )
                                })
                            ) : ""}
                        </ul>
                        <div className='other-tags'><b>Other tags:</b>
                            {isListTagsNotNull ? (this.state.listTags.map(tag => {
                                let tagLink = '/tag/' + tag.name;
                                return (
                                    <Link className='topic-tag' key={tag.id} to={tagLink}>{tag.name}</Link>
                                )
                            })) : ("")}
                        </div>
                    </div>
                </div>
                <div className="footer lightweight-theme">
                    <p>thanks <a href="https://thefullsnack.com/">the full snack developer</a> for making awesome UI</p>
                    <p>Created with <i className="em em-heart"></i> <a href="https://reactjs.org/">love</a></p>
                </div>
            </div>
        );
    }
}

export default Tag;