import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            url: "",
            content: ""
        }
    }
    changeTitle(e) {
        let listTitleCharacter = e.target.value;
        let unmarkWord = '';
        for (let i = 0; i < listTitleCharacter.length; i++) {
            unmarkWord += this.unmarkCharacter(listTitleCharacter[i])
        }
        let newListTitleCharacter = unmarkWord.trim().toLowerCase().split(/\s+/);
        let urlCharacter = [];
        for (let ch of newListTitleCharacter) {
            if (newListTitleCharacter.indexOf(ch) !== (newListTitleCharacter.length - 1)) {
                urlCharacter += ch + '-';
            } else {
                urlCharacter += ch;
            }
        }
        this.setState({
            title: listTitleCharacter,
            url: urlCharacter
        })
    }
    changeContent(value) {
        this.setState({ content: value })
    }
    unmarkCharacter(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "e");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "i");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "u");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "y");
        str = str.replace(/Đ/g, "d");
        return str;
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
                        <h1><span>Tạo bài viết mới</span></h1>
                        <h2>Tiêu đề</h2>
                        <div className="input-parent">
                            <input type="text" className="header-input" onChange={(e) => this.changeTitle(e)} placeholder="Nhập tiêu đề" />
                        </div>
                        <h2>Đường dẫn URL</h2>
                        <div className="input-parent">
                            <input type="text" id="url-input" value={this.state.url} className="header-input" placeholder="Đường dẫn URL" disabled />
                        </div>
                        <h2>Nội dung bài viết</h2>
                        <div className="input-parent">
                            <SimpleMDE
                                id="content-input"
                                onChange={(value) => this.changeContent(value)}
                                value={this.state.content}
                                options={{
                                    spellChecker: false,
                                    placeholder: "Nhập nội dung bài viết"
                                }}
                            />
                        </div>
                        <h2>Bài viết liên quan</h2>
                    </div>
                </div>
                <div className="footer lightweight-theme">
                    <p>thanks <a href="https://thefullsnack.com/">the full snack developer</a> for making the awesome UI</p>
                    <p>Created with <i className="em em-coffee"></i> <a href="https://reactjs.org/">love</a></p>
                </div>
            </div>
        );
    }
}