"use client";

import Checkbox from "@/app/component/Checkbox";
import FormFieldError from "@/app/component/FormFieldError";
import Input from "@/app/component/Input";
import { ProfileData } from "@/app/types";
import { useState } from "react";
import TickIcon from "@/app/assets/tick.svg";
import { ProfileSchema } from "../../schema";
import Textarea from "@/app/component/Textarea";
import Button from "@/app/component/Button";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import { inputStyles } from "@/app/component/Input/Input";

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
      <div className="flex flex-col items-center gap-4 mt-8 min-h-[400px]">
        <p className="text-gray-700">Submitting your request...</p>
        <div className="loader" />
      </div>
    );
  }

  if (formError) {
    return (
      <div className="text-red-600 text-center mt-4 min-h-[400px]">
        <p>{formError}</p>
      </div>
    );
  }

  if (successSubmission) {
    return (
      <div className="flex flex-col items-start gap-[8px] min-h-[400px]">
        <div className="flex items-center gap-[4px] mt-[28px]">
          <TickIcon />
          <p className="text-purple-100 text-[20px] font-bold">
            Thanks for reaching out!
          </p>
        </div>
        <p className="text-pythia-black text-[16px]">
          We’ll be in touch soon to schedule your Pythia demo.
        </p>
      </div>
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
      <div className="flex flex-col gap-[2px] w-full">
        <Input
          type="text"
          placeholder="First name"
          value={formData.first_name}
          onChange={onFieldChange("first_name")}
        />
        {errors.first_name && <FormFieldError error={errors.first_name} />}
      </div>
      <div className="flex flex-col gap-[2px] w-full">
        <Input
          type="text"
          placeholder="Last name"
          value={formData.last_name}
          onChange={onFieldChange("last_name")}
        />
        {errors.last_name && <FormFieldError error={errors.last_name} />}
      </div>
      <div className="flex flex-col gap-[2px] w-full">
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={onFieldChange("email")}
        />
        {errors.email && <FormFieldError error={errors.email} />}
      </div>

      <div className="flex flex-col gap-[2px] w-full">
        <PhoneInput
          className={`${inputStyles}`}
          placeholder="Enter phone number"
          defaultCountry="US"
          value={formData.phone_number}
          onChange={(value) => setFormData((prev) => ({ ...prev, phone_number: value ?? '' }))} />
        {errors.email && <FormFieldError error={errors.phone_number} />}
      </div>

      <div className="flex flex-col gap-[2px] w-full">
        <Input
          type="text"
          placeholder="Store name"
          value={formData.store_name}
          onChange={onFieldChange("store_name")}
        />
        {errors.store_name && <FormFieldError error={errors.store_name} />}
      </div>
      <div className="flex flex-col gap-[2px] w-full">
        <Input
          type="number"
          placeholder="Number of stores"
          value={formData.number_of_stores ?? ""}
          onChange={onFieldChange("number_of_stores")}
          error={!!errors.number_of_stores}
        />
        {errors.number_of_stores && (
          <FormFieldError error={errors.number_of_stores} />
        )}
      </div>
      <div className="flex flex-col gap-[2px] w-full">
        <Input
          type="text"
          placeholder="Type of industry"
          value={formData.type_of_industry}
          onChange={onFieldChange("type_of_industry")}
        />
        {errors.type_of_industry && (
          // <span className="text-red-600 text-[12px]">
          //   {errors.type_of_industry}
          // </span>
          <FormFieldError error={errors.type_of_industry} />
        )}
      </div>
      {!hiddenFields.message && (
        <div className="flex flex-col gap-[2px] w-full">
          <Textarea
            placeholder="Message"
            rows={4}
            className="resize-none"
            onChange={onFieldChange("message")}
            value={formData.message}
          />
          {errors.message && <FormFieldError error={errors.message} />}
        </div>
      )}
      <div className="flex flex-col gap-[2px] w-full">
        <div className="py-[10px]">
          <Checkbox
            id="user-agreement"
            checked={formData.emails_accepted}
            label="I agree to receive emails from Pythia related to the demo, product updates, and relevant content."
            onChange={onFieldChange("emails_accepted")}
          />
        </div>
        {errors.emails_accepted && (
          <FormFieldError error={errors.emails_accepted} />
        )}
      </div>
      <Button
        type="submit"
        className={submitClassName}
        disabled={!formData.emails_accepted || isSubmitting}
      >
        {submitText}
      </Button>
    </form>
  );
}

export default PythiaForm;
