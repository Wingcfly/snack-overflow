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
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository) {
            _postRepository = postRepository;
        }
        [HttpGet]
        public IActionResult GetListPosts()
        {
            var listPosts = _postRepository.GetListPost();
            return new ObjectResult(listPosts);
        }
        [HttpGet]
        [Route("{name}")]
        public IActionResult GetPost([FromRoute]string name)
        {
            var post = _postRepository.GetPost(name);
            return new ObjectResult(post);
        }
    }
}