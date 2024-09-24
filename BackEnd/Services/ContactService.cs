using SkydiveEquipmentStore.Data;
using SkydiveEquipmentStore.DTO;

namespace SkydiveEquipmentStore.Services
{
    public class ContactService
    {
        private readonly ApplicationDbContext _context;


        public ContactService(ApplicationDbContext context)
        {
            _context = context;
        }

        public void SendContactEmailToAdmins(ContactDTO contact)
        {
            string subject = "New Contact Request Received";

            string body = $@"
        New Contact Request Received:

        Sender's Details:
        - Full Name: {contact.Name}
        - Email Address: {contact.Email}
        - Phone Number: {contact.PhoneNumber}

        Subject: {contact.Subject}
        Message: {contact.Message}

        ---
        This email is a notification of a new contact request from a user. Please respond promptly.
    ";

            var emailService = new EmailService();
            var email = "EmailAddressUsedToSendEmails";
            emailService.SendEmail(email, subject, body);
        }



        public void SendConfirmationEmailToUser(string email, string name)
        {
            string subject = "Thank You for Contacting Us!";
            string body = $@"
        Dear {name},

        Thank you for contacting us! Your message has been received, and we appreciate your interest in our services.

        Our team is currently reviewing your request and will get back to you as soon as possible. 
        We strive to provide the best possible assistance to all our customers, and we assure you 
        that your inquiry is important to us.

        In the meantime, feel free to explore more about our products and services on our website.

        We appreciate your patience and understanding.

        Best regards,
        The Skydive Online Store Team
    ";

            var emailService = new EmailService();
            emailService.SendEmail(email, subject, body);
        }


    }
}
