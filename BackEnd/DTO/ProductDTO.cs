namespace SkydiveEquipmentStore.DTO
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string? ImageUrl { get; set; }
        public string Category { get; set; }
        public List<ColorDto> Colors { get; set; }
        public List<SizeDto> Sizes { get; set; }
    }

    public class ColorDto
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }

    public class SizeDto
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }

}
