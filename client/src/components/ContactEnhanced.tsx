import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

/**
 * Enhanced Contact Section with Image Upload
 * 
 * Design Notes:
 * - Simple, warm contact form with clear hierarchy
 * - Image upload for scar photos with preview
 * - Secure file handling via backend
 * - Emphasizes personal connection and consultation
 * - Soft gold accents on form elements
 * - Reassuring copy about the consultation process
 */

interface UploadedImage {
  file: File;
  preview: string;
  uploading?: boolean;
  error?: string;
}

export default function ContactEnhanced() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitConsultation = trpc.consultation.submit.useMutation({
    onSuccess: () => {
      toast.success("Thank you! We'll be in touch soon to discuss your journey.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setUploadedImages([]);
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit consultation. Please try again.");
      setIsSubmitting(false);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported image format (JPEG, PNG, WebP only)`);
        return;
      }

      // Validate file size
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = event.target?.result as string;
        setUploadedImages((prev) => [
          ...prev,
          { file, preview },
        ]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit form with images
      await submitConsultation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
        images: uploadedImages.map((img) => img.file),
      });
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 bg-secondary/5">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <div className="accent-line mb-4"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
              Let's Connect
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground font-light">
              Every journey begins with a conversation. Share your story and photos, and let's explore 
              how we can support your restoration and healing.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Name <span className="text-primary">*</span>
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                required
                className="border-border/50 focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address <span className="text-primary">*</span>
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                required
                className="border-border/50 focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className="border-border/50 focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tell Me Your Story <span className="text-primary">*</span>
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share what brings you here, your goals, and any questions you have..."
                rows={5}
                required
                className="border-border/50 focus:border-primary focus:ring-primary resize-none"
              />
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Share Photos of Your Scar (Optional)
              </label>
              <p className="text-xs text-muted-foreground mb-4">
                Upload clear photos to help with preliminary review. Supported formats: JPEG, PNG, WebP (max 5MB each)
              </p>

              {/* Upload Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-border/40 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/30"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageSelect}
                  className="hidden"
                  aria-label="Upload scar photos"
                />
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPEG, PNG, or WebP up to 5MB
                </p>
              </div>

              {/* Image Previews */}
              {uploadedImages.length > 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-sm font-medium text-foreground">
                    {uploadedImages.length} photo{uploadedImages.length !== 1 ? "s" : ""} selected
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-border/50"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          {img.uploading && (
                            <div className="animate-spin">
                              <Upload className="w-4 h-4 text-white" />
                            </div>
                          )}
                          {img.error && (
                            <AlertCircle className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || submitConsultation.isPending}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base py-6"
            >
              {isSubmitting || submitConsultation.isPending ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Submitting...
                </>
              ) : (
                "Begin My Journey"
              )}
            </Button>

            {/* Reassurance text */}
            <p className="text-center text-xs sm:text-sm text-muted-foreground font-light">
              I'll respond within 24 hours to discuss your needs and schedule a consultation.
              Your photos are secure and confidential.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
