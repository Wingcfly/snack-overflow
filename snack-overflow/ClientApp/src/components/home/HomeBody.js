import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPosts: [
                { id: 1, title: "Paper Review: What do Sketches say about Thinking", date: "14-11-2019", status: 'Công khai' },
                // { id: 2, title: "Paper Review: Chuyện học khi mê sảng", date: "14-11-2019", status: 'Riêng tư' },
                // { id: 3, title: "Always negative your paid time off", date: "14-11-2019", status: 'Công khai' },
                // { id: 4, title: "Keyboard from Scratch: Từ A tới Z", date: "14-11-2019", status: 'Công khai' },
                // { id: 5, title: "Vài ghi chép về Iterator trong JavaScript", date: "14-11-2019", status: 'Công khai' },
                // { id: 6, title: "Cái nút Unsubscribe", date: "14-11-2019", status: 'Riêng tư' },
                // { id: 7, title: "A taste of Atomic CSS", date: "14-11-2019", status: 'Công khai' },
                // { id: 8, title: "Là framework? hay là library?", date: "14-11-2019", status: 'Công khai' },
                // { id: 9, title: "Blame Driven Development", date: "14-11-2019", status: 'Công khai' },
                // { id: 10, title: "Bàn về Problem Solving Skill", date: "14-11-2019", status: 'Riêng tư' },
                // { id: 11, title: "Giấy với bút", date: "14-11-2019", status: 'Công khai' },
                // { id: 12, title: "Hai kiểu lập trình viên", date: "14-11-2019", status: 'Công khai' },
                // { id: 13, title: "Kí sự si-li-côn", date: "14-11-2019", status: 'Công khai' },
                // { id: 14, title: "Stay healthy", date: "14-11-2019", status: 'Công khai' }
            ]
        }
    }
    render() {
        return (
            <div className="container">
                <div className="main">
                    {this.state.listPosts.map(post => {
                        return(
                            <div key={post.id} className='home-list-item'><span className='home-date-indicator'>{post.date}</span>paper<br /><Link to="posts/paper-review-what-do-sketches-say-about-thinking">{post.title}</Link></div>
                        )
                    })}
                </div>
            </div>
        );
    }
}