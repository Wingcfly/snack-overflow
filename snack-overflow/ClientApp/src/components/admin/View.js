import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class View extends Component {
    static displayName = View.name;
    constructor(props) {
        super(props);
        this.state = {
            listPosts: [],
            currentID: 0,
            isShowPublishedPost: true
        }
    }
    componentDidMount() {
        axios.get('api/post')
            .then(response => {
                console.log(response.data)
                this.setState({ listPosts: response.data })
            })
            .catch(() => console.log("Can't get data from server"));
    }
    showPublishedPost() {
        this.setState({ isShowPublishedPost: true, currentID: 0 });
    }
    showUnpublishedPost() {
        this.setState({ isShowPublishedPost: false, currentID: 0 });
    }
    showFunction(e) {
        let listText = e.target.id.split("-");
        let numberID = listText[1];
        let isStartValue = this.state.currentID === 0;
        let numID = parseInt(numberID);
        if (numberID !== this.state.currentID) {
            if (isStartValue) {
                document.getElementById('post-feature-' + numID).classList.remove('non-display');
                document.getElementById('post-info-' + numID).classList.remove('non-display');
                this.setState({ currentID: numberID });
            } else {
                document.getElementById('post-feature-' + parseInt(this.state.currentID)).classList.add('non-display');
                document.getElementById('post-feature-' + numID).classList.remove('non-display');
                document.getElementById('post-info-' + parseInt(this.state.currentID)).classList.add('non-display');
                document.getElementById('post-info-' + numID).classList.remove('non-display');
                this.setState({ currentID: numberID });
            }
        } else {
            document.getElementById('post-feature-' + numID).classList.add('non-display');
            document.getElementById('post-info-' + numID).classList.add('non-display');
            this.setState({ currentID: 0 });
        }
    }
    sortArrayObjects(a, b) {
        if (a.id < b.id) {
            return 1;
        } else {
            return -1;
        }
    }
    render() {
        document.getElementById('body').className = "post";
        return (
            <div>
                <div className="header lightweight-theme">
                    <Link to="/"><span className="avatar"></span></Link>
                </div>
                <div className="container">
                    <div className="main">
                        <ul className="publish-type">
                            <li><button className="btn-create" onClick={() => this.showPublishedPost()}>Published</button></li>
                            <li><button className="btn-create" onClick={() => this.showUnpublishedPost()}>Unpublished</button></li>
                        </ul>
                        <h1><span>Danh sách bài viết hiện tại</span></h1>
                        {this.state.isShowPublishedPost ? (
                            this.state.listPosts.filter(post => post.status == 1).map(post => {
                                let postID = 'post-' + post.id;
                                let postFeatureID = 'post-feature-' + post.id;
                                let postOtherInfoID = 'post-info-' + post.id;
                                let keyNumber = post.id;
                                let date = new Date(post.date);
                                let time = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
                                return (
                                    <Post key={keyNumber}
                                        postID={postID}
                                        postFeatureID={postFeatureID}
                                        postOtherInfoID={postOtherInfoID}
                                        title={post.title}
                                        date={time}
                                        status={post.status}
                                        seo={post.seo}
                                        showFunction={(e) => this.showFunction(e)} />
                                )
                            })
                        ) : (
                                this.state.listPosts.filter(post => post.status == 2).map(post => {
                                    let postID = 'post-' + post.id;
                                    let postFeatureID = 'post-feature-' + post.id;
                                    let postOtherInfoID = 'post-info-' + post.id;
                                    let keyNumber = post.id;
                                    let date = new Date(post.date);
                                    let time = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
                                    return (
                                        <Post key={keyNumber}
                                            postID={postID}
                                            postFeatureID={postFeatureID}
                                            postOtherInfoID={postOtherInfoID}
                                            title={post.title}
                                            date={time}
                                            status={post.status}
                                            seo={post.seo}
                                            showFunction={(e) => this.showFunction(e)} />
                                    )
                                })
                            )}
                    </div>
                </div>
                <div className="sticky-zone">
                    <Link to="/admin/posts/new"><button className="btn-create">Tạo bài viết mới</button></Link>
                </div>
                <div className="footer lightweight-theme">
                    <p>thanks <a href="https://thefullsnack.com/">the full snack developer</a> for making awesome UI</p>
                    <p>Created with <i className="em em-coffee"></i> <a href="https://reactjs.org/">reactjs.org</a></p>
                </div>
            </div>
        );
    }
}

function Post(props) {
    let linkPost = "../posts/" + props.seo;
    return (
        <div className="post-zone">
            <h2 className="cursor-point" id={props.postID} onClick={(e) => props.showFunction(e)}>{props.title}</h2>
            <div className='other-tags non-display' id={props.postFeatureID}>Chức năng:
                <Link className='topic-tag' to={linkPost}>Xem</Link>
                <Link className='topic-tag' to="posts/edit/1">Sửa</Link>
                <Link className='topic-tag' to="">Xóa</Link>
            </div>
            <div className='other-tags non-display' id={props.postOtherInfoID}>Ngày đăng: <span className='topic-tag'>{props.date}</span>
            </div>
        </div>
    )
}