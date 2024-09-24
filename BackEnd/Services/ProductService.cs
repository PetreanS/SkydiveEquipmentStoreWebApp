using SkydiveEquipmentStore.Data;

namespace SkydiveEquipmentStore.Services
{

    public class ProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public string SaveProductImage(byte[] imageData)
        {
            try
            {
                string uploadsFolder = @"FolderPathToUploadTheProducs";

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string uniqueFileName = Guid.NewGuid().ToString() + ".png";
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                File.WriteAllBytes(filePath, imageData);

                return "/assets/products/" + uniqueFileName;
            }
            catch (Exception ex)
            {
                return "Error saving product image: " + ex.Message;
            }
        }
    }
}
