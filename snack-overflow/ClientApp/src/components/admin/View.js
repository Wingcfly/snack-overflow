import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class View extends Component {
    static displayName = View.name;
    constructor(props) {
        super(props);
        this.state = {
            listPosts: [
                { id: 1, title: "Paper Review: What do Sketches say about Thinking", date: "14-11-2019", status: 'Công khai' },
                { id: 2, title: "Paper Review: Chuyện học khi mê sảng", date: "14-11-2019", status: 'Riêng tư' },
                { id: 3, title: "Always negative your paid time off", date: "14-11-2019", status: 'Công khai' },
                { id: 4, title: "Keyboard from Scratch: Từ A tới Z", date: "14-11-2019", status: 'Công khai' },
                { id: 5, title: "Vài ghi chép về Iterator trong JavaScript", date: "14-11-2019", status: 'Công khai' },
                { id: 6, title: "Cái nút Unsubscribe", date: "14-11-2019", status: 'Riêng tư' },
                { id: 7, title: "A taste of Atomic CSS", date: "14-11-2019", status: 'Công khai' },
                { id: 8, title: "Là framework? hay là library?", date: "14-11-2019", status: 'Công khai' },
                { id: 9, title: "Blame Driven Development", date: "14-11-2019", status: 'Công khai' },
                { id: 10, title: "Bàn về Problem Solving Skill", date: "14-11-2019", status: 'Riêng tư' },
                { id: 11, title: "Giấy với bút", date: "14-11-2019", status: 'Công khai' },
                { id: 12, title: "Hai kiểu lập trình viên", date: "14-11-2019", status: 'Công khai' },
                { id: 13, title: "Kí sự si-li-côn", date: "14-11-2019", status: 'Công khai' },
                { id: 14, title: "Stay healthy", date: "14-11-2019", status: 'Công khai' }
            ],
            currentID: 0
        }
    }
    showMess(e) {
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
    render() {
        document.getElementById('body').className = "post";
        return (
            <div>
                <div className="header lightweight-theme">
                    <Link to="/"><span className="avatar"></span></Link>
                </div>
                <div className="container">
                    <div className="main">
                        <h1><span>Danh sách bài viết hiện tại</span></h1>
                        {this.state.listPosts.map(post => {
                            let postID = 'post-' + post.id;
                            let postFeatureID = 'post-feature-' + post.id;
                            let postOtherInfoID = 'post-info-' + post.id;
                            return (
                                <div key={post.id}>
                                    <h2 className="cursor-point" id={postID} onClick={(e) => this.showMess(e)}>{post.title}</h2>
                                    <div className='other-tags non-display' id={postFeatureID}>Chức năng:
                                        <Link className='topic-tag' to="">Xem</Link>
                                        <Link className='topic-tag' to="posts/edit/1">Sửa</Link>
                                        <Link className='topic-tag' to="">Xóa</Link>
                                    </div>
                                    <div className='other-tags non-display' id={postOtherInfoID}>Ngày đăng: <span className='topic-tag'>{post.date}</span> - Trạng thái: <span className='topic-tag'>{post.status}</span>
                                    </div>
                                </div>
                            )
                        })}
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