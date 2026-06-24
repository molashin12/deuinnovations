import React, { useState } from "react";
import { useLanguage } from "../LanguageContext";
import { submitBrief } from "../firebase";
import { Check, Send } from "lucide-react";

export const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const servicesOptions = [
    "Software Engineering",
    "AI Automation",
    "Product Architecture",
    "Interface Design",
    "System Integrations"
  ];

  const handleServiceToggle = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !description) {
      alert("Please fill in Name, Email, and Project Description.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      await submitBrief({
        name,
        email,
        company,
        services: selectedServices,
        description,
        budget
      });
      setStatus("success");
      // Reset form
      setName("");
      setEmail("");
      setCompany("");
      setDescription("");
      setBudget("");
      setSelectedServices([]);
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="deu-contact-panel p-6 md:p-8 flex flex-col gap-6 w-full">
      <h3 className="deu-h3 text-[var(--deu-primary)] tracking-wide font-semibold">
        {t.contact.formTitle}
      </h3>

      {status === "success" && (
        <div className="p-4 rounded-lg bg-[var(--deu-primary-soft)] border border-[var(--deu-primary)] text-[var(--deu-ink)] text-sm leading-relaxed animate-fade-in">
          {t.contact.formSuccess}
        </div>
      )}

      {status === "error" && (
        <div className="p-4 rounded-lg bg-[var(--deu-flag-red-soft)] border border-[var(--deu-flag-red)] text-[var(--deu-ink)] text-sm leading-relaxed">
          {t.contact.formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono tracking-wider text-[var(--deu-ink-3)] uppercase">
              {t.contact.formName} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className="w-full bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded-md px-4 py-2.5 text-sm text-[var(--deu-ink)] focus:outline-none focus:border-[var(--deu-primary)] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono tracking-wider text-[var(--deu-ink-3)] uppercase">
              {t.contact.formEmail} *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="w-full bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded-md px-4 py-2.5 text-sm text-[var(--deu-ink)] focus:outline-none focus:border-[var(--deu-primary)] transition-colors"
            />
          </div>
        </div>

        {/* Company Row */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono tracking-wider text-[var(--deu-ink-3)] uppercase">
            {t.contact.formCompany}
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={isSubmitting}
            className="w-full bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded-md px-4 py-2.5 text-sm text-[var(--deu-ink)] focus:outline-none focus:border-[var(--deu-primary)] transition-colors"
          />
        </div>

        {/* Services Needed Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono tracking-wider text-[var(--deu-ink-3)] uppercase mb-1">
            {t.contact.formServices}
          </label>
          <div className="flex flex-wrap gap-2">
            {servicesOptions.map((service) => {
              const isSelected = selectedServices.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => handleServiceToggle(service)}
                  disabled={isSubmitting}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[var(--deu-primary-soft)] border-[var(--deu-primary)] text-[var(--deu-primary-strong)]"
                      : "bg-[var(--deu-surface-2)] border-[var(--deu-line)] text-[var(--deu-ink-2)] hover:border-[var(--deu-line-strong)]"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{service}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Description */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono tracking-wider text-[var(--deu-ink-3)] uppercase">
            {t.contact.formDescription} *
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            className="w-full bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded-md px-4 py-2.5 text-sm text-[var(--deu-ink)] leading-relaxed focus:outline-none focus:border-[var(--deu-primary)] transition-colors resize-y"
          />
        </div>

        {/* Target Budget Choices */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono tracking-wider text-[var(--deu-ink-3)] uppercase mb-1">
            {t.contact.formBudget}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {t.contact.budgetOptions.map((option, idx) => {
              const value = budgetOptionsValues[idx];
              const isSelected = budget === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setBudget(value)}
                  disabled={isSubmitting}
                  className={`px-3 py-2 rounded-md text-xs font-medium border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-[var(--deu-primary-soft)] border-[var(--deu-primary)] text-[var(--deu-primary-strong)]"
                      : "bg-[var(--deu-surface-2)] border-[var(--deu-line)] text-[var(--deu-ink-2)] hover:border-[var(--deu-line-strong)]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Action */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full flex items-center justify-center gap-2 py-3 px-5 border border-[var(--deu-primary)] rounded-full bg-[var(--deu-primary)] text-[var(--deu-primary-ink)] font-semibold text-sm cursor-pointer shadow-md hover:bg-[var(--deu-primary-strong)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <span>{isSubmitting ? t.contact.formSubmitting : t.contact.formSubmit}</span>
          {!isSubmitting && <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
};

// Fixed internal representation values for budgets
const budgetOptionsValues = [
  "under_15k",
  "15k_40k",
  "40k_100k",
  "above_100k"
];
