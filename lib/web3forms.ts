/**
 * Web3Forms delivery settings shared by the contact and interest routes.
 *
 * The access key is a public form identifier (Web3Forms is designed to embed
 * it in plain HTML forms), so it ships with the code as a fallback. That keeps
 * the forms working on any deployment without a hosting-dashboard step.
 * Setting WEB3FORMS_ACCESS_KEY in the environment still overrides it, e.g. to
 * point a staging deploy at a different inbox.
 */
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const DEFAULT_ACCESS_KEY = "56c68f18-fe3e-4533-a28a-29c800cfecc3";

export const WEB3FORMS_ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY || DEFAULT_ACCESS_KEY;
