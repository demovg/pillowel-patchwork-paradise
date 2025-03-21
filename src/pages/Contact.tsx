
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Contact Us</h1>
          <p className="text-pillowel-600 max-w-2xl mb-12">
            We'd love to hear from you. Whether you have a question about our products, need assistance with an order, 
            or want to learn more about our brand, our team is here to help.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg border border-gray-100">
                <h2 className="text-xl font-medium mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Select value={formData.subject} onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product-question">Product Question</SelectItem>
                        <SelectItem value="order-status">Order Status</SelectItem>
                        <SelectItem value="returns">Returns & Exchanges</SelectItem>
                        <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
            
            {/* Contact Info */}
            <div>
              <div className="bg-gray-50 p-8 rounded-lg mb-8">
                <h2 className="text-xl font-medium mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex">
                    <Mail className="h-5 w-5 mr-3 text-pillowel-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium mb-1">Email</h3>
                      <a href="mailto:hello@pillowel.com" className="text-pillowel-600 hover:text-black transition-colors">
                        hello@pillowel.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Phone className="h-5 w-5 mr-3 text-pillowel-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium mb-1">Phone</h3>
                      <a href="tel:+1234567890" className="text-pillowel-600 hover:text-black transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <MapPin className="h-5 w-5 mr-3 text-pillowel-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium mb-1">Flagship Store</h3>
                      <p className="text-pillowel-600">
                        123 Fashion Avenue<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Clock className="h-5 w-5 mr-3 text-pillowel-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium mb-1">Hours</h3>
                      <p className="text-pillowel-600">
                        Monday - Friday: 10am - 9pm<br />
                        Saturday: 10am - 8pm<br />
                        Sunday: 11am - 6pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map placeholder - would use actual map integration in production */}
              <div className="aspect-square bg-gray-200 rounded-lg relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=3333&auto=format&fit=crop" 
                  alt="Store location map" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm text-center">
                  <p className="text-sm font-medium">Pillowel Flagship Store</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-24">
            <h2 className="text-2xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-100 rounded-lg p-6">
                <h3 className="font-medium mb-3">What are your shipping options?</h3>
                <p className="text-pillowel-600 text-sm">
                  We offer standard shipping (3-5 business days), express shipping (1-2 business days), 
                  and international shipping (7-14 business days). Free standard shipping is available for 
                  orders over $100.
                </p>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg p-6">
                <h3 className="font-medium mb-3">How do I return or exchange an item?</h3>
                <p className="text-pillowel-600 text-sm">
                  Returns and exchanges are accepted within 30 days of purchase. Items must be unworn with 
                  original tags attached. Visit our returns page for more details and to initiate a return.
                </p>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg p-6">
                <h3 className="font-medium mb-3">Do you offer gift wrapping?</h3>
                <p className="text-pillowel-600 text-sm">
                  Yes, we offer complimentary gift wrapping for all orders. Simply select the gift wrap 
                  option during checkout and include a personalized message if desired.
                </p>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg p-6">
                <h3 className="font-medium mb-3">How can I track my order?</h3>
                <p className="text-pillowel-600 text-sm">
                  Once your order ships, you'll receive a confirmation email with tracking information. 
                  You can also track your order by logging into your account or contacting our customer service team.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <a href="/faq" className="text-sm font-medium underline">
                View all FAQs
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
