export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col w-full bg-beige min-h-screen pt-48 pb-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl mb-12 text-navy">Terms & Conditions of Sale</h1>
        
        <div className="prose prose-navy max-w-none font-sans text-charcoal/80 leading-relaxed space-y-12">
          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">1. Nature of Transaction</h2>
            <p>
              Arthur James operates as a private art advisory and dealer. We source and facilitate the acquisition of exceptional artworks for the personal enjoyment and appreciation of private collectors. In certain cases, we may act as principal seller.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">2. Artwork Description & Authenticity</h2>
            <p>
              All artworks are described to the best of our knowledge and belief at the time of offering. Where applicable, they are accompanied by a Certificate of Authenticity or provenance documentation. We rely on information provided by third parties and cannot accept responsibility for errors originating outside our control.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">3. Pricing & Payment</h2>
            <p>
              All prices are quoted in GBP unless otherwise specified. Payment terms are set out in the invoice. Legal title to the artwork passes only upon receipt of cleared funds in full. Deposits, where taken, are non-refundable and secure the allocation of the work.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">4. Ownership</h2>
            <p>
              Upon receipt of cleared funds in full, legal and beneficial ownership transfers to the buyer.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">5. VAT & Tax</h2>
            <p>
              Prices are quoted exclusive of VAT unless stated otherwise. Certain works may be offered under the VAT Margin Scheme or exempt. Buyers are responsible for their own tax obligations and should seek independent advice. Arthur James does not provide tax or legal advice.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">6. Shipping and Delivery</h2>
            <p>
              We arrange worldwide shipping through specialist fine art carriers with full insurance. Costs, estimated timelines, and tracking details will be provided at confirmation. International shipments may incur customs duties, taxes, and import fees payable by the buyer.
            </p>
            <p className="mt-4">
              Risk passes to the buyer upon dispatch. Please examine the work carefully upon receipt and notify us immediately at privatesales@arthurjamesadvisory.com of any transit damage, supported by photographs and carrier documentation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">7. Condition & Inspection</h2>
            <p>
              Works are offered in the condition described. Clients are encouraged to request condition reports prior to purchase. No claims will be accepted for issues that were reasonably visible or disclosed. Minor wear consistent with age does not constitute a defect.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">8. Cancellation</h2>
            <p>
              Once payment has been received and the transaction confirmed, the sale is final. We regret that we are unable to accept cancellations, given the unique nature of each artwork.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">9. Refunds and Returns</h2>
            <p>
              All sales are final. We do not offer refunds or returns after payment has been taken.
            </p>
            <div className="mt-6 space-y-4">
              <h3 className="font-serif text-xl text-navy">Limited Exceptions</h3>
              <p>
                In rare cases, we will consider resolution in good faith where:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The artwork arrives damaged in transit and cannot be restored to its offered condition (supported by inspection and carrier report), or</li>
                <li>There is a clear and proven error in the description or authenticity of the work.</li>
              </ul>
              <p>
                Such claims must be notified immediately at privatesales@arthurjamesadvisory.com with supporting photographs and documentation. Any approved return must be shipped via our designated carrier in original condition and packaging. We do not accept returns for change of mind or subjective differences in appearance or appeal.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">10. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the English courts.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-navy mb-4">11. Acceptance</h2>
            <p>
              Payment of an invoice or completion of purchase constitutes full acceptance of these Terms and Conditions.
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
