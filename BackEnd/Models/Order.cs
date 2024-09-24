namespace SkydiveEquipmentStore.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string? ClientName { get; set; }
        public string? ClientAddress { get; set; }
        public string? ClientCountry { get; set; }
        public string? ClientZipCode { get; set; }
        public string? ClientPhoneNumber { get; set; }
        public decimal? OrderPrice { get; set; }
        public DateTime OrderData { get; set; } = DateTime.Now;
    }
}
