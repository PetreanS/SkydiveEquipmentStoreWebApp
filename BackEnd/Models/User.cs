using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkydiveEquipmentStore.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
        public string? ProfilePictureUrl { get; set; }

        [ForeignKey("RoleId")]
        public int? RoleId { get; set; }
        public Role? Role { get; set; }
    }
}
