namespace SkydiveEquipmentStore.Models
{
    public class UserOrderHistory
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? UserFullName { get; set; }
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public string? ProductDescription { get; set; }
        public string? ProductImageUrl { get; set; }
        public string? ProductCategory { get; set; }
        public string? ProductSize { get; set; }
        public string? ProductColor { get; set; }

    }
}
