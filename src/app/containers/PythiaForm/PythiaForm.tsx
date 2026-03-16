"use client";

import Checkbox from "@/app/component/Checkbox";
import FormFieldError from "@/app/component/FormFieldError";
import Input, { inputStyles } from "@/app/component/Input/Input";
import { ProfileData } from "@/app/types";
import { useState } from "react";
import { ProfileSchema } from "../../schema";
import Textarea from "@/app/component/Textarea/Textarea";
import Button from "@/app/component/Button/Button";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Building2, Hash, Globe, CheckCircle2, Loader2, Phone, ArrowRight, ArrowLeft } from "lucide-react";

interface PythiaFormProps {
  hiddenFields: Partial<Record<keyof ProfileData, boolean>>;
  submitText: string;
  submitClassName?: string;
  formClassName: string;
  requestedDemo: boolean;
}

function PythiaForm({
  hiddenFields,
  submitText,
  submitClassName,
  formClassName,
  requestedDemo,
}: PythiaFormProps) {
  const defaultProfileData: ProfileData = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    store_name: "",
    number_of_stores: null,
    type_of_industry: "",
    message: "",
    demo_requested: false,
    emails_accepted: false,
  };

  const [formData, setFormData] = useState<ProfileData>(defaultProfileData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successSubmission, setSuccessSubmission] = useState(false);
  const [step, setStep] = useState(0);

  const onFieldChange =
    (field: keyof ProfileData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value;

        if (field === "emails_accepted") {
          const target = e.target as HTMLInputElement;
          value = target.checked;
        } else if (field === "number_of_stores") {
          value = e.target.value === "" ? null : Number(e.target.value);
        } else {
          value = e.target.value;
        }

        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when field changes
        if (errors[field]) {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      };

  const nextStep = () => {
    // Basic local validation per step
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!formData.first_name) newErrors.first_name = "Required";
      if (!formData.last_name) newErrors.last_name = "Required";
      if (!formData.email) newErrors.email = "Required";
    } else if (step === 1) {
      if (!formData.store_name) newErrors.store_name = "Required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setFormError(null);
    setSuccessSubmission(false);

    const result = ProfileSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [key, val] of Object.entries(
        result.error.flatten().fieldErrors
      )) {
        if (val && val.length > 0) fieldErrors[key] = val[0];
      }
      setErrors(fieldErrors);
      // If there are errors, we might need to jump back to a step, 
      // but usually the local 'nextStep' catch most.
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/create-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          requestedDemo,
          message: !!hiddenFields.message ? "" : result.data.message,
        }),
      });

      if (res.ok) {
        setFormData(defaultProfileData);
        setErrors({});
        setFormError(null);
        setSuccessSubmission(true);
        setStep(0);
      } else {
        setSuccessSubmission(false);
        setFormError("Failed to submit. Please try again later.");
      }
    } catch {
      setFormError("Failed to submit. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 mt-8 min-h-[400px]">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-emerald-500 animate-spin" />
          <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-emerald-500 animate-pulse" />
        </div>
        <p className="text-slate-500 font-bold tracking-tight animate-pulse text-lg">Processing your request...</p>
      </div>
    );
  }

  if (successSubmission) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-8 bg-emerald-50 border border-emerald-100 rounded-[40px] min-h-[400px] text-center"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Success!
        </h3>
        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-[320px]">
          Our intelligence team will be in touch soon to schedule your Pythia demo.
        </p>
        <Button 
          onClick={() => setSuccessSubmission(false)}
          className="mt-10 bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 rounded-2xl px-8 h-12"
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  const stepsCount = 3;
  const progress = ((step + 1) / stepsCount) * 100;

  return (
    <div className="w-full">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8 gap-4 px-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-100 relative">
            <motion.div 
              initial={false}
              animate={{ 
                width: step >= i ? "100%" : "0%",
                backgroundColor: step === i ? "#10b981" : step > i ? "#0f172a" : "#f1f5f9"
              }}
              className="h-full"
            />
          </div>
        ))}
      </div>

      <form
        className={formClassName}
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 2) {
            nextStep();
          } else {
            onSubmit(e);
          }
        }}
      >
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1 w-full relative">
                  <Input
                    type="text"
                    placeholder="First name"
                    icon={<User size={18} />}
                    value={formData.first_name}
                    onChange={onFieldChange("first_name")}
                    error={!!errors.first_name}
                  />
                  {errors.first_name && <FormFieldError error={errors.first_name} />}
                </div>
                <div className="flex flex-col gap-1 w-full relative">
                  <Input
                    type="text"
                    placeholder="Last name"
                    icon={<User size={18} />}
                    value={formData.last_name}
                    onChange={onFieldChange("last_name")}
                    error={!!errors.last_name}
                  />
                  {errors.last_name && <FormFieldError error={errors.last_name} />}
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <Input
                  type="email"
                  placeholder="Business Email"
                  icon={<Mail size={18} />}
                  value={formData.email}
                  onChange={onFieldChange("email")}
                  error={!!errors.email}
                />
                {errors.email && <FormFieldError error={errors.email} />}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <div className="relative group">
                    <div className="absolute left-[16px] top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors duration-300 z-10 pointer-events-none border-r border-slate-100 pr-3">
                      <Phone size={18} />
                    </div>
                    <PhoneInput
                      className={`${inputStyles} pl-16 [&>input]:bg-transparent [&>input]:border-none [&>input]:outline-none [&>input]:w-full [&>input]:h-full [&>input]:font-medium`}
                      placeholder="Enter phone number"
                      defaultCountry="US"
                      value={formData.phone_number}
                      onChange={(value) => setFormData((prev) => ({ ...prev, phone_number: value ?? "" }))} 
                    />
                </div>
                {errors.phone_number && <FormFieldError error={errors.phone_number} />}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div className="flex flex-col gap-1 w-full">
                <Input
                  type="text"
                  placeholder="Store name"
                  icon={<Building2 size={18} />}
                  value={formData.store_name}
                  onChange={onFieldChange("store_name")}
                  error={!!errors.store_name}
                />
                {errors.store_name && <FormFieldError error={errors.store_name} />}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <Input
                  type="number"
                  placeholder="Number of stores"
                  icon={<Hash size={18} />}
                  value={formData.number_of_stores ?? ""}
                  onChange={onFieldChange("number_of_stores")}
                  error={!!errors.number_of_stores}
                />
                {errors.number_of_stores && <FormFieldError error={errors.number_of_stores} />}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <Input
                  type="text"
                  placeholder="Industry Type (e.g. Convenience Retail)"
                  icon={<Globe size={18} />}
                  value={formData.type_of_industry}
                  onChange={onFieldChange("type_of_industry")}
                  error={!!errors.type_of_industry}
                />
                {errors.type_of_industry && <FormFieldError error={errors.type_of_industry} />}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {!hiddenFields.message && (
                <div className="flex flex-col gap-1 w-full">
                  <Textarea
                    placeholder="Tell us about your operational challenges..."
                    rows={4}
                    onChange={onFieldChange("message")}
                    value={formData.message}
                    className={errors.message ? "border-red-400 bg-red-50/50" : ""}
                  />
                  {errors.message && <FormFieldError error={errors.message} />}
                </div>
              )}

              <div className="flex flex-col gap-1 w-full pt-2">
                <div className="px-0.5">
                  <Checkbox
                    id="user-agreement"
                    checked={formData.emails_accepted}
                    label="I agree to receive communications from Pythia."
                    onChange={onFieldChange("emails_accepted")}
                  />
                </div>
                {errors.emails_accepted && <FormFieldError error={errors.emails_accepted} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4 pt-6">
          {step > 0 && (
            <motion.button
              type="button"
              onClick={prevStep}
              whileHover={{ x: -4 }}
              className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-900 transition-all"
            >
              <ArrowLeft size={20} />
            </motion.button>
          )}
          
          <Button
            type={step === 2 ? "submit" : "button"}
            onClick={step < 2 ? nextStep : undefined}
            className={`${submitClassName} flex-1 h-14 rounded-2xl bg-slate-950 text-white border-none hover:bg-slate-900 shadow-xl shadow-slate-950/10 flex items-center justify-center gap-3`}
            disabled={step === 2 && (!formData.emails_accepted || isSubmitting)}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                {step === 2 ? submitText : "Continue"}
                {step < 2 && <ArrowRight size={18} />}
              </>
            )}
          </Button>
        </div>
        
        {formError && (
          <p className="text-sm text-red-500 font-bold mt-4" role="alert">
            {formError}
          </p>
        )}
      </form>
    </div>
  );
}

export default PythiaForm;
