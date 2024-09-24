using Microsoft.AspNetCore.Mvc;
using SkydiveEquipmentStore.Data;
using SkydiveEquipmentStore.DTO;
using SkydiveEquipmentStore.Models;
using SkydiveEquipmentStore.Services;

namespace SkydiveEquipmentStore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly AccountService _accountService;

        public AccountController(ApplicationDbContext context, IConfiguration configuration, AccountService accountService)
        {
            _context = context;
            _configuration = configuration;
            _accountService = accountService;
        }

        [HttpPost("createAccount")]
        public IActionResult CreateAccount([FromBody] UserDTO user)
        {
            string result = _accountService.CreateAccount(user);

            if (result.Contains("successfully"))
            {
                return Ok(new { message = result });
            }
            else
            {
                return BadRequest(result);
            }
        }

        [HttpPost("logInAccount")]
        public IActionResult LogInAccount([FromBody] UserLogInDTO user)
        {
            User result = _accountService.LogInAccount(user);

            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("User not found.");
        }

        [HttpPost("updateUserInformation")]
        public IActionResult UpdateUserInformation([FromBody] EditUserDTO updatedUserData)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == updatedUserData.Email);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.FirstName = updatedUserData.FirstName;
            user.LastName = updatedUserData.LastName;
            user.PhoneNumber = updatedUserData.PhoneNumber;
            user.DateOfBirth = DateTime.Parse(updatedUserData.DateOfBirth); 

            try
            {
                _context.SaveChanges();
                return Ok(new { message = "User information updated successfully." }); 
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Error updating user information: " + ex.Message });
            }
        }


        [HttpPost("uploadProfilePicture/{userId}")]
        public IActionResult UploadProfilePicture(int userId, [FromForm] IFormFile file)
        {
            byte[] bytes;
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                bytes = memoryStream.ToArray();
            }

            string result = _accountService.SaveProfilePicture(userId, bytes);

            if (result.Contains("successfully"))
            {
                return Ok(new { message = result });
            }
            else
            {
                return BadRequest(result);
            }
        }


        [HttpGet("profilePictureUrl/{userId}")]
        public IActionResult GetProfilePictureUrl(int userId)
        {
            var user = _context.Users.Find(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(new { profilePictureUrl = user.ProfilePictureUrl });
        }

    }
}

