import { Card } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Privacy Policy</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Effective Date: 12/25/2824</p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300">
              Your privacy is important to us. This Privacy Policy explains how SongTailor ("we," "us," or "our") collects, uses, and protects your information when you use our web application (the "Service"). By using the Service, you agree to the terms of this Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">1.1 Personal Information</h3>
            <p>We collect personal information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Payment information (processed securely by Stripe; we do not store payment details)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">1.2 Automatically Collected Information</h3>
            <p>At this time, we do not collect information such as IP addresses, browser types, or other analytics-related data.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>To provide and improve the Service, including the creation of custom songs.</li>
              <li>To process payments securely through Stripe.</li>
              <li>To communicate with you about your orders, account, or support inquiries.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing Your Information</h2>
            <p>We do not sell or rent your personal information. We may share your information in the following situations:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Service Providers</h3>
            <p>We use Stripe to process payments securely. Stripe's privacy policy governs their use of your payment information. Please review their privacy policy for more details: <a href="https://stripe.com/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Stripe Privacy Policy</a>.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Legal Compliance</h3>
            <p>We may disclose your information if required to do so by law or if we believe such action is necessary to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Comply with legal obligations.</li>
              <li>Protect and defend our rights or property.</li>
              <li>Prevent or investigate potential wrongdoing.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Access and Correction:</strong> You may request access to the information we hold about you and ask for corrections if necessary.</li>
              <li><strong>Deletion:</strong> You may request the deletion of your personal information, subject to legal and operational requirements.</li>
              <li><strong>Withdraw Consent:</strong> If we rely on your consent to process your data, you may withdraw it at any time.</li>
            </ul>
            <p>To exercise these rights, please contact us at <a href="mailto:yourindie101@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">yourindie101@gmail.com</a>.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. While we strive to use commercially acceptable means to protect your data, no method of transmission over the internet or electronic storage is 100% secure.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be effective when the updated policy is posted on our website. We encourage you to review this Privacy Policy periodically.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
            <p><strong>Email:</strong> <a href="mailto:yourindie101@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">yourindie101@gmail.com</a></p>

            <p className="mt-8 text-gray-700 dark:text-gray-300">Thank you for trusting SongTailor with your information. Your privacy is our priority.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Privacy;