import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';

export class Post extends Component {
    static displayName = Post.name;
    constructor(props) {
        super(props);
        this.state = {
            currentID: 0,
            post: {
                id: 0,
                title: "",
                date: "",
                content: "",
                seo: "",
                tags: [],
                relatedPostObject: [],
                comments: []
            }
        }
    }
    componentDidMount() {
        let seo = this.props.match.params.id;
        let link = 'api/post/' + seo;
        axios.get(link)
            .then(response => {
                document.title = response.data.title + " | Nguyen's blog";
                this.setState({ post: response.data })
            })
            .catch(() => console.log("Can't get data from server"));
    }
    /**
     * Problem: React only render with State
     * When pass params with urlQuery is props
     * So we are use method receiveProps for return Props them Change State with Props for render
     * 
     * I remember React only render when they have new state and prop
     * It's only render State is change. 
     * 
     * The action which I change url looks like I'm giving route a props. Right?
     * Yes That right ..! But it's props. So we are convert to state
     * I think Route do it for us?
     * No...! Route 1 mission keep props {... value, urlQuery,...}. Only first render
     * Route have 3 type: Render with Component via {Component} *
     * Render with Render ={() =>} *
     * Render with Child.. I remember it
     * But Props will render at First when Component instant.
     * 
     * Problem here is state in post, right? yes
     * I think this problem is a good lesson about state, route and props
     * So React born ComponentReceiveProps. But at the moment It's change method or destroy ReceiveProps
     * 
     * Do you think this methos is a part of React life cycle?
     * Truth. It's life cycle hook in document React v16.8.
     * hmm. I need to know more
     * getDriveFromProp.... it' similar Recieveprop. But it update State. It' can change position method Receiveprops
     * 
     * Good guy! Thanks you so much. I spent much time on this problem :()
     * Ok happy any :3
     * Good night :3
     */
    componentWillReceiveProps(props) {
        let seo = props.match.params.id;
        let link = 'api/post/' + seo;
        let self = this
        axios.get(link)
            .then(response => {
                document.title = response.data.title + " | Nguyen's blog";
                self.setState({ post: response.data })
            })
            .catch(() => console.log("Can't get data from server"));
    }
    redirectToAnotherPost = (e) => {
        let link = "/posts/" + e.target.id;
        return <Redirect to="/" />
    }
    render() {
        document.getElementById('body').className = "post";
        let content = parse(this.state.post.content);
        let isRelatedPostsNotNull = this.state.post.relatedPostObject != null;
        let isTagsNotNull = this.state.post.tags.length != null;
        return (
            <div>
                <div className="header lightweight-theme">
                    <Link to="/"><span className="avatar"></span></Link>
                </div>
                <div className="container">
                    <div className="main">
                        <h1><span>{this.state.post.title}</span></h1>
                        {content}
                        <div className='other-tags'><b>Tags:</b>
                            {isTagsNotNull ? (this.state.post.tags.map((tagName, i) => {
                                let tagLink = '/tag/' + tagName;
                                return (
                                    <Link className='topic-tag' key={i} to={tagLink}>{tagName}</Link>
                                )
                            })) : ("")}
                        </div>
                        <div className="related-posts">
                            <h1>Các bài viết khác</h1>
                            <ul className='related-posts-list'>
                                {isRelatedPostsNotNull ? (
                                    this.state.post.relatedPostObject.map(post => {
                                        let link = "/posts/" + post.seo;
                                        let isPublicPost = post.status === 1;
                                        return (
                                            (isPublicPost ? <li key={post.id}><Link to={link} className="related-post">{post.title}</Link></li> : "")
                                        )
                                    })
                                ) : ("")}
                            </ul>
                            <p><i className="em em-sun_with_face"></i> Ngoài ra, các bạn có thể <a href="https://facebook.com" rel="noopener noreferrer">follow mình trên Facebook</a> để đặt câu hỏi, hoặc nhận thông tin về các bài viết mới.</p>
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