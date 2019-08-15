using snack_overflow.Models;
using snack_overflow.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace snack_overflow.Interfaces
{
    public interface IPostRepository
    {
        PostDetail GetPost(string name);
        List<PostDetail> GetListPostsTitle(int id);
        void UpdatePost(int id, Post post);
        void NewPost(PostDetail post);
    }
}
