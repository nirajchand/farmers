export default function TermsPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--primary)] mb-8 text-center">
          Terms of Service
        </h1>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">1. Acceptance of Terms</h2>
            <p className="text-[var(--secondary-foreground)] leading-relaxed">
              By accessing and using our platform, you agree to comply with
              these Terms of Service. If you do not agree, please discontinue use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">2. User Accounts</h2>
            <p className="text-[var(--secondary-foreground)] leading-relaxed">
              Users must provide accurate information and maintain the
              confidentiality of their account credentials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">3. Farmer Responsibilities</h2>
            <p className="text-[var(--secondary-foreground)] leading-relaxed">
              Farmers must ensure product quality, accurate descriptions,
              and timely order fulfillment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">4. Consumer Responsibilities</h2>
            <p className="text-[var(--secondary-foreground)] leading-relaxed">
              Consumers must provide correct delivery details and complete
              payments responsibly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">5. Payments & Refunds</h2>
            <p className="text-[var(--secondary-foreground)] leading-relaxed">
              Payments must be completed before order confirmation. Refunds
              may apply under valid circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">6. Prohibited Activities</h2>
            <p className="text-[var(--secondary-foreground)] leading-relaxed">
              Users must not misuse the platform, engage in fraud, or violate
              applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">7. Limitation of Liability</h2>
            <p className="text-[var(--secondary-foreground)] leading-relaxed">
              Our platform acts as a marketplace and is not liable for natural
              farming risks or delivery delays beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">8. Changes to Terms</h2>
            <p className="text-[var(--secondary-foreground)] leading-relaxed">
              We reserve the right to update these terms at any time. Continued
              use of the platform implies acceptance of updates.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}