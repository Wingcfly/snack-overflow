import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "easymde/dist/easymde.min.css";
import CKEditor from 'ckeditor4-react';
import axios from 'axios';

export class New extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            url: "",
            content: "",
            listPosts: [],
            listRelatedPosts: [],
            listTags: [],
            listTagsSelected: [],
            postStatus: "Chọn trạng thái bài viết",
            textValue: "ABC"
        }
    }
    componentDidMount() {
        axios.all([this.getListPosts(), this.getListTags()])
            .then(axios.spread((lposts, ltags) => {
                this.setState({ listPosts: lposts.data, listTags: ltags.data })
            }));
        document.title = "Tạo bài viết | Nguyen's blog";
    }
    getListPosts() {
        return axios.get('api/post/ListPostsTitle');
    }
    getListTags() {
        return axios.get('api/tag');
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
        str = str.replace(":", "");
        str = str.replace("/", "");
        str = str.replace("-", "");
        str = str.replace("@", "");
        str = str.replace("`", "");
        str = str.replace("&", "");
        str = str.replace("$", "");
        str = str.replace("#", "");
        str = str.replace("^", "");
        str = str.replace("*", "");
        str = str.replace("(", "");
        str = str.replace(")", "");
        str = str.replace("+", "");
        str = str.replace("=", "");
        str = str.replace("?", "");
        return str;
    }
    onEditorChange(evt) {
        let editorData = evt.editor.getData();
        this.setState({
            content: editorData
        });
    }
    changePostStatus(e) {
        this.setState({ postStatus: e.target.value });
    }
    addTag(e) {
        if (e.key === 'Enter') {
            let listTagsSelected = this.state.listTagsSelected.slice();
            let listTags = this.state.listTags.slice();
            let tagInput = e.target.value;
            for (let i = 0; i < listTags.length; i++) {
                let isSame = listTags[i].name === tagInput;
                if (isSame) {
                    listTagsSelected.push(listTags[i]);
                    listTags.splice(i, 1);
                    break;
                }
            }
            document.getElementById('tag-input').value = "";
            this.setState({ listTags: listTags, listTagsSelected: listTagsSelected });
        }
    }
    removeTag(e) {
        let tag = e.target.id;
        let tagID = tag[tag.length - 1];
        let listTags = this.state.listTags.slice();
        let listTagsSelected = this.state.listTagsSelected.slice();
        for (let i = 0; i < listTagsSelected.length; i++) {
            let isSame = listTagsSelected[i].id == tagID;
            if (isSame) {
                listTags.push(listTagsSelected[i]);
                listTagsSelected.splice(i, 1);
                break;
            }
        }
        listTags.sort(this.sortArrayObjects)
        this.setState({ listTags: listTags, listTagsSelected: listTagsSelected });
    }
    addRelatedPost(e) {
        if (e.key === 'Enter') {
            let listTagsSelected = this.state.listRelatedPosts.slice();
            let listTags = this.state.listPosts.slice();
            let tagInput = e.target.value;
            for (let i = 0; i < listTags.length; i++) {
                let isSame = listTags[i].title === tagInput;
                if (isSame) {
                    listTagsSelected.push(listTags[i]);
                    listTags.splice(i, 1);
                    break;
                }
            }
            document.getElementById('related-post-input').value = "";
            this.setState({ listPosts: listTags, listRelatedPosts: listTagsSelected });
        }
    }
    removeRelatedPost(e) {
        let tag = e.target.id;
        let tagID = tag[tag.length - 1];
        let listTags = this.state.listPosts.slice();
        let listTagsSelected = this.state.listRelatedPosts.slice();
        for (let i = 0; i < listTagsSelected.length; i++) {
            let isSame = listTagsSelected[i].id == tagID;
            if (isSame) {
                listTags.push(listTagsSelected[i]);
                listTagsSelected.splice(i, 1);
                break;
            }
        }
        listTags.sort(this.sortArrayObjects)
        this.setState({ listPosts: listTags, listRelatedPosts: listTagsSelected });
    }
    sortArrayObjects(a, b) {
        if (a.id < b.id) {
            return -1;
        } else {
            return 1;
        }
    }
    confirmPost() {
        document.getElementById('btnSubmit').classList.add('non-display');
        document.getElementById('btnConfirm').classList.remove('non-display');
        document.getElementById('btnNotConfirm').classList.remove('non-display');
    }
    notConfirmPost() {
        document.getElementById('btnSubmit').classList.remove('non-display');
        document.getElementById('btnConfirm').classList.add('non-display');
        document.getElementById('btnNotConfirm').classList.add('non-display');
    }
    submitPost() {
        let listRelatedPosts = [];
        for (let rPost of this.state.listRelatedPosts) {
            listRelatedPosts.push(rPost.id);
        }
        let listTags = [];
        for (let tName of this.state.listTagsSelected) {
            listTags.push(tName.name);
        }
        let pStatusIsNull = (this.state.postStatus != 1 && this.state.postStatus != 2);
        let pStatus;
        if (pStatusIsNull) {
            pStatus = 2;
        } else {
            pStatus = this.state.postStatus;
        }
        let newPost = {
            Title: this.state.title,
            Content: this.state.content,
            SEO: this.state.url,
            Status: pStatus,
            RelatedPost: listRelatedPosts,
            Tags: listTags
        }
        axios.post('api/post', newPost, {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            if (response.headers.status === "200") {
                this.props.history.push('/');
            }
        })
            .catch(() => console.log("Cant submit a new post"));
    }
    handleChange = value => {
        this.setState({ mdeValue: value });
    };
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
                                config={{
                                    image2_disableResizer: true,
                                    toolbar: [
                                    {
                                        name: 'styles',
                                        items: ['Styles', 'Format']
                                    },
                                    {
                                        name: 'basicstyles',
                                        items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']
                                    },
                                    {
                                        name: 'paragraph',
                                        items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
                                    },
                                    {
                                        name: 'links',
                                        items: ['Link', 'Unlink']
                                    },
                                    {
                                        name: 'insert',
                                        items: ['Image', 'Table']
                                    },
                                    {
                                        name: 'tools',
                                        items: ['Maximize']
                                    }
                                    ],
                                }}
                            />
                        </div>
                        <h2>Tags</h2>
                        <div className="input-parent">
                            <input list="browsers" id="tag-input" className="header-input" placeholder="Nhập tags của bài viết" onKeyDown={(e) => this.addTag(e)} name="browser" />
                            <datalist id="browsers">
                                {this.state.listTags.map(tag => {
                                    return (
                                        <option key={tag.id} value={tag.name} />
                                    )
                                })}
                            </datalist>
                            <ul id="listTag" className="list-tag">
                                {this.state.listTagsSelected.map(tag => {
                                    let tagID = "tag-id-" + tag.id;
                                    return (
                                        <li key={tag.id} title="Nhấn để xóa" id={tagID} onClick={(e) => this.removeTag(e)}>{tag.name}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <h2>Bài viết liên quan</h2>
                        <div className="input-parent">
                            <input list="browser-related-post" id="related-post-input" className="header-input" placeholder="Nhập bài viết liên quan" onKeyDown={(e) => this.addRelatedPost(e)} />
                            <datalist id="browser-related-post">
                                {this.state.listPosts.map(post => {
                                    return (
                                        <option key={post.id} value={post.title} />
                                    )
                                })}
                            </datalist>
                            <ul id="listRelatedPost" className="list-tag">
                                {this.state.listRelatedPosts.map(post => {
                                    let postID = "related-post-id-" + post.id;
                                    return (
                                        <li key={post.id} title="Nhấn để xóa" id={postID} onClick={(e) => this.removeRelatedPost(e)}>{post.title}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <h2>Trạng thái bài viết</h2>
                        <div className="input-parent">
                            <select className="select-input" onChange={(e) => this.changePostStatus(e)} value={this.state.postStatus}>
                                <option value="Chọn trạng thái bài viết" disabled hidden>Chọn trạng thái bài viết</option>
                                <option value="1">Công khai</option>
                                <option selected value="2">Riêng tư</option>
                            </select>
                        </div>
                        <div className="create-zone">
                            <button id="btnSubmit" className="btn-create" onClick={() => this.confirmPost()}>Tạo bài viết</button>
                            <button id="btnNotConfirm" className="btn-not-confirm non-display" onClick={() => this.notConfirmPost()}>Hủy</button>
                            <button id="btnConfirm" className="btn-confirm non-display" onClick={() => this.submitPost()}>Xác nhận</button>
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