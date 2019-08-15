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

        public List<PostDetail> GetListPosts()
        {
            try
            {
                var listPosts = _context.Posts
                    .Select(s => new PostDetail { Id = s.Id, Title = s.Title, Content = "", Seo = s.SEO, Date = s.DateCreate, Tags = s.PostTags.Select(t => t.Tag.Name).ToList() })
                    .OrderByDescending(s => s.Id)
                    .ToList();
                return listPosts;
            } catch (Exception e)
            {
                throw new NotImplementedException();
            }
        }

        public List<PostDetail> GetListPostsTitle(int id = 0)
        {
            try
            {
                if (id != 0)
                {
                    var listPosts = _context.Posts
                    .Where(s => s.Status == id)
                    .Select(s => new PostDetail { Id = s.Id, Title = s.Title, Content = "", Seo = s.SEO, Date = s.DateCreate, Tags = s.PostTags.Select(t => t.Tag.Name).ToList(), Status = s.Status })
                    .OrderByDescending(s => s.Id)
                    .ToList();
                    return listPosts;
                } else
                {
                    var listPosts = _context.Posts
                    .Select(s => new PostDetail { Id = s.Id, Title = s.Title, Content = "", Seo = s.SEO, Date = s.DateCreate, Tags = s.PostTags.Select(t => t.Tag.Name).ToList(), Status = s.Status })
                    .OrderByDescending(s => s.Id)
                    .ToList();
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
                PostDetail post;
                string rePosts = _context.Posts.Where(s => s.SEO == name).Select(s => s.RelatedPosts).FirstOrDefault();
                if (rePosts != "")
                {
                    string[] rePostsArray = rePosts.Split(",");
                    List<PostDetail> listRelatedPosts = new List<PostDetail>();
                    foreach (var rPost in rePostsArray)
                    {
                        int postId = int.Parse(rPost);
                        var targetPost = _context.Posts.Where(s => s.Id == postId)
                                        .Select(s => new PostDetail { Id = s.Id, Title = s.Title, Seo = s.SEO, Status = s.Status })
                                        .FirstOrDefault();
                        listRelatedPosts.Add(targetPost);
                    }
                    post = _context.Posts
                        .Select(s => new PostDetail { Id = s.Id, Title = s.Title, Content = s.Content, Comments = s.Comments, Seo = s.SEO, RelatedPostObject = listRelatedPosts, Date = s.DateCreate, Tags = s.PostTags.Select(pt => pt.Tag.Name).ToList() })
                        .FirstOrDefault(s => s.Seo == name);
                } else
                {
                    post = _context.Posts
                        .Select(s => new PostDetail { Id = s.Id, Title = s.Title, Content = s.Content, Comments = s.Comments, Seo = s.SEO, RelatedPostObject = null, Date = s.DateCreate, Tags = s.PostTags.Select(pt => pt.Tag.Name).ToList() })
                        .FirstOrDefault(s => s.Seo == name);
                }
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
                Post newPost = new Post();
                newPost.DateCreate = DateTime.Now;
                newPost.Content = post.Content;
                newPost.Title = post.Title;
                newPost.Status = post.Status;

                List<PostTag> listPostTags = new List<PostTag>();
                foreach (var tagName in post.Tags)
                {
                    int tagId = _context.Tags.Where(s => s.Name == tagName).Select(s => s.Id).FirstOrDefault();
                    Tag tag = _context.Tags.Find(tagId);
                    listPostTags.Add(new PostTag { Post = newPost, Tag = tag });
                }
                newPost.PostTags = listPostTags;

                Random random = new Random();
                string randomNumber = random.Next().ToString().Substring(0, 7);
                newPost.SEO = post.Seo + "." + randomNumber;

                string relatedPosts = "";
                foreach (var postItem in post.RelatedPost)
                {
                    if (post.RelatedPost.IndexOf(postItem) == (post.RelatedPost.Count - 1))
                    {
                        relatedPosts += postItem;
                    } else
                    {
                        relatedPosts += postItem + ",";
                    }
                }
                newPost.RelatedPosts = relatedPosts;

                _context.Posts.Add(newPost);
                _context.SaveChanges();
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
