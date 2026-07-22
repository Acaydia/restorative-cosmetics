import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

type FormType = "consultation" | "contact" | "booking" | "newsletter" | "testimonial" | "training";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  serviceOfInterest: string;
  message: string;
  images?: File[];
}

export function ConsultationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    serviceOfInterest: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Integrate with tRPC endpoint
      toast.success("Consultation request submitted! We'll be in touch soon.");
      setFormData({ fullName: "", email: "", phone: "", serviceOfInterest: "", message: "" });
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <Input
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(337) 252-6780"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email *</label>
        <Input
          required
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Service of Interest *</label>
        <Select value={formData.serviceOfInterest} onValueChange={(value) => setFormData({ ...formData, serviceOfInterest: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="scar-camouflage">Scar Camouflage</SelectItem>
            <SelectItem value="stretch-mark">Stretch Mark Camouflage</SelectItem>
            <SelectItem value="areola">Areola Restoration</SelectItem>
            <SelectItem value="vitiligo">Vitiligo Camouflage</SelectItem>
            <SelectItem value="scalp">Scalp Micropigmentation</SelectItem>
            <SelectItem value="training">Practitioner Training</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tell Us About Your Goals *</label>
        <Textarea
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Share as much or as little as you're comfortable with..."
          rows={5}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading} className="bg-gold-light hover:bg-gold-dark">
          {isLoading ? "Submitting..." : "Send Inquiry"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">We respond to every inquiry personally, typically within 1–2 business days.</p>
    </form>
  );
}

export function ContactForm() {
  const [formData, setFormData] = useState({ fullName: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      toast.success("Message sent! Thank you for reaching out.");
      setFormData({ fullName: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <Input required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Message *</label>
        <Textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} />
      </div>
      <Button type="submit" disabled={isLoading} className="bg-gold-light hover:bg-gold-dark">
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
      <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Button type="submit" disabled={isLoading} className="bg-gold-light hover:bg-gold-dark">
        Subscribe
      </Button>
    </form>
  );
}

export function TestimonialForm() {
  const [formData, setFormData] = useState({ fullName: "", email: "", service: "", testimonial: "", rating: "5" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      toast.success("Thank you for sharing your story!");
      setFormData({ fullName: "", email: "", service: "", testimonial: "", rating: "5" });
    } catch (error) {
      toast.error("Failed to submit testimonial. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <Input required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Service *</label>
        <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="scar-camouflage">Scar Camouflage</SelectItem>
            <SelectItem value="stretch-mark">Stretch Mark Camouflage</SelectItem>
            <SelectItem value="areola">Areola Restoration</SelectItem>
            <SelectItem value="vitiligo">Vitiligo Camouflage</SelectItem>
            <SelectItem value="scalp">Scalp Micropigmentation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Your Story *</label>
        <Textarea required value={formData.testimonial} onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })} rows={5} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
            <SelectItem value="4">⭐⭐⭐⭐ Very Good</SelectItem>
            <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={isLoading} className="bg-gold-light hover:bg-gold-dark">
        {isLoading ? "Submitting..." : "Share Your Story"}
      </Button>
    </form>
  );
}

export function TrainingForm() {
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", experience: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      toast.success("Training inquiry submitted! We'll be in touch soon.");
      setFormData({ fullName: "", email: "", phone: "", experience: "", message: "" });
    } catch (error) {
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <Input required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Phone *</label>
        <Input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Your Experience Level *</label>
        <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner - No experience</SelectItem>
            <SelectItem value="intermediate">Intermediate - Some tattooing experience</SelectItem>
            <SelectItem value="advanced">Advanced - Professional tattoo artist</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Tell Us About Your Interest *</label>
        <Textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} />
      </div>
      <Button type="submit" disabled={isLoading} className="bg-gold-light hover:bg-gold-dark">
        {isLoading ? "Submitting..." : "Request Training Info"}
      </Button>
    </form>
  );
}

export function BookingForm() {
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", service: "", preferredDate: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      toast.success("Booking request submitted! We'll confirm availability soon.");
      setFormData({ fullName: "", email: "", phone: "", service: "", preferredDate: "", message: "" });
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <Input required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Phone *</label>
        <Input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Service *</label>
        <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="scar-camouflage">Scar Camouflage</SelectItem>
            <SelectItem value="stretch-mark">Stretch Mark Camouflage</SelectItem>
            <SelectItem value="areola">Areola Restoration</SelectItem>
            <SelectItem value="vitiligo">Vitiligo Camouflage</SelectItem>
            <SelectItem value="scalp">Scalp Micropigmentation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Preferred Date</label>
        <Input type="date" value={formData.preferredDate} onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Additional Notes</label>
        <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} />
      </div>
      <Button type="submit" disabled={isLoading} className="bg-gold-light hover:bg-gold-dark">
        {isLoading ? "Submitting..." : "Request Booking"}
      </Button>
    </form>
  );
}
