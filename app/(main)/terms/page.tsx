export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col w-full bg-beige min-h-screen pt-32 pb-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl mb-12 text-navy">Terms of Service</h1>
        
        <div className="prose prose-navy max-w-none font-sans text-charcoal/80 leading-relaxed space-y-12">
          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">1. Introduction</h2>
            <p>
              Welcome to Arthur James Galleries. By accessing our website and services, you agree to be bound by these Terms of Service. These terms apply to all visitors, clients, and others who access or use our advisory and gallery services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">2. Advisory Services</h2>
            <p>
              Arthur James Galleries provides art advisory, acquisition, and curation services. While we provide expert analysis and market intelligence, all investment decisions remain the sole responsibility of the client. Art market valuations are subject to fluctuation, and past performance is not indicative of future results.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">3. Intellectual Property</h2>
            <p>
              The content, arrangement, and layout of this site, including but not limited to text, graphics, images, and logos, are the property of Arthur James Galleries or its content suppliers and are protected by United Kingdom and international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">4. Private Viewings</h2>
            <p>
              Private viewings at our London and Kent locations are by appointment only. We reserve the right to refuse admission or cancel appointments at our absolute discretion. Full addresses for private viewing spaces are provided only upon confirmation of a vetted appointment.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">5. Limitation of Liability</h2>
            <p>
              Arthur James Galleries shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the services or any content on the site.
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
