using snack_overflow.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace snack_overflow.ViewModels
{
    public class ListPostsTitle
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Seo { get; set; }
        public DateTime Date { get; set; }
        public List<string> Tags { get; set; }
        public int Status { get; set; }
    }
}
