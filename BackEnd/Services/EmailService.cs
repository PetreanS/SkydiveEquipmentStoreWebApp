using MailKit.Net.Smtp;
using MimeKit;

public class EmailService
{
    public void SendEmail(string recipientEmail, string subject, string body)
    {
        try
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Skydive Online Store", "EmailAddressUsedToSendEmails"));
            message.To.Add(new MailboxAddress("", recipientEmail)); 
            message.Subject = subject;
            message.Body = new TextPart("plain")
            {
                Text = body
            };

            using (var client = new SmtpClient())
            {
                client.Connect("smtp-mail.outlook.com", 587, false);
                client.Authenticate("EmailAddressUsedToSendEmails", "EmailPassword"); 
                client.Send(message);
                client.Disconnect(true);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Failed to send email: " + ex.Message);
        }
    }
}
