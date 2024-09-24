using SkydiveEquipmentStore.Models;

namespace SkydiveEquipmentStore.ViewModels
{
    public class ProductViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public List<ProductAttributeViewModel>? Colors { get; set; }
        public List<ProductAttributeViewModel> Sizes { get; set; }
    }

    public class ProductAttributeViewModel
    {
        public int ProductId { get; set; }
        public string Value { get; set; }
    }

}
