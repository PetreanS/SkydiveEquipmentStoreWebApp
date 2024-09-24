using Microsoft.AspNetCore.Mvc;
using SkydiveEquipmentStore.Data;
using SkydiveEquipmentStore.DTO;
using SkydiveEquipmentStore.Services;

namespace SkydiveEquipmentStore.Controllers
{

    [Route("[controller]")]
    [ApiController]

    public class ContactController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ContactService _contactService;

        public ContactController(ApplicationDbContext context, IConfiguration configuration, ContactService contactService)
        {
            _context = context;
            _configuration = configuration;
            _contactService = contactService;
        }

        [HttpPost("processContactRequest")]
        public IActionResult ProcessContactRequest(ContactDTO contactRequest)
        {
            try
            {
                var contact = new ContactDTO
                {
                    Name = contactRequest.Name,
                    Email = contactRequest.Email,
                    PhoneNumber = contactRequest.PhoneNumber,
                    Subject = contactRequest.Subject,
                    Message = contactRequest.Message
                };

                _contactService.SendContactEmailToAdmins(contact);
                _contactService.SendConfirmationEmailToUser(contactRequest.Email, contactRequest.Name);
                return Ok(new { message = "Contact request processed successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing the contact request.");
            }
        }


    }
}
