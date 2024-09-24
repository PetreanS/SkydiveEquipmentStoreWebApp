namespace SkydiveEquipmentStore.DTO
{
    public class EditUserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public int PhoneNumber { get; set; }
        public DateTime? CreatedDateTime { get; set; } = DateTime.Now;
    }
}
