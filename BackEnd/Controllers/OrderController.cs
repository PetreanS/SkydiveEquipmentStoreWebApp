using Microsoft.AspNetCore.Mvc;
using SkydiveEquipmentStore.Data;
using SkydiveEquipmentStore.DTO;
using SkydiveEquipmentStore.Models;
using Stripe;

namespace SkydiveEquipmentStore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public OrderController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("processOrder")]
        public IActionResult ProcessOrder(OrderDTO clientOrder)
        {
            try
            {
                var order = new Order
                {
                    ClientName = clientOrder.Address.FullName,
                    ClientAddress = clientOrder.Address.StreetAddress,
                    ClientCountry = clientOrder.Address.CountryRegion,
                    ClientPhoneNumber = clientOrder.Address.PhoneNumber,
                    ClientZipCode = clientOrder.Address.ZipCode,
                    OrderPrice = clientOrder.TotalPrice
                };

                foreach (var cartItem in clientOrder.Cart)
                {
                    var productColor = cartItem.Colors.FirstOrDefault();
                    var userFullName = $"{clientOrder.UserDetails.UserFirstName} {clientOrder.UserDetails.UserLastName}";

                    var clientOrderForHistory = new UserOrderHistory
                    {
                        UserId = clientOrder.UserDetails.UserId,
                        UserFullName = userFullName,
                        ProductId = cartItem.Id,
                        ProductName = cartItem.Name,
                        ProductPrice = cartItem.Price,
                        ProductDescription = cartItem.Description,
                        ProductImageUrl = cartItem.ImageUrl,
                        ProductCategory = cartItem.Category,
                        ProductSize = cartItem.Size,
                        ProductColor = productColor != null ? productColor.Value: "",
                    };

                    _context.UserOrderHistory.Add(clientOrderForHistory);
                }

                _context.Orders.Add(order);
                _context.SaveChanges();

                return Ok(new { message = "Order processed successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error processing order: {ex.Message}" });
            }
        }

        [HttpPost("createPaymentIntent")]
        public ActionResult CreatePaymentIntent([FromBody] CreatePaymentIntentDTO createPaymentIntentDTO)
        {
            StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];

            var options = new PaymentIntentCreateOptions
            {
                Amount = createPaymentIntentDTO.Amount,
                Currency = "usd",
                PaymentMethodTypes = new List<string> { "card" },
            };

            var service = new PaymentIntentService();
            var paymentIntent = service.Create(options);

            return Ok(new { client_secret = paymentIntent.ClientSecret });
        }

        [HttpGet("getUserOrderHistory/{userId}")]
        public IActionResult GetUserOrderHistory(int userId)
        {
            try
            {
                var userHistory = _context.UserOrderHistory.Where(order => order.UserId == userId).ToList();
                return Ok(userHistory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error retrieving user order history: {ex.Message}" });
            }
        }
    }
}
