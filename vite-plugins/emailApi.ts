import type { Plugin } from 'vite';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

export function emailApiPlugin(mailerSendKey: string | undefined): Plugin {
  return {
    name: 'email-api',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res, next) => {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Handle preflight
        if (req.method === 'OPTIONS') {
          res.writeHead(200);
          res.end();
          return;
        }

        // Only handle POST requests
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        try {
          // Read request body
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            try {
              const { name, email, message } = JSON.parse(body);

              if (!name || !email || !message) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Missing required fields' }));
                return;
              }

              // Check if API key is provided
              if (!mailerSendKey) {
                console.error('MAILERSEND_KEY not found in environment variables');
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Email service not configured' }));
                return;
              }

              const mailerSend = new MailerSend({
                apiKey: mailerSendKey,
              });

              const sentFrom = new Sender("noreply@test-86org8eyp7kgew13.mlsender.net", "Danny Fullstack Portfolio");
              const recipients = [
                new Recipient("dnunez22@gmail.com", "Danny Nunez")
              ];

              const emailParams = new EmailParams()
                .setFrom(sentFrom)
                .setTo(recipients)
                .setReplyTo(new Recipient(email, name))
                .setSubject(`New Contact Form Submission from ${name}`)
                .setHtml(`
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #f22e44;">New Contact Form Submission</h2>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                      <p><strong>Name:</strong> ${name}</p>
                      <p><strong>Email:</strong> ${email}</p>
                    </div>
                    <div style="margin-top: 20px;">
                      <h3>Message:</h3>
                      <p style="white-space: pre-wrap; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                    </div>
                  </div>
                `)
                .setText(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

              const response = await mailerSend.email.send(emailParams);
              
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, messageId: response.body.message_id }));
            } catch (error: any) {
              console.error('Error sending email:', error);
              
              // Extract error details from MailerSend SDK error
              let errorMessage = 'Failed to send email';
              let statusCode = 500;
              
              if (error.body) {
                // MailerSend SDK error structure
                errorMessage = error.body.message || errorMessage;
                if (error.body.errors) {
                  const errorDetails = Object.entries(error.body.errors)
                    .map(([key, value]: [string, any]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                    .join('; ');
                  errorMessage += ` (${errorDetails})`;
                }
                statusCode = error.statusCode || 500;
              } else if (error.message) {
                errorMessage = error.message;
              }
              
              res.writeHead(statusCode, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: errorMessage }));
            }
          });
        } catch (error: any) {
          console.error('Error parsing request:', error);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid request' }));
        }
      });
    }
  };
}

