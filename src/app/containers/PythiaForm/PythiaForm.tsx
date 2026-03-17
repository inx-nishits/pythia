"use client";

import Checkbox from "@/app/component/Checkbox";
import FormFieldError from "@/app/component/FormFieldError";
import Input from "@/app/component/Input";
import { ProfileData } from "@/app/types";
import { useState } from "react";
import { ProfileSchema } from "../../schema";

import Button from "@/app/component/Button";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { inputStyles } from "@/app/component/Input/Input";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, CheckCircle2, Loader2, Phone } from "lucide-react";

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
    emails_accepted: true,
  };

  const [formData, setFormData] = useState<ProfileData>(defaultProfileData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successSubmission, setSuccessSubmission] = useState(false);

  const onFieldChange =
    (field: keyof ProfileData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value;

        if (field === "emails_accepted") {
          const target = e.target as HTMLInputElement;
          value = target.checked;
        } else if (field === "number_of_stores") {
          value = e.target.value === "" ? 0 : Number(e.target.value);
        } else {
          value = e.target.value;
        }

        setFormData((prev) => ({ ...prev, [field]: value }));
      };

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
          <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-brand-teal animate-spin" />
          <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-brand-teal animate-pulse" />
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
        className="flex flex-col items-center justify-center p-8 bg-brand-teal/5 border border-brand-teal/20 rounded-[32px] min-h-[400px] text-center"
      >
        <div className="w-20 h-20 rounded-full bg-brand-teal flex items-center justify-center mb-6 shadow-xl shadow-brand-teal/20">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-extrabold text-[#0F172A] mb-3 tracking-tight">
          Thanks for reaching out!
        </h3>
        <p className="text-slate-600 font-medium leading-relaxed max-w-[300px]">
          Our intelligence team will be in touch soon to schedule your Pythia demo.
        </p>
        <Button 
          onClick={() => setSuccessSubmission(false)}
          className="mt-8 bg-transparent border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-full px-8"
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      className={formClassName}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="flex flex-col gap-1 w-full relative">
          <Input
            type="text"
            placeholder="First name"
            icon={<User className="w-4 h-4" />}
            value={formData.first_name}
            onChange={onFieldChange("first_name")}
            error={!!errors.first_name}
          />
          <AnimatePresence>
            {errors.first_name && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <FormFieldError error={errors.first_name} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-1 w-full relative">
          <Input
            type="text"
            placeholder="Last name"
            icon={<User className="w-4 h-4" />}
            value={formData.last_name}
            onChange={onFieldChange("last_name")}
            error={!!errors.last_name}
          />
          <AnimatePresence>
            {errors.last_name && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <FormFieldError error={errors.last_name} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Input
          type="email"
          placeholder="Business Email"
          icon={<Mail className="w-4 h-4" />}
          value={formData.email}
          onChange={onFieldChange("email")}
          error={!!errors.email}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <FormFieldError error={errors.email} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <div className="relative group">
            <div className="absolute left-[16px] top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-teal transition-colors duration-300 z-10 pointer-events-none">
              <Phone className="w-4 h-4" />
            </div>
            <PhoneInput
              className={`${inputStyles} pl-[46px] group-hover:border-slate-300 transition-all [&>input]:bg-transparent [&>input]:border-none [&>input]:outline-none [&>input]:w-full`}
              placeholder="Phone number (optional)"
              defaultCountry="US"
              value={formData.phone_number}
              onChange={(value) => setFormData((prev) => ({ ...prev, phone_number: value ?? '' }))} 
            />
        </div>
        <AnimatePresence>
          {errors.phone_number && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <FormFieldError error={errors.phone_number} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>



      <div className="flex flex-col gap-1 w-full pt-2">
        <div className="px-0.5">
          <Checkbox
            id="user-agreement"
            checked={formData.emails_accepted}
            label="I agree to receive communications from Pythia."
            onChange={onFieldChange("emails_accepted")}
          />
        </div>
        <AnimatePresence>
          {errors.emails_accepted && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <FormFieldError error={errors.emails_accepted} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-2 w-full pt-2">
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full">
          <Button
            type="submit"
            className={`${submitClassName} !rounded-2xl bg-[#0F172A] hover:bg-slate-800 shadow-lg shadow-[#0F172A]/18 py-4 text-[16px] font-semibold w-full`}
            disabled={!formData.emails_accepted || isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : submitText}
          </Button>
        </motion.div>
        {formError && (
          <p className="text-sm text-red-500 font-medium" role="alert">
            {formError}
          </p>
        )}
      </div>
    </form>
  );
}

export default PythiaForm;
