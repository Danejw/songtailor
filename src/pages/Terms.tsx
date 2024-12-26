import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-100 via-white to-blue-100 grid-pattern -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.8)_100%)] -z-10" />
      <Navigation />
      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-8 mt-8">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-center text-gray-600 mb-8">Effective Date: 12/25/2024</p>

          <div className="prose prose-purple max-w-none">
            <p className="lead">
              Welcome to SongTailor! By accessing or using our custom song creation service (the "Service"), 
              you agree to be bound by these Terms of Service ("Terms"). Please read them carefully. 
              If you do not agree, you may not use the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <ul>
              <li><strong>Company Name</strong>: SongTailor</li>
              <li><strong>Service Overview</strong>: SongTailor creates personalized songs based on user preferences, such as lyrics, style, and themes. Additional features include options for cover images and multiple song variations.</li>
              <li><strong>Primary Website</strong>: <a href="https://songtailor.lovable.app/" className="text-purple-600 hover:text-purple-800">https://songtailor.lovable.app/</a></li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Acceptance of Terms</h2>
            <p>
              By creating an account, placing an order, or otherwise interacting with SongTailor, 
              you agree to these Terms and any additional policies referenced within.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Responsibilities</h2>
            <p>Users of the Service are responsible for:</p>
            <ul>
              <li>Providing accurate and complete information for orders, including song preferences, lyrics, and payment details.</li>
              <li>Ensuring that any submitted content (e.g., lyrics, references) does not infringe on copyright or violate applicable laws.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Payment Terms</h2>
            <h3 className="text-xl font-semibold mt-4 mb-2">Pricing:</h3>
            <ul>
              <li>$29.99 for a single custom song.</li>
              <li>Additional $15 for a second song option within the same order.</li>
              <li>$5 per cover image for each song.</li>
            </ul>
            <p>
              <strong>Payment Processing</strong>: All payments are securely processed through Stripe or PayPal. 
              Full payment is required upfront to initiate order production.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Refund and Cancellation Policies</h2>
            <ul>
              <li><strong>Refunds</strong>: Due to the personalized nature of the Service, refunds are not provided once the song creation process begins.</li>
              <li><strong>Cancellations</strong>: Orders may be canceled within 24 hours of placement, provided production has not started.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
            <h3 className="text-xl font-semibold mt-4 mb-2">Ownership:</h3>
            <ul>
              <li>Users retain ownership of the custom songs they purchase.</li>
              <li>SongTailor reserves the right to use anonymized versions of custom songs (without personal details) for promotional or portfolio purposes unless the user explicitly opts out.</li>
            </ul>
            <p>
              <strong>Licensing</strong>: SongTailor retains copyright of all assets (e.g., melodies, cover images) 
              until full payment is received.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Prohibited Activities</h2>
            <p>Users may not:</p>
            <ul>
              <li>Submit illegal, offensive, or copyrighted material they do not own or have permission to use.</li>
              <li>Resell or redistribute songs without explicit permission if licensing terms apply.</li>
              <li>Use the Service to create content that violates laws or promotes harm.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Disclaimers and Limitation of Liability</h2>
            <ul>
              <li>SongTailor does not guarantee specific outcomes, including subjective satisfaction with musical quality.</li>
              <li>SongTailor is not responsible for delays caused by incomplete or inaccurate user submissions.</li>
              <li>Liability is limited to the total amount paid by the user for the Service.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Modifications to the Terms</h2>
            <p>
              SongTailor reserves the right to update these Terms at any time. Users will be notified 
              of material changes via email or a website announcement. Continued use of the Service 
              after such changes constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Information</h2>
            <p>For questions, concerns, or support, please contact us:</p>
            <p>
              <strong>Email</strong>: <a href="mailto:yourindie101@gmail.com" className="text-purple-600 hover:text-purple-800">
                yourindie101@gmail.com
              </a>
            </p>
          </div>

          <div className="mt-12 text-center text-gray-600">
            Thank you for choosing SongTailor! We look forward to creating your personalized music.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;