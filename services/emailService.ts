// Email service that calls the backend API endpoint
// This avoids CORS issues by making the request to our own server

export const sendEmail = async (name: string, email: string, message: string) => {
  const apiUrl = '/api/send-email';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to send email' }));
    throw new Error(errorData.error || 'Failed to send email. Please try again later.');
  }

  const data = await response.json();
  return data;
};

