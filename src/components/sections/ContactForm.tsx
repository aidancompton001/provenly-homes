"use client";

import { useState, type FormEvent } from "react";
import contactData from "@/data/contact-form.json";
import type { ContactFormData, ContactFormField, ContactFormSection } from "@/data/types";
import { FORMSUBMIT_ACTION, FORMSUBMIT_CONFIG } from "@/lib/formsubmit";

const data = contactData as ContactFormData;

type FormState = "idle" | "submitting" | "success" | "error";

function InputField({ field }: { field: ContactFormField }) {
  const baseClasses =
    "w-full border border-sand bg-white px-4 py-3 rounded-lg font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-copper focus:outline-none focus:ring-1 focus:ring-copper transition-colors duration-200";

  return (
    <div>
      <label
        htmlFor={field.id}
        className="block font-body text-sm font-medium text-charcoal mb-1.5"
      >
        {field.label}
        {field.required && <span className="text-copper ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          id={field.id}
          name={field.id}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          className={baseClasses}
        />
        {field.suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-sm text-charcoal-light pointer-events-none">
            {field.suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function RadioGroup({ field }: { field: ContactFormField }) {
  return (
    <fieldset>
      <legend className="block font-body text-sm font-medium text-charcoal mb-2">
        {field.label}
        {field.required && <span className="text-copper ml-0.5">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {field.options?.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer border border-sand rounded-lg px-4 py-2.5 font-body text-sm text-charcoal hover:border-copper/50 has-[:checked]:border-copper has-[:checked]:bg-copper/5 transition-colors duration-200"
          >
            <input
              type="radio"
              name={field.id}
              value={option.value}
              required={field.required}
              className="accent-copper w-4 h-4"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function CheckboxGroup({ field }: { field: ContactFormField }) {
  return (
    <fieldset>
      <legend className="block font-body text-sm font-medium text-charcoal mb-2">
        {field.label}
        {field.required && <span className="text-copper ml-0.5">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {field.options?.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer border border-sand rounded-lg px-4 py-2.5 font-body text-sm text-charcoal hover:border-copper/50 has-[:checked]:border-copper has-[:checked]:bg-copper/5 transition-colors duration-200"
          >
            <input
              type="checkbox"
              name={field.id}
              value={option.value}
              className="accent-copper w-4 h-4"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function PillCheckboxGroup({ field }: { field: ContactFormField }) {
  return (
    <fieldset>
      <legend className="block font-body text-sm font-medium text-charcoal mb-2">
        {field.label}
      </legend>
      <div className="flex flex-wrap gap-3">
        {field.options?.map((option) => (
          <label
            key={option.value}
            className="cursor-pointer rounded-full border border-sand px-5 py-2.5 font-body text-sm text-charcoal hover:border-copper/50 has-[:checked]:border-copper has-[:checked]:bg-copper has-[:checked]:text-white transition-colors duration-200"
          >
            <input
              type="checkbox"
              name={field.id}
              value={option.value}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function renderField(field: ContactFormField, sectionId: string) {
  if (field.type === "radio") {
    return <RadioGroup key={field.id} field={field} />;
  }
  if (field.type === "checkbox") {
    if (sectionId === "fortfahren") {
      return <PillCheckboxGroup key={field.id} field={field} />;
    }
    return <CheckboxGroup key={field.id} field={field} />;
  }
  return <InputField key={field.id} field={field} />;
}

function FormSection({ section }: { section: ContactFormSection }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-heading text-xl lg:text-2xl font-semibold text-charcoal">
          {section.title}
        </h3>
        {section.subtitle && (
          <p className="mt-1 font-body text-sm text-charcoal-light">
            {section.subtitle}
          </p>
        )}
      </div>
      <div className="space-y-4">
        {section.fields.map((field) => renderField(field, section.id))}
      </div>
    </div>
  );
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    const formData = new FormData(e.currentTarget);

    // Check honeypot
    if (formData.get("_honey")) {
      setState("success");
      return;
    }

    try {
      const res = await fetch(FORMSUBMIT_ACTION, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-copper/10 mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-copper"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-semibold text-charcoal mb-3">
          Vielen Dank für Ihre Anfrage.
        </h3>
        <p className="font-body text-lg text-charcoal-light">
          Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10"
      noValidate
    >
      {/* FormSubmit.co hidden config fields */}
      <input type="hidden" name="_captcha" value={FORMSUBMIT_CONFIG._captcha} />
      <input type="hidden" name="_subject" value={FORMSUBMIT_CONFIG._subject} />
      <input type="hidden" name="_template" value={FORMSUBMIT_CONFIG._template} />

      {/* Honeypot — hidden offscreen, not display:none (better anti-bot) */}
      <input
        type="text"
        name="_honey"
        className="absolute left-[-9999px]"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {data.sections.map((section) => (
        <FormSection key={section.id} section={section} />
      ))}

      {state === "error" && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3">
          <p className="font-body text-sm text-red-700">
            Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es
            erneut oder kontaktieren Sie uns direkt per E-Mail.
          </p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="font-body font-semibold rounded-lg transition-colors duration-200 inline-flex items-center justify-center leading-none px-8 py-4 text-lg bg-charcoal text-cream hover:bg-copper hover:text-white focus:outline-2 focus:outline-copper focus:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === "submitting" ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Wird gesendet...
            </>
          ) : (
            data.submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
