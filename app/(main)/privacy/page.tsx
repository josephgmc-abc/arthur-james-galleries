export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col w-full bg-beige min-h-screen pt-32 pb-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl mb-12 text-navy">Privacy Policy</h1>
        
        <div className="prose prose-navy max-w-none font-sans text-charcoal/80 leading-relaxed space-y-12">
          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">1. Data Collection</h2>
            <p>
              Arthur James Galleries is committed to protecting your privacy. We collect personal information, such as your name and email address, only when you voluntarily provide it to us—for example, when subscribing to our Market Report or submitting an inquiry via our contact form.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">2. Use of Information</h2>
            <p>
              The information we collect is used to respond to your inquiries, provide you with our proprietary market intelligence, and send you invitations to private viewings. We do not sell or rent your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">3. Discretion & Confidentiality</h2>
            <p>
              Given the nature of the high-value art market, discretion is our cornerstone. All correspondence and client data are handled with the utmost confidentiality. Access to your personal data is restricted to authorized personnel who require it to provide our services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">4. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">5. Your Rights</h2>
            <p>
              Under the General Data Protection Regulation (GDPR), you have the right to access, rectify, or erase your personal data held by us. To exercise these rights, please contact our data protection liaison at privatesales@arthurjamesadvisory.com.
            </p>
          </section>

          <section className="pt-12 border-t-[1.5px] border-navy/10">
            <p className="text-[10px] tracking-widest uppercase text-charcoal/40">
              Last Updated: March 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
