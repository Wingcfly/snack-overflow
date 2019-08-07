import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                comments: []
            }
        }
    }
    componentDidMount() {
        let seo = this.props.match.params.name;
        let link = 'api/post/' + seo;
        axios.get(link)
            .then(response => this.setState({ post: response.data }))
            .catch(() => console.log("Can't get data from server"));
    }
    render() {
        document.getElementById('body').className = "post";
        let content = parse(this.state.post.content);
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
                            {this.state.post.tags.map(tag => {
                                return (
                                    <a className='topic-tag' href='javascript:void(0)'>{tag}</a>
                                )
                            })}
                        </div>
                        <div className="related-posts">
                            <h1>Các bài viết khác</h1>
                            <ul className='related-posts-list'>
                                <li><a className='related-post' href='javascript:void(0)'>Phức tạp hoá vấn đề: Phân tích và mô phỏng nút cảm xúc của Facebook</a></li>
                                <li><a className='related-post' href='javascript:void(0)'>Hai kiểu lập trình viên</a></li>
                            </ul>
                            <p><i className="em em-sun_with_face"></i> Ngoài ra, các bạn có thể <a href="https://facebook.com" rel="noopener noreferrer">follow mình trên Facebook</a> để đặt câu hỏi, hoặc nhận thông tin về các bài viết mới.</p>
                        </div>
                    </div>
                </div>
                <div className="footer lightweight-theme">
                    <p>thanks <a href="https://thefullsnack.com/">the full snack developer</a> for making awesome UI</p>
                    <p>Created with <i className="em em-coffee"></i> <a href="https://reactjs.org/">reactjs.org</a></p>
                </div>
            </div>
        );
    }
}