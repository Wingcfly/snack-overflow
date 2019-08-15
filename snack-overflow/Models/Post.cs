using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace snack_overflow.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public string SEO { get; set; }
        [Required]
        public int Status { get; set; }
        [Required]
        public DateTime DateCreate { get; set; }
        public string RelatedPosts { get; set; }

        public virtual List<PostTag> PostTags { get; set; }
        public virtual List<Comment> Comments { get; set; }
    }
}
