import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-100 via-white to-blue-100 grid-pattern -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.8)_100%)] -z-10" />
      <Navigation />
      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-8 mt-8">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
            Refund Policy
          </h1>
          <p className="text-center text-gray-600 mb-8">Effective Date: 12/25/2024</p>

          <div className="prose prose-purple max-w-none">
            <p className="lead">
              Thank you for choosing SongTailor! We value your trust and strive to provide an exceptional 
              personalized service. Due to the custom nature of our product, we have the following refund policy:
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Refunds for Personalized Products</h2>
            <ul>
              <li><strong>Non-Refundable Items</strong>: As each song is uniquely crafted based on your preferences, we cannot offer refunds once the song creation process has started.</li>
              <li><strong>Exceptions</strong>:
                <ul>
                  <li>If your order cannot be completed due to circumstances on our end (e.g., technical issues or inability to fulfill the request), we will issue a full refund.</li>
                  <li>In cases of accidental duplicate charges, we will promptly refund the extra charge.</li>
                </ul>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Cancellations</h2>
            <ul>
              <li>Orders may be canceled within <strong>24 hours of placement</strong>, provided that production of your song has not yet begun. To request a cancellation, please contact us at <a href="mailto:yourindie101@gmail.com" className="text-purple-600 hover:text-purple-800">yourindie101@gmail.com</a>.</li>
              <li>If production has already started, cancellations will not be accepted, and no refunds will be issued.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Satisfaction Guarantee</h2>
            <p>
              While we do not provide refunds for dissatisfaction due to the subjective nature of custom songs, 
              we are committed to ensuring your satisfaction. Minor revisions may be offered at no additional 
              charge at SongTailor's discretion.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. How to Request a Refund or Cancellation</h2>
            <p>
              To request a refund or cancellation, please email us at <a href="mailto:yourindie101@gmail.com" className="text-purple-600 hover:text-purple-800">yourindie101@gmail.com</a> with the following details:
            </p>
            <ul>
              <li>Your order number</li>
              <li>The reason for your refund or cancellation request</li>
              <li>Any additional details relevant to your case</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Processing Time</h2>
            <ul>
              <li>Approved refunds will be processed within <strong>7-10 business days</strong> and will be issued to the original payment method used during checkout.</li>
              <li>You will receive an email confirmation once your refund has been processed.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Information</h2>
            <p>If you have any questions or concerns about our Refund Policy, please contact us:</p>
            <p>
              <strong>Email</strong>: <a href="mailto:yourindie101@gmail.com" className="text-purple-600 hover:text-purple-800">
                yourindie101@gmail.com
              </a>
            </p>
          </div>

          <div className="mt-12 text-center text-gray-600">
            Thank you for choosing SongTailor. We are committed to delivering high-quality, personalized songs and exceptional customer service.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;