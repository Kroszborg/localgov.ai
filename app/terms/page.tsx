export default function TermsPage() {
  return (
    <div className="container mx-auto py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        By using LocalGov.AI, you agree to the following terms and conditions.
        Please read them carefully.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Use of Service</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>You must be at least 13 years old to use this service.</li>
        <li>
          You agree not to misuse the service or attempt to access it using a
          method other than the interface provided.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Content</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Content provided by LocalGov.AI is for informational purposes only and
          does not constitute legal advice.
        </li>
        <li>
          We reserve the right to modify or discontinue the service at any time.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Account</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          You are responsible for maintaining the security of your account.
        </li>
        <li>
          We may suspend or terminate your account if you violate these terms.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        Limitation of Liability
      </h2>
      <p className="mb-4">
        LocalGov.AI is provided "as is" without warranties of any kind. We are
        not liable for any damages resulting from your use of the service.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <a href="mailto:support@localgov.ai" className="text-primary underline">
          support@localgov.ai
        </a>
        .
      </p>
    </div>
  );
}
