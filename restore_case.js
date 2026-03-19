const fs = require('fs');

function repl(file, changes) {
  let text = fs.readFileSync(file, 'utf8');
  for (let [o, n] of changes) {
    text = text.split(o).join(n);
  }
  fs.writeFileSync(file, text);
}

repl('components/ArtworkCard.tsx', [
  ['text-charcoal/70">{artist}', 'text-charcoal/70 uppercase">{artist}']
]);

repl('components/ReportCard.tsx', [
  ['text-xs tracking-widest transition-colors', 'text-xs tracking-widest uppercase transition-colors']
]);

repl('app/(main)/page.tsx', [
  ['View all artworks', 'View All Artworks'],
  ['Private intelligence', 'Private Intelligence'],
  ['Strict discretion assured', 'Strict Discretion Assured'],
  ['Global calendar', 'Global Calendar'],
  ['View full schedule', 'View Full Schedule'],
  ['View all reports', 'View All Reports'],
  ['text-[10px] tracking-widest text-charcoal/40">{exhibition.type}', 'text-[10px] tracking-widest text-charcoal/40 uppercase">{exhibition.type}'],
  ['text-[10px] tracking-[0.2em] text-charcoal/40 group-hover:text-gold', 'text-[10px] tracking-[0.2em] text-charcoal/40 uppercase group-hover:text-gold']
]);

repl('app/(main)/reports/page.tsx', [
  ['text-[10px] tracking-[0.4em] text-gold mb-6 block">The private journal', 'text-[10px] tracking-[0.4em] text-gold uppercase mb-6 block">The Private Journal'],
  ['tracking-wide">\n            Proprietary research', 'tracking-wide uppercase">\n            Proprietary research'],
  ['text-[10px] tracking-[0.4em] text-gold mb-8 block">Private advisory', 'text-[10px] tracking-[0.4em] text-gold uppercase mb-8 block">Private Advisory']
]);

repl('app/(main)/reports/[slug]/page.tsx', [
  ['Back to journal', 'Back to Journal'],
  ['Restricted access', 'Restricted Access'],
  ['Email address', 'Email Address'],
  ['Request full report (PDF)', 'Request Full Report (PDF)'],
  ['text-[10px] tracking-[0.4em] text-gold mb-6', 'text-[10px] tracking-[0.4em] text-gold uppercase mb-6'],
  ['text-[10px] tracking-[0.2em] text-beige/40 mb-2', 'text-[10px] tracking-[0.2em] text-beige/40 uppercase mb-2'],
  ['text-xs tracking-[0.2em] px-12', 'text-xs uppercase tracking-[0.2em] px-12']
]);

repl('app/(main)/artworks/page.tsx', [
  ['text-[10px] tracking-[0.4em] text-gold mb-6 block">The collection', 'text-[10px] tracking-[0.4em] text-gold uppercase mb-6 block">The Collection'],
  ['font-light tracking-wide">\n            An exclusive selection', 'font-light tracking-wide uppercase">\n            An exclusive selection'],
  ['Showing {processedArtworks.length} {processedArtworks.length === 1 ? \'work\' : \'works\'}', 'Showing {processedArtworks.length} {processedArtworks.length === 1 ? \'Work\' : \'Works\'}'],
  ['text-[10px] tracking-widest text-charcoal/50">\n            Showing', 'text-[10px] tracking-widest text-charcoal/50 uppercase">\n            Showing'],
  ['Filter & sort', 'Filter & Sort'],
  ['Clear filters', 'Clear Filters'],
  ['tracking-widest text-xs">No works found', 'tracking-widest uppercase text-xs">No works found'],
  ['View results ({', 'View Results ({'],
  ['tracking-widest hover:bg-gold', 'tracking-widest uppercase hover:bg-gold']
]);

repl('app/(main)/artworks/[slug]/page.tsx', [
  ['Back to viewing room', 'Back to Viewing Room'],
  ['text-sm tracking-widest text-charcoal/70">\n              {artwork.artist}', 'text-sm tracking-widest text-charcoal/70 uppercase">\n              {artwork.artist}'],
  ['Estimated price', 'Estimated Price'],
  ['text-[10px] tracking-widest text-charcoal/50">Estimated', 'text-[10px] tracking-widest text-charcoal/50 uppercase">Estimated'],
  ['text-[10px] tracking-widest text-charcoal/50">Medium', 'text-[10px] tracking-widest text-charcoal/50 uppercase">Medium'],
  ['text-[10px] tracking-widest text-charcoal/50">Dimensions', 'text-[10px] tracking-widest text-charcoal/50 uppercase">Dimensions'],
  ['text-[10px] tracking-widest text-charcoal/50">Provenance', 'text-[10px] tracking-widest text-charcoal/50 uppercase">Provenance'],
  ['Inquire about this work', 'Inquire About This Work']
]);

repl('app/(main)/artists/page.tsx', [
  ['text-[10px] tracking-[0.4em] text-gold mb-6 block">Our roster', 'text-[10px] tracking-[0.4em] text-gold uppercase mb-6 block">Our Roster'],
  ['font-light tracking-wide">\n            We proudly', 'font-light tracking-wide uppercase">\n            We proudly']
]);

repl('app/(main)/artists/[slug]/page.tsx', [
  ['text-xs tracking-widest text-charcoal/50">\n            {artistArtworks', 'text-xs tracking-widest uppercase text-charcoal/50">\n            {artistArtworks']
]);

repl('app/(main)/contact/page.tsx', [
  ['First name', 'First Name'],
  ['Last name', 'Last Name'],
  ['Email address', 'Email Address'],
  ['Subject of inquiry', 'Subject of Inquiry'],
  ['Submit inquiry', 'Submit Inquiry'],
  ['text-[10px] tracking-[0.2em] text-charcoal/50 mb-2', 'text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2'],
  ['text-[10px] tracking-[0.3em] text-gold">Head office', 'text-[10px] tracking-[0.3em] text-gold uppercase">Head Office'],
  ['text-[10px] tracking-[0.3em] text-gold">Private viewing', 'text-[10px] tracking-[0.3em] text-gold uppercase">Private Viewing'],
  ['text-[10px] tracking-[0.3em] text-charcoal/40">Direct line', 'text-[10px] tracking-[0.3em] text-charcoal/40 uppercase">Direct Line'],
  ['text-xs tracking-widest px-12', 'text-xs uppercase tracking-widest px-12'],
  ['Artwork acquisition', 'Artwork Acquisition'],
  ['Advisory services', 'Advisory Services'],
  ['Private viewing request', 'Private Viewing Request']
]);

repl('app/(main)/layout.tsx', [
  ['text-[10px] tracking-[0.3em] text-gold">Head office', 'text-[10px] tracking-[0.3em] text-gold uppercase">Head Office'],
  ['text-[10px] tracking-[0.3em] text-gold">Private viewing', 'text-[10px] tracking-[0.3em] text-gold uppercase">Private Viewing'],
  ['Contact us', 'Contact Us'],
  ['Terms of service', 'Terms of Service'],
  ['Privacy policy', 'Privacy Policy'],
  ['Strict discretion assured', 'Strict Discretion Assured']
]);

console.log('Restored uppercase and Title Case successfully.');
