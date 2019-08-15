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
    public class TagRepository : ITagRepository
    {
        private readonly BlogDBContext _context;
        public TagRepository(BlogDBContext context)
        {
            _context = context;
        }

        public List<PostDetail> ListPostsOfTag(string tagName)
        {
            try
            {
                int tagId = _context.Tags.Where(s => s.Name == tagName).Select(t => t.Id).FirstOrDefault();
                var listPosts = _context.Posts.Where(p => p.Status == 1 && p.PostTags.FirstOrDefault(s => s.TagId == tagId) != null)
                    .Select(s => new PostDetail { Id = s.Id, Title = s.Title, Seo = s.SEO, Date = s.DateCreate })
                    .OrderByDescending(s => s.Id)
                    .ToList();
                return listPosts;
            } catch (Exception e)
            {
                throw new NotImplementedException();
            }
        }

        public List<TagAuthentic> ListTags()
        {
            try
            {
                var listTags = _context.Tags.Select(s => new TagAuthentic { Id = s.Id, Name = s.Name }).ToList();
                return listTags;
            } catch (Exception e)
            {
                throw new NotImplementedException();
            }
        }
    }
}
