export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This Privacy Policy explains how
        LocalGov.AI collects, uses, and protects your information.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        Information We Collect
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Personal information you provide when signing up (such as email
          address).
        </li>
        <li>
          Usage data, such as pages visited and actions taken on the site.
        </li>
        <li>
          Cookies and similar tracking technologies to enhance your experience.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        How We Use Your Information
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To provide and improve our services.</li>
        <li>To communicate with you about updates or support.</li>
        <li>To analyze usage and trends to improve user experience.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        How We Protect Your Information
      </h2>
      <p className="mb-4">
        We implement industry-standard security measures to protect your data.
        However, no method of transmission over the Internet is 100% secure.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Choices</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>You can update or delete your account information at any time.</li>
        <li>
          You can opt out of certain communications by following the
          instructions in those messages.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at{" "}
        <a href="mailto:support@localgov.ai" className="text-primary underline">
          support@localgov.ai
        </a>
        .
      </p>
    </div>
  );
}
