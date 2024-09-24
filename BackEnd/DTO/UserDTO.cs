namespace SkydiveEquipmentStore.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }
        public string Password { get; set; }
        public string AdminPassword { get; set; }
        public string DateOfBirth { get; set; }
        public DateTime? CreatedDateTime { get; set; } = DateTime.Now;
    }
}
