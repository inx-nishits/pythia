"use client";

import Checkbox from "@/app/component/Checkbox";
import FormFieldError from "@/app/component/FormFieldError";
import Input from "@/app/component/Input";
import { ProfileData } from "@/app/types";
import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitProfile } from "@/app/actions/submitProfile";

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

function SubmitButton({
  submitText,
  submitClassName,
  disabled,
}: {
  submitText: string;
  submitClassName?: string;
  disabled: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={`${submitClassName} !rounded-2xl bg-[#0F172A] hover:bg-slate-800 shadow-lg shadow-[#0F172A]/18 py-4 text-[16px] font-semibold w-full`}
      disabled={disabled || pending}
    >
      {pending ? <Loader2 className="animate-spin" /> : submitText}
    </Button>
  );
}

function PythiaForm({
  submitText,
  submitClassName,
  formClassName,
  requestedDemo,
}: PythiaFormProps) {
  const [state, formAction] = useActionState(submitProfile, {
    status: "idle",
    message: "",
    fieldErrors: {},
  });
  const [phoneValue, setPhoneValue] = useState("");
  const [forceReset, setForceReset] = useState(false);

  if (state.status === "success" && !forceReset) {
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
          Our intelligence team will be in touch soon to schedule your Pythia
          demo.
        </p>
        <Button
          onClick={() => setForceReset(true)}
          className="mt-8 bg-transparent border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-full px-8"
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form className={formClassName} action={formAction}>
      <input type="hidden" name="requestedDemo" value={String(requestedDemo)} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="flex flex-col gap-1 w-full relative">
          <Input
            type="text"
            placeholder="First name"
            icon={<User className="w-4 h-4" />}
            name="first_name"
            error={!!state.fieldErrors?.first_name}
          />
          <AnimatePresence>
            {state.fieldErrors?.first_name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <FormFieldError error={state.fieldErrors.first_name} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-1 w-full relative">
          <Input
            type="text"
            placeholder="Last name"
            icon={<User className="w-4 h-4" />}
            name="last_name"
            error={!!state.fieldErrors?.last_name}
          />
          <AnimatePresence>
            {state.fieldErrors?.last_name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <FormFieldError error={state.fieldErrors.last_name} />
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
          name="email"
          error={!!state.fieldErrors?.email}
        />
        <AnimatePresence>
          {state.fieldErrors?.email && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <FormFieldError error={state.fieldErrors.email} />
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
            value={phoneValue}
            onChange={(value) => setPhoneValue(value ?? "")}
          />
          <input type="hidden" name="phone_number" value={phoneValue ?? ""} />
        </div>
        <AnimatePresence>
          {state.fieldErrors?.phone_number && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <FormFieldError error={state.fieldErrors.phone_number} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>



      <div className="flex flex-col gap-1 w-full pt-2">
        <div className="px-0.5">
          <input type="hidden" name="emails_accepted" value="false" />
          <Checkbox
            id="user-agreement"
            defaultChecked={true}
            label="I agree to receive communications from Pythia."
            name="emails_accepted"
            value="true"
          />
        </div>
        <AnimatePresence>
          {state.fieldErrors?.emails_accepted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <FormFieldError error={state.fieldErrors.emails_accepted} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-2 w-full pt-2">
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full"
        >
          <SubmitButton
            submitText={submitText}
            submitClassName={submitClassName}
            disabled={false}
          />
        </motion.div>
        {state.status === "error" && (
          <p className="text-sm text-red-500 font-medium" role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

export default PythiaForm;
