import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Our team will respond within 24 hours",
    value: "support@swiftride.com",
    action: "mailto:support@swiftride.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Available 24/7 for urgent matters",
    value: "1-800-SWIFT",
    action: "tel:1800794384",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our support team",
    value: "Start a conversation",
    action: "#",
  },
];

const faqs = [
  {
    question: "How do I report a lost item?",
    answer: "You can report lost items through the app under Trip History > Select Trip > Report Lost Item. Our support team will connect you with your driver.",
  },
  {
    question: "How do I become a driver?",
    answer: "Sign up through our driver portal, submit your documents (license, vehicle registration, insurance), and complete our safety training.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major credit/debit cards, digital wallets (Apple Pay, Google Pay), and cash in select cities.",
  },
  {
    question: "How is the fare calculated?",
    answer: "Fares are calculated based on distance, time, demand, and your chosen ride type. You'll always see the estimated fare before confirming.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a question or need help? We're here for you 24/7. Reach out through any channel that works for you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="p-6 rounded-2xl glass hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 text-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <method.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                <p className="text-primary font-medium">{method.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Form */}
            <div className="glass-strong rounded-2xl p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12 animate-scale-in">
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-success" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We've received your message and will respond within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Info & FAQs */}
            <div className="space-y-8">
              {/* Office Info */}
              <div className="p-6 rounded-2xl glass">
                <h3 className="font-display font-semibold text-foreground mb-4">Headquarters</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-foreground">123 Transport Avenue</p>
                      <p className="text-muted-foreground">San Francisco, CA 94102</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <p className="text-muted-foreground">Support available 24/7</p>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="group p-4 rounded-xl bg-secondary/50 border border-border"
                    >
                      <summary className="font-medium text-foreground cursor-pointer list-none flex items-center justify-between">
                        {faq.question}
                        <span className="text-primary transition-transform group-open:rotate-180">
                          ▼
                        </span>
                      </summary>
                      <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
