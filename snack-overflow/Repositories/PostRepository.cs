using snack_overflow.Data;
using snack_overflow.Interfaces;
using snack_overflow.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace snack_overflow.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly BlogDBContext _context;
        public PostRepository(BlogDBContext context)
        {
            _context = context;
        }
        public List<Post> GetListPost()
        {
            try
            {
                var listPost = _context.Posts.ToList();
                return listPost;
            } catch (Exception e)
            {
                throw new NotImplementedException();
            }
        }

        public Post GetPost(string name)
        {
            try
            {
                var post = _context.Posts.FirstOrDefault(s => s.SEO == name);
                return post;
            } catch (Exception e)
            {
                throw new NotImplementedException();
            }
        }

        public void UpdatePost(int id, Post post)
        {
            throw new NotImplementedException();
        }
    }
}
