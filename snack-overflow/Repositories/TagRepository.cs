using snack_overflow.Data;
using snack_overflow.Interfaces;
using snack_overflow.Models;
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
