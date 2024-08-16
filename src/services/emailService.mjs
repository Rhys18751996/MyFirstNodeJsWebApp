// a c# example

// public async Task<bool> SendEmailAsync(EmailDto request)
//         {
//             var email = new MimeMessage();
//             email.From.Add(MailboxAddress.Parse(_config.GetSection("SmtpConfig").GetSection("Username").Value));
//             email.To.Add(MailboxAddress.Parse(request.To));
//             email.Subject = request.Subject;
//             email.Body = new TextPart(TextFormat.Html) { Text = request.Body };

//             try
//             {
//                 using var smtp = new SmtpClient();

//                 string host = _config.GetSection("SmtpConfig").GetSection("Host").Value;
//                 int port = Convert.ToInt32(_config.GetSection("SmtpConfig").GetSection("Port").Value);
//                 // port 465(implicit TLS) or 587(StartTls)
//                 smtp.Connect(host, port, SecureSocketOptions.StartTls);

//                 smtp.Authenticate(_config.GetSection("SmtpConfig").GetSection("Username").Value, _config.GetSection("SmtpConfig").GetSection("Password").Value);
//                 var result = smtp.Send(email);
//                 smtp.Disconnect(true);

//                 if (result.Contains("Accepted") || result.Contains("OK"))
//                     return true;
//             }
//             catch(Exception ex)
//             {
//                 return false;
//             }
//             return false;
//         }