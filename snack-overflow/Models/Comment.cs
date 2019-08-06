using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace snack_overflow.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public DateTime DateComment { get; set; }
        public string Author { get; set; }

        [ForeignKey("Post")]
        public int PostID { get; set; }
        public virtual Post Post { get; set; }
    }
}
