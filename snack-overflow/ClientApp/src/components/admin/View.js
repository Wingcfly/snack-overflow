import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class View extends Component {
    render() {
        document.getElementById('body').className = "post";
        return (
            <div>
                <div className="header lightweight-theme">
                    <Link to="/"><span className="avatar"></span></Link>
                </div>
                <div className="container">
                    <div className="main">
                        <h1>
                            <span>Tạo bài viết mới</span>
                        </h1>
                        <h2>
                            <span>Tiêu đề</span>
                        </h2>
                        <div>
                            <input type="text" className="header-input" placeholder="Nhập tiêu đề" />
                        </div>
                        <h2>
                            <span>Đường dẫn URL</span>
                        </h2>
                        <div>
                            <input type="text" className="header-input" placeholder="Đường dẫn URL" disabled />
                        </div>
                        <h2>
                            <span>Nội dung bài viết</span>
                        </h2>
                        <div>
                            
                        </div>
                    </div>
                </div>
                <div className="footer lightweight-theme">
                    <p>thanks <a href="https://thefullsnack.com/">the full snack developer</a> for making the awesome UI</p>
                    <p>Created with <i className="em em-coffee"></i> <a href="https://reactjs.org/">reactjs.org</a></p>
                </div>
            </div>
        );
    }
}