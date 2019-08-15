using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using snack_overflow.Interfaces;

namespace snack_overflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;
        public TagController(ITagRepository tagRepository) {
            _tagRepository = tagRepository;
        }
        [HttpGet]
        public IActionResult GetListTags()
        {
            var listTags = _tagRepository.ListTags();
            return new ObjectResult(listTags);
        }
        [HttpGet]
        [Route("{name}")]
        public IActionResult GetListPostsOfTag([FromRoute]string name)
        {   
            var listPosts = _tagRepository.ListPostsOfTag(name);
            return new ObjectResult(listPosts);
        }
    }
}