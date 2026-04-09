/**
 * FormSubmit.co configuration
 * Docs: https://formsubmit.co/
 *
 * Sends form data to provenlyhomes@web.de via FormSubmit.co
 * No backend needed — static site compatible.
 */

const FORMSUBMIT_EMAIL = "provenlyhomes@web.de";

export const FORMSUBMIT_ACTION = `https://formsubmit.co/${FORMSUBMIT_EMAIL}`;

/**
 * Hidden fields for FormSubmit.co configuration.
 * Include these as hidden inputs in the form.
 */
export const FORMSUBMIT_CONFIG = {
  /** Disable captcha (use honeypot instead) */
  _captcha: "false",
  /** Honeypot field name — bots fill this, humans don't */
  _honey: "",
  /** Subject line for the email */
  _subject: "Neue Anfrage über provenlyhomes.de",
  /** Redirect after submit (empty = stay on page, handle with JS) */
  _next: "",
  /** Template */
  _template: "table",
} as const;
