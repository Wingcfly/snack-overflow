using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace snack_overflow.Models
{
    public class PostTag
    {
        public int PostId { get; set; }
        public virtual Post Post { get; set; }
        
        public int TagId { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
