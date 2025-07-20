import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send message to Telegram
      const telegramMessage = `
🔔 New Contact Form Submission

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📝 Subject: ${formData.subject}

💬 Message:
${formData.message}

🕒 Time: ${new Date().toLocaleString()}
      `;

      const telegramResponse = await fetch(`https://api.telegram.org/bot7598441160:AAEsue03Xh7RpYd2x8mLM1EErSIBGx_WPNc/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '-1002128348085',
          text: telegramMessage,
          parse_mode: 'HTML'
        })
      });

      if (telegramResponse.ok) {
        // Clear form and show success
        setFormData({ name: '', email: '', subject: '', message: '' });
        alert('Message sent successfully! We\'ll get back to you soon.');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again or contact us directly.');
    }
    
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Get in touch with our team. We're here to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Get in Touch</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">admin@orbittechnology.tech</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+91 9519253125</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">
                      ORBIT TECHNOLOGY<br />
                      NO.2, RAGAVENDRA NAGAR, KURUMBAPET<br />
                      Puducherry, Puducherry, 605009<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Business Hours</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM IST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Business Information</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Legal Name:</strong> ORBIT TECHNOLOGY</p>
                    <p><strong>GSTIN:</strong> 34AAFFO2987H1Z0</p>
                    <p><strong>Registration:</strong> Puducherry, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Send us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                    />
                  </div>

                  <Input
                    label="Subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                  />

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <Button type="submit" loading={loading} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">How do I deploy my first application?</h3>
                  <p className="text-gray-600 text-sm">
                    Simply sign up for an account, connect your GitHub repository, and follow our 
                    step-by-step deployment guide.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-600 text-sm">
                    We accept all major credit cards including Visa, MasterCard, and American Express.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Can I get a refund?</h3>
                  <p className="text-gray-600 text-sm">
                    We offer refunds within 30 days of purchase. Contact our support team for assistance.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Do you offer technical support?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes, we provide 24/7 technical support for all paid plans. Free plans include 
                    community support.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};