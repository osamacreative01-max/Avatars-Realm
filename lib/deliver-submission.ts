/**
 * Browser-side delivery for the contact and interest forms.
 *
 * The API routes validate an enquiry and return the ready-made Web3Forms
 * submission; this sends it from the visitor's browser, because Web3Forms
 * blocks server-to-server requests. A route reply without a submission (the
 * honeypot path) is treated as delivered, so bots learn nothing.
 */
export async function deliverSubmission(data: {
  endpoint?: string;
  submission?: Record<string, unknown>;
}): Promise<boolean> {
  if (!data.endpoint || !data.submission) return true;

  try {
    const response = await fetch(data.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data.submission),
    });
    const result = (await response.json().catch(() => ({}))) as {
      success?: boolean;
    };
    return response.ok && result.success === true;
  } catch {
    return false;
  }
}
