using snack_overflow.Data;
using snack_overflow.Interfaces;
using snack_overflow.Models;
using snack_overflow.ViewModels;
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

        public List<ListPostsTitle> GetListPosts()
        {
            try
            {
                var listPosts = _context.Posts
                    .Select(s => new ListPostsTitle { Id = s.Id, Title = s.Title, Seo = s.SEO, Date = s.DateCreate, Tags = s.PostTags.Select(t => t.Tag.Name).ToList() }).ToList();
                return listPosts;
            } catch (Exception e)
            {
                throw new NotImplementedException();
            }
        }

        public List<ListPostsTitle> GetListPostsTitle(int id = 0)
        {
            try
            {
                if (id != 0)
                {
                    var listPosts = _context.Posts
                    .Where(s => s.Status == id)
                    .Select(s => new ListPostsTitle { Id = s.Id, Title = s.Title, Seo = s.SEO, Date = s.DateCreate, Tags = s.PostTags.Select(t => t.Tag.Name).ToList(), Status = s.Status }).ToList();
                    return listPosts;
                } else
                {
                    var listPosts = _context.Posts
                    .Select(s => new ListPostsTitle { Id = s.Id, Title = s.Title, Seo = s.SEO, Date = s.DateCreate, Tags = s.PostTags.Select(t => t.Tag.Name).ToList(), Status = s.Status }).ToList();
                    return listPosts;
                }
            } catch (Exception e)
            {
                throw new NotImplementedException();
            }
        }

        public PostDetail GetPost(string name)
        {
            try
            {
                var post = _context.Posts
                    .Select(s => new PostDetail { Id = s.Id, Title = s.Title, Content = s.Content, Comments = s.Comments, Seo = s.SEO, Date = s.DateCreate, Tags = s.PostTags.Select(pt => pt.Tag.Name).ToList() })
                    .FirstOrDefault(s => s.Seo == name);
                return post;
            }
            catch (Exception e)
            {
                throw new NotImplementedException();
            }
        }

        public void NewPost(PostDetail post)
        {
            try
            {
                //var newPost = new Post();
                //newPost.DateCreate = DateTime.Now;
                //newPost.Content = post.Content;
                //newPost.Title = post.Title;
                //newPost.Status = post.Status;
                //newPost.SEO = post.Seo;
                //_context.Add(post);

                //List<PostTag> postTags = new List<PostTag>();
                //foreach (var tagName in post.Tags)
                //{
                //    int tagId = _context.Tags.Where(s => s.Name == tagName).Select(s => s.Id).FirstOrDefault();
                //    PostTag newPT = new PostTag();
                //    newPT.TagId = tagId;
                //    postTags.Add(newPT);
                //}

                //_context.SaveChanges();
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
