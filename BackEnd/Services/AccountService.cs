using System;
using Microsoft.Extensions.Configuration;
using SkydiveEquipmentStore.Data;
using SkydiveEquipmentStore.DTO;
using SkydiveEquipmentStore.Models;

namespace SkydiveEquipmentStore.Services
{
    public class AccountService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;


        public AccountService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public string CreateAccount(UserDTO user)
        {
            string adminPassword = _configuration.GetSection("AdminPassword").Value;

            if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.FirstName) || string.IsNullOrEmpty(user.LastName) || string.IsNullOrEmpty(user.Password) || user.PhoneNumber == 0 || string.IsNullOrEmpty(user.DateOfBirth))
            {
                return "Each field is mandatory";
            }

            if (_context.Users.Any(x => x.Email == user.Email))
            {
                return "User already exists.";
            }

            if (string.IsNullOrEmpty(user.AdminPassword))
            {
                CreateUser(user, 1);
                SendRegistrationEmail(user.Email, user.FirstName, user.LastName);
                return "Account created successfully.";
            }
            else if (user.AdminPassword == adminPassword)
            {
                CreateUser(user, 2);
                SendRegistrationEmail(user.Email, user.FirstName, user.LastName);
                return "Account created successfully with RoleId = 2.";
            }
            else
            {
                return "AdminPassword is incorrect.";
            }
        }

        public User LogInAccount(UserLogInDTO user)
        {
            var existingUser = _context.Users.FirstOrDefault(x => x.Email == user.Email && x.Password == user.Password);

            if (existingUser != null)
            {
                return existingUser;
            }
            return null;

        }

        public string UpdateUserInformation(UserDTO updatedUserData)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == updatedUserData.Email);

            if (user == null)
            {
                return "User not found.";
            }

            user.FirstName = updatedUserData.FirstName;
            user.LastName = updatedUserData.LastName;
            user.PhoneNumber = updatedUserData.PhoneNumber;

            if (DateTime.TryParse(updatedUserData.DateOfBirth, out DateTime dateOfBirth))
            {
                user.DateOfBirth = dateOfBirth;
            }
            else
            {
                return "Invalid date format for DateOfBirth.";
            }

            try
            {
                _context.SaveChanges();
                return "User information updated successfully.";
            }
            catch (Exception ex)
            {
                return "Error updating user information: " + ex.Message;
            }
        }

        public string SaveProfilePicture(int userId, byte[] imageData)
        {
            var user = _context.Users.Find(userId);
            if (user == null)
            {
                return "User not found.";
            }

            try
            {
                string uploadsFolder = @"FolderPathToUploadTheProfilePictures";

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                if (!string.IsNullOrEmpty(user.ProfilePictureUrl))
                {
                    string oldFilePath = Path.Combine(uploadsFolder, Path.GetFileName(user.ProfilePictureUrl));
                    if (File.Exists(oldFilePath))
                    {
                        File.Delete(oldFilePath);
                    }
                }

                string uniqueFileName = Guid.NewGuid().ToString() + ".png";
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                File.WriteAllBytes(filePath, imageData);

                user.ProfilePictureUrl = "/assets/profile_pictures/" + uniqueFileName;
                _context.SaveChanges();

                return "Profile picture saved successfully.";
            }
            catch (Exception ex)
            {
                return "Error saving profile picture: " + ex.Message;
            }
        }

        #region HELPERS
        private void CreateUser(UserDTO user, int roleId)
        {
            if (!DateTime.TryParse(user.DateOfBirth, out DateTime dateOfBirth))
            {
                throw new ArgumentException("Invalid date format for DateOfBirth.");
            }

            var newUser = new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Password = user.Password,
                DateOfBirth = dateOfBirth,
                CreatedDateTime = DateTime.Now,
                RoleId = roleId
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();
        }

        private void SendRegistrationEmail(string email, string firstName, string lastName)
        {
            string subject = "Thank You for Registering with Our Webshop!";
            string body = $"Dear {firstName} {lastName},\n\nThank you for showing interest in our webshop! Your decision to register with us means a lot to us.\n\nWe want to extend a warm welcome to you and express our gratitude for choosing us for your shopping needs. Our team is dedicated to providing you with an exceptional online shopping experience.\n\nPlease feel free to explore our wide range of products and services. If you have any questions or need assistance, don't hesitate to reach out to us. We're here to help!\n\nWe hope you find exactly what you're looking for and that your time spent on our platform is enjoyable and rewarding.\n\nOnce again, thank you for joining our community. We look forward to serving you and building a long-lasting relationship.\n\nBest regards,\nThe Skydive Store Team";
            var emailService = new EmailService();
            emailService.SendEmail(email, subject, body);
        }

        #endregion

    }
}
