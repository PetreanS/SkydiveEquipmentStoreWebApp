namespace SkydiveEquipmentStore.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string? ImageUrl { get;set; }
        public string Category { get; set; }
        public List<Color> Colors { get; set; }
        public List<Size> Sizes { get; set; }
    }

    public class Color
    {
        public int Id { get; set; }
        public string Value { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
    }

    public class Size
    {
        public int Id { get; set; }
        public string Value { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
