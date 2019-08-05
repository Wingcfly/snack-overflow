import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Post extends Component {
    static displayName = Post.name;
    constructor(props) {
        super(props);
        this.state = {
            currentID: 0
        }
    }
    render() {
        document.getElementById('body').className = "post";
        var content = this.props.match.params.name;
        return (
            <div>
                <div className="header lightweight-theme">
                    <Link to="/"><span className="avatar"></span></Link>
                </div>
                <div className="container">
                    <div className="main">
                        <h1><span>Paper Review: What do Sketches say about Thinking</span></h1>
                        <p>Sketching có điểm tương đồng với nói/viết ở chỗ nó có thể dùng để miêu tả một vấn đề hay sự vật sự việc, suy nghĩ, ý tưởng một cách không giới hạn. Nhưng nó lợi hại hơn nhờ khả năng mang nhiều thông tin hơn, ẩn dụ hơn (ví dụ: vài nét vẽ nguệch ngoạc, vẫn có thể diễn đạt một cái gì đó một cách ngắn gọn thay vì phải viết 100 từ để làm việc tương tự).</p>
                        <p>Nhìn vào một bản sketch, chúng ta không thể trích xuất được toàn bộ chi tiết ý tưởng của người sketch, mà cái chúng ta trích xuất được là cấu trúc của ý tưởng đó, và đôi khi còn có cả trình tự suy nghĩ của người ta nữa.</p>
                        <p>Trong một số trường hợp, dựa vào kinh nghiệm và kiến thức bản thân, người xem còn tự mình tưởng tượng hoặc hình dung ra được những thứ mà bản sketch không (và không thể) thể hiện ra, ví dụ, một bản vẽ cái pit-tông, nhưng nếu được vẽ thêm một cái mũi tên thể hiện hướng di chuyển của pit-tông, thì người xem, dựa trên kiến thức cá nhân, có thể hình dung được hình ảnh cái pit-tông đang chuyển động lui tới một cách sống động bên trong đầu của họ.</p>
                        <div className='other-tags'><b>Tags:</b> <a className='topic-tag' href='javascript:void(0)'>css</a><a className='topic-tag' href='javascript:void(0)'>opinion</a></div>
                        <div className="related-posts">
                            <h1>Các bài viết khác</h1>
                            <ul className='related-posts-list'>
                                <li><a className='related-post' href='javascript:void(0)'>Phức tạp hoá vấn đề: Phân tích và mô phỏng nút cảm xúc của Facebook</a></li>
                                <li><a className='related-post' href='javascript:void(0)'>Hai kiểu lập trình viên</a></li>
                                {/* <li><a className='related-post' href='javascript:void(0)'>Làm thế nào để viết blog kĩ thuật?</a></li>
                                <li><a className='related-post' href='javascript:void(0)'>Vài điều linh tinh về Github</a></li>
                                <li><a className='related-post' href='javascript:void(0)'>Cái nút Unsubscribe</a></li> */}
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