using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using snack_overflow.Interfaces;
using snack_overflow.Models;
using snack_overflow.ViewModels;

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
            var listPosts = _postRepository.GetListPostsTitle(0);
            return new ObjectResult(listPosts);
        }
        [HttpGet]
        [Route("{name}")]
        public IActionResult GetPost([FromRoute]string name)
        {
            var post = _postRepository.GetPost(name);
            return new ObjectResult(post);
        }
        [HttpGet]
        [Route("ListPostsTitle")]
        public IActionResult GetListPostsTitle()
        {
            var listPostsTitle = _postRepository.GetListPostsTitle(1);
            return new ObjectResult(listPostsTitle);
        }
        [HttpPost]
        public IActionResult NewPost([FromBody, Bind("Title, Content, Seo, Date, Tags, RelatedPost, Status")]PostDetail post)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    _postRepository.NewPost(post);
                    return Ok();
                } else
                {
                    return BadRequest();
                }
            } catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}