using snack_overflow.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace snack_overflow.Interfaces
{
    public interface ITagRepository
    {
        List<TagAuthentic> ListTags();
    }
}
