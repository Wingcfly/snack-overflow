import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "easymde/dist/easymde.min.css";
import CKEditor from 'ckeditor4-react';

export class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            url: "",
            content: "",
            listPosts: [
                { id: 1, title: "Paper Review: What do Sketches say about Thinking", link: 'google.com' },
                { id: 2, title: "Paper Review: Chuyện học khi mê sảng", link: 'google.com' },
                { id: 3, title: "Keyboard from Scratch: Từ A tới Z", link: 'google.com' },
                { id: 4, title: "Vài ghi chép về Iterator trong JavaScript", link: 'google.com' },
                { id: 5, title: "Algorithm in Frontend - Kỳ 3: Hashmap", link: 'google.com' }
            ],
            listPostsFake: [
                { id: 1, title: "Hôm nay thế nào em 1", link: 'google.com' },
                { id: 2, title: "Hôm nay thế nào em 2", link: 'google.com' },
                { id: 3, title: "Hôm nay thế nào em 3", link: 'google.com' },
                { id: 4, title: "Hôm nay thế nào em 4", link: 'google.com' },
                { id: 5, title: "Hôm nay thế nào em 5", link: 'google.com' }
            ],
            listTags: []
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
        console.log(value)
        // this.setState({ content: value })
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
    onEditorChange(evt) {
        let editorData = evt.editor.getData();
        this.setState({
            content: editorData
        });
    }
    addTag(e) {
        if (e.key === 'Enter') {
            let listTags = this.state.listTags.slice();
            let newListPostsFake = this.state.listPostsFake.slice();
            let tagInput = e.target.value;
            for (let i = 0; i < newListPostsFake.length; i++) {
                let isSame = newListPostsFake[i].title === tagInput;
                if (isSame) {
                    listTags.push(newListPostsFake[i]);
                    newListPostsFake.splice(i, 1);
                    break;
                }
            }
            document.getElementById('tag-input').value = "";
            this.setState({ listPostsFake: newListPostsFake, listTags: listTags });
        }
    }
    removeTag(e) {
        let tag = e.target.id;
        let tagID = tag[tag.length - 1];
        let newListPostsFake = this.state.listPostsFake.slice();
        let newListTags = this.state.listTags.slice();
        for (let i = 0; i < newListTags.length; i++) {
            let isSame = newListTags[i].id == tagID;
            if (isSame) {
                newListPostsFake.push(newListTags[i]);
                newListTags.splice(i, 1);
                break;
            }
        }
        newListPostsFake.sort(this.sortArrayObjects);
        this.setState({ listPostsFake: newListPostsFake, listTags: newListTags });
    }
    sortArrayObjects(a, b) {
        if (a.id < b.id) {
            return -1;
        } else {
            return 1;
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
                            <CKEditor
                                data={this.state.data}
                                onChange={(evt) => this.onEditorChange(evt)}
                            />
                        </div>
                        <h2>Tags</h2>
                        <div className="input-parent">
                            <input list="browsers" id="tag-input" className="header-input" placeholder="Nhập tên bài viết liên quan" onKeyDown={(e) => this.addTag(e)} name="browser" />
                            <datalist id="browsers">
                                {this.state.listPostsFake.map(post => {
                                    return (
                                        <option key={post.id} value={post.title} />
                                    )
                                })}
                            </datalist>
                            <ul id="listTag" className="list-tag">
                                {this.state.listTags.map(tag => {
                                    let tagID = "tag-id-" + tag.id;
                                    return (
                                        <li key={tag.id} title="Nhấn để xóa" id={tagID} onClick={(e) => this.removeTag(e)}>{tag.title}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <h2>Bài viết liên quan</h2>
                        <div className="input-parent">
                        </div>
                    </div>
                </div>
                <div className="footer lightweight-theme">
                    <p>thanks <a href="https://thefullsnack.com/">the full snack developer</a> for making awesome UI</p>
                    <p>Created with <i className="em em-coffee"></i> <a href="https://reactjs.org/">love</a></p>
                </div>
            </div>
        );
    }
}