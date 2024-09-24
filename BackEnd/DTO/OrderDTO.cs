namespace SkydiveEquipmentStore.DTO
{
    public class OrderDTO
    {
        public CurrentUserDTO UserDetails { get; set; }
        public AddressDTO Address { get; set; }
        public List<CartItemDTO> Cart { get; set; }
        public PaymentDTO Payment { get; set; }
        public decimal TotalPrice { get; set; }
    }

    public class CurrentUserDTO
    {
        public int UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
    }

    public class AddressDTO
    {
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string CountryRegion { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class CartItemDTO
    {
        public string Category { get; set; }
        public string Description { get; set; }
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Size { get; set; }
        public List<ColorDTO> Colors { get; set; }
        public List<SizeDTO> Sizes { get; set; }
    }

    public class ColorDTO
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }

    public class SizeDTO
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }

    public class PaymentDTO
    {
        public string BillingAddress { get; set; }
        public string CardNumber { get; set; }
        public string CardholderName { get; set; }
        public string CVV { get; set; }
        public string ExpiryDate { get; set; }
    }
}
