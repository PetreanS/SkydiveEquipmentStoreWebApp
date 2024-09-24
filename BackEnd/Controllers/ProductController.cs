using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkydiveEquipmentStore.Data;
using SkydiveEquipmentStore.DTO;
using SkydiveEquipmentStore.Models;
using SkydiveEquipmentStore.Services;
using SkydiveEquipmentStore.ViewModels;

namespace SkydiveEquipmentStore.Controllers
{

    [Route("[controller]")]
    [ApiController]

    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ProductService _productService;

        public ProductController(ApplicationDbContext context, IConfiguration configuration, ProductService productService)
        {
            _context = context;
            _configuration = configuration;
            _productService = productService;
        }

        [HttpPost("createProduct")]
        public IActionResult CreateProduct([FromBody] ProductViewModel productData)
        {
            try
            {
                var product = new Product
                {
                    Name = productData.Name,
                    Price = productData.Price,
                    Description = productData.Description,
                    Sizes = productData.Sizes?.Select(size => new Size { Value = size.Value }).ToList(),
                    ImageUrl = null,
                    Category = productData.Category
                };

                if (productData.Colors != null)
                {
                    product.Colors = productData.Colors.Select(color => new Color { Value = color.Value }).ToList();
                }

                _context.Products.Add(product);
                _context.SaveChanges();

                return Ok(new { productId = product.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPost("editProduct")]
        public IActionResult EditProduct([FromBody] ProductViewModel productData)
        {
            try
            {
                var product = _context.Products
                    .Include(x => x.Colors)
                    .Include(x => x.Sizes)
                    .FirstOrDefault(x => x.Id == productData.Id);

                if (product == null)
                {
                    return NotFound("Product not found");
                }

                product.Name = productData.Name;
                product.Price = productData.Price;
                product.Description = productData.Description;
                product.Category = productData.Category;

                if (productData.Colors != null)
                {
                    product.Colors.Clear();
                    foreach (var color in productData.Colors)
                    {
                        product.Colors.Add(new Color { Value = color.Value });
                    }
                }

                if (productData.Sizes != null)
                {
                    product.Sizes.Clear();
                    foreach (var size in productData.Sizes)
                    {
                        product.Sizes.Add(new Size { Value = size.Value });
                    }
                }

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpDelete("deleteProduct")]
        public IActionResult DeleteProduct(int productId)
        {
            try
            {
                var product = _context.Products
                    .Include(x => x.Colors)
                    .Include(x => x.Sizes)
                    .FirstOrDefault(x => x.Id == productId);

                if (product == null)
                {
                    return NotFound("Product not found");
                }

                _context.Products.Remove(product);
                _context.SaveChanges();

                return Ok("Product deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPost("assignPhotoToProduct/{productId}")]
        public IActionResult AssignPhotoToProduct(int productId, [FromForm] IFormFile file)
        {
            try
            {
                var product = _context.Products.FirstOrDefault(p => p.Id == productId);
                if (product == null)
                    return NotFound("Product not found");

                using (var memoryStream = new MemoryStream())
                {
                    file.CopyTo(memoryStream);
                    var imageData = memoryStream.ToArray();

                    string imageUrl = _productService.SaveProductImage(imageData);

                    product.ImageUrl = imageUrl;
                    _context.SaveChanges();
                }

                return Ok(new { message = "Photo assigned to product successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("getSuitProducts")]
        public IQueryable<ProductDto> GetSuitProducts()
        {
            var suits = _context.Products
                                .Where(x => x.Category == "suit")
                                .Include(x => x.Colors)
                                .Include(x => x.Sizes)
                                .Select(x => new ProductDto
                                {
                                    Id = x.Id,
                                    Name = x.Name,
                                    Price = x.Price,
                                    Description = x.Description,
                                    ImageUrl = x.ImageUrl,
                                    Category = x.Category,
                                    Colors = x.Colors.Select(c => new ColorDto { Id = c.Id, Value = c.Value }).ToList(),
                                    Sizes = x.Sizes.Select(s => new SizeDto { Id = s.Id, Value = s.Value }).ToList()
                                });

            return suits;
        }


        [HttpGet("getJerseyProducts")]
        public IQueryable<ProductDto> GetJerseyProducts()
        {
            var jersey = _context.Products
                                .Where(x => x.Category == "jersey")
                                .Include(x => x.Colors)
                                .Include(x => x.Sizes)
                                .Select(x => new ProductDto
                                {
                                    Id = x.Id,
                                    Name = x.Name,
                                    Price = x.Price,
                                    Description = x.Description,
                                    ImageUrl = x.ImageUrl,
                                    Category = x.Category,
                                    Colors = x.Colors.Select(c => new ColorDto { Id = c.Id, Value = c.Value }).ToList(),
                                    Sizes = x.Sizes.Select(s => new SizeDto { Id = s.Id, Value = s.Value }).ToList()
                                });

            return jersey;
        }


        [HttpGet("getHelmetProducts")]
        public IQueryable<ProductDto> GetHelmetProducts()
        {
            var helmet = _context.Products
                                .Where(x => x.Category == "helmet")
                                .Include(x => x.Colors)
                                .Include(x => x.Sizes)
                                .Select(x => new ProductDto
                                {
                                    Id = x.Id,
                                    Name = x.Name,
                                    Price = x.Price,
                                    Description = x.Description,
                                    ImageUrl = x.ImageUrl,
                                    Category = x.Category,
                                    Colors = x.Colors.Select(c => new ColorDto { Id = c.Id, Value = c.Value }).ToList(),
                                    Sizes = x.Sizes.Select(s => new SizeDto { Id = s.Id, Value = s.Value }).ToList()
                                });

            return helmet;
        }
    }
}



