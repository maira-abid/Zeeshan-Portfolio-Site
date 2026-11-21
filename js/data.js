/*
 * Content for the whole site. Everything the pages show lives here so it can be moved into Framer CMS
 * collections later (Projects, Categories, Industries).
 *
 * Image paths are relative to assets/img/, video paths relative to assets/video/.
 * Write-up text is taken from the portfolio .txt files (only obvious typos fixed).
 */
window.SITE = {
  name: 'Zeeshan',
  fullName: 'Zeeshan Abid',
  location: 'Toronto, ON, Canada',

  // SEO and GEO (search engines + AI assistants). Used by tools/build-seo.js; run it after changing anything here.
  seo: {
    // TODO: replace with the real custom domain (no trailing slash). Used for canonical links, the sitemap and structured data.
    url: 'https://maira-abid.github.io/Zeeshan-Portfolio-Site',
    // Keep false while this copy is only a preview (the live site is on Framer): pages get noindex and robots.txt blocks crawlers.
    indexable: false,
    locale: 'en_CA',
    siteName: 'Zeeshan Abid',
    jobTitle: 'Multi-disciplinary designer',
    city: 'Toronto', province: 'Ontario', provinceCode: 'ON', country: 'Canada', countryCode: 'CA', lat: 43.6532, lon: -79.3832,
    knowsAbout: ['Branding', 'Motion graphics', 'Animation', 'Social media design', 'Digital marketing design', 'Print and packaging design', 'UI/UX design', 'Service design', 'Photography', 'Design research'],
    pages: {
      home: { title: 'Zeeshan Abid | Multi-disciplinary Designer in Toronto', description: 'Multi-disciplinary designer in Toronto, ON. Branding, motion graphics, marketing campaigns, social media and UI/UX for brands since 2017. See featured projects.' },
      projects: { title: 'Design Projects by Category and Industry | Zeeshan Abid', description: 'Browse design projects by Zeeshan Abid, Toronto: animation, branding, digital and print marketing, UI/UX and photography. Filter by category or industry.' },
      about: { title: 'About Zeeshan Abid | Designer in Toronto, Ontario', description: 'Zeeshan Abid is a designer in Toronto, ON, working since 2017 in branding, motion graphics, marketing, packaging and UI/UX across fashion, healthcare and tech.' },
      contact: { title: 'Contact Zeeshan Abid | Hire a Designer in Toronto', description: 'Get in touch with Zeeshan Abid, a multi-disciplinary designer in Toronto, ON, about branding, motion graphics, marketing or UI/UX work.' },
      privacy: { title: 'Privacy Policy | Zeeshan Abid', description: 'How personal information is collected, used and protected on this website, under Canadian privacy law (PIPEDA).' },
    },
  },

  hero: {
    sub: 'Multi-disciplinary designer, based in Toronto, working on animations, digital & print marketing, branding.',
    video: 'video/hero-reel.mp4',
    poster: 'img/posters/zeeshan-abid-animation-showreel-video-poster.webp',
  },

  // Social links - TODO: add the real URLs (the owner will provide them).
  // Where contact-form messages go. The form needs a form service to deliver them (see contactEndpoint); until then it opens the visitor's email app addressed here.
  email: 'zeeshanabid.design@outlook.com',
  contactEndpoint: '', // paste the form service's URL here (for example a Formspree form address) and the form sends straight to the email above
  social: [
    { id: 'behance', label: 'Behance', href: 'https://www.behance.net/Zeeshan-Abid' },
    { id: 'vimeo', label: 'Vimeo', href: 'https://vimeo.com/zeeshanabid?fl=pl&fe=by' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/zeeshan-abid1' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/zeeshanabid_photodesign' },
  ],

  // Placeholder client "logos" for the ticker (names as text until real logos are supplied).
  // the client's list (07-Nov-2026), in alphabetical order
  clients: ['Breakfast Box', 'Byte Technology Systems', 'CarSwitch', 'Colabs', 'Evercare Hospital', 'Generation (Pvt) Ltd', 'Multiverse', 'Pizza Now', 'Start-up Grind', 'Treble App', 'Uncle Tetsu'],

  categories: [
    // filled icons only, taken from the style guide's icon page (heart, club, diamond, spade, bolt); repeats are fine
    { id: 'animations-videos', name: 'Animations / Videos', icon: 'bolt' },
    { id: 'branding', name: 'Branding', icon: 'spade' },
    { id: 'digital-marketing', name: 'Digital Marketing', icon: 'diamond' },
    { id: 'print-marketing', name: 'Print Marketing', icon: 'club' },
    { id: 'service-design', name: 'Service Design', icon: 'heart' },
    { id: 'social-media', name: 'Social Media', icon: 'bolt' },
    { id: 'ui-ux', name: 'UI/UX', icon: 'diamond' },
    { id: 'photography', name: 'Photography', icon: 'club' },
  ],

  industries: [
    { id: 'automotive', name: 'Automotive' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'food', name: 'Food' },
    { id: 'cannabis', name: 'Cannabis' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'tech', name: 'Tech' },
    { id: 'advertising', name: 'Advertising' },
    { id: 'events', name: 'Events' },
  ],

  // Single project pages: the page colour (taken from the work, white text on it), the one-line result under the title.
  // Same wording as the new site. Projects not listed here fall back to violet and their summary.
  caseMeta: {
    "pizza-now": {"color":["#17763a","#ffffff"],"outcome":"The highest-selling brand on the Byte app for a year, driving 50–60% of daily sales."},
    "collegiate-survival-sale": {"color":["#d3202b","#ffffff"],"outcome":"Tripled sales and sold 60% of the stock in five days."},
    "carswitch": {"color":["#c97c00","#ffffff"],"outcome":"35k views, 30% fewer queries and 50% more website visits."},
    "evercare": {"color":["#14367a","#ffffff"],"outcome":"Cut common COVID-19 queries by 40% with explainers averaging 20K views."},
    "breakfast-box": {"color":["#dc6b8e","#ffffff"],"outcome":"150–200 orders a day for the four months after launch."},
    "black-friday": {"color":["#14a074","#ffffff"],"outcome":"Lifted Black Friday product sales by 60–70%."},
    "byte-app": {"color":["#c4312f","#ffffff"],"outcome":"A full redesign of a food-delivery app for usability and a modern look."},
    "annual-winter-sale": {"color":["#b3121a","#ffffff"],"outcome":"Sales up 2.5x, with about PKR 1.5M in sales every day."},
    "generation-magazines": {"color":["#a08b64","#ffffff"],"outcome":"Editorial design for three issues of a fashion magazine."},
    "tango-photos": {"color":["#c2185b","#ffffff"],"outcome":"Photography from the Toronto Tango 8 Festival, 2026."},
  },
  // Projects shown on the home page, in this order (slugs). Everything else lives on the Projects page.
  featured: ['carswitch', 'evercare', 'pizza-now', 'collegiate-survival-sale', 'breakfast-box', 'black-friday'],
  // Home page "Featured Work" panels. Every figure comes from the project write-ups below. color = [panel colour taken from the work, readable text colour on it].
  featuredMeta: {
    carswitch: { need: 'Animation that gets noticed', metric: '35k', words: 'views, 30% fewer queries', outcome: '35k views, 30% fewer queries and 50% more website visits.', color: ['#c97c00', '#ffffff'], img: 'carswitch/carswitch-dubai-storyboard-looking-to-sell-your-car.webp', pos: '64% 50%', alt: 'CarSwitch animation frame: the seller character beside the question “Looking to sell your car?”' },
    evercare: { need: 'A hard message made simple', metric: '−40%', words: 'common COVID-19 queries', outcome: 'Cut common COVID-19 queries by 40% with explainers averaging 20K views.', color: ['#14367a', '#ffffff'], img: 'evercare/evercare-flatten-the-curve-frame.webp', pos: '50% 50%', alt: 'Evercare Hospital explainer animation frame: a woman in a red cape working on a laptop at home' },
    'pizza-now': { need: 'A brand that sells', metric: '#1', words: 'selling brand for a year', outcome: 'The highest-selling brand on the Byte app for a year, driving 50–60% of daily sales.', color: ['#17763a', '#ffffff'], img: 'pizza-now/pizza-now-pizza-boxes-checkerboard-pattern.webp', alt: 'Two Pizza Now pizza boxes with a red and green checkerboard pattern' },
    'collegiate-survival-sale': { need: 'A campaign that converts', metric: '3x', words: 'sales in five days', outcome: 'Tripled sales and sold 60% of the stock in five days.', color: ['#d3202b', '#ffffff'], img: 'collegiate-survival-sale/collegiate-survival-sale-posts-on-instagram-and-phone.webp', alt: 'Collegiate Survival Sale posts in an Instagram grid and on a phone' },
    'breakfast-box': { need: 'A launch that gets orders', metric: '150–200', words: 'orders a day', outcome: '150–200 orders a day for the four months after launch.', color: ['#dc6b8e', '#ffffff'], img: 'breakfast-box/breakfast-box-logo-and-eggs-on-toast.webp', pos: '0% 50%', alt: 'Breakfast Box logo beside plates of eggs on toast on a pink background' },
    'black-friday': { need: 'A sale that stands out', metric: '+60–70%', words: 'Black Friday sales', outcome: 'Lifted Black Friday product sales by 60–70%.', color: ['#14a074', '#ffffff'], img: 'black-friday/multiverse-black-friday-sale-25-percent-off-post.webp', alt: 'Black Friday sale post with “25% off site wide” in green lettering on black' },
  },

  // Planned projects with no material yet (from NEW PORTFOLIO, 2026 - 2027.txt). Not shown anywhere at the moment;
  // kept here for when those projects are ready. Apollo Wealth Management is left out (NDA check).
  upcoming: [
    { category: 'photography', name: 'Ming' },
    { category: 'photography', name: 'Personal Projects' },
    { category: 'photography', name: 'Tango Photos' },
    { category: 'service-design', name: 'DHEA MRP Project' },
    { category: 'service-design', name: 'Podcast' },
    { category: 'service-design', name: 'Narcan' },
    { category: 'service-design', name: 'Homelessness in Downtown East Toronto' },
    { category: 'service-design', name: 'UHN Library Re-Design' },
    { category: 'ui-ux', name: 'Theepa Finance App' },
    { category: 'ui-ux', name: 'Sushi App' },
  ],

  about: [
    "Hello, my name is Zeeshan. I'm a multi-disciplinary designer based in Toronto, ON, Canada and have been professionally working as a designer since 2017.",
    "I have worked on graphic design, social media design, print/ packaging design, branding, motion graphics animations and marketing campaigns in many different industries such as fashion, advertising, healthcare, retail, tech, apps, food and cannabis.",
    "Within the design process I enjoy building brands, understanding various design challenges, problem solving and answering questions through design.",
    // The last paragraph contains the two required links; {{work}} and {{contact}} are replaced in app.js.
    "So if you're looking for someone to answer your design questions, someone with a {{work}} and skill-set and someone who has built brands that have raised significantly and consistently raised revenues, look no further. {{contact}} and we'll start answering those questions."
  ],

  // Generic Canadian privacy policy (PIPEDA). Template only: have it reviewed before relying on it.
  privacy: {
    updated: 'November 6, 2026',
    email: 'zeeshanabid.design@outlook.com',
    sections: [
      { title: 'Who we are', paras: [
        'This website is operated by Zeeshan Abid, a designer based in Toronto, Ontario, Canada ("I", "me", "my"). This policy explains what personal information is collected when you visit the site or get in touch, how it is used, and the choices you have.',
        'I handle personal information in line with Canada’s federal private-sector privacy law, the Personal Information Protection and Electronic Documents Act (PIPEDA), and the fair information principles it is built on.'] },
      { title: 'Information I collect', paras: ['I try to collect as little as possible.'], list: [
        '<strong>Information you give me.</strong> If you use the contact form or email me, I receive your first and last name, email address, the subject and the message you write, plus anything else you choose to share.',
        '<strong>Technical information.</strong> Like most websites, the hosting service may automatically log your IP address, browser type, device, the pages you view and the date and time of your visit. This is used for security and to keep the site running.',
        '<strong>Embedded content.</strong> Some project pages embed videos from Vimeo. When you play or load an embedded video, Vimeo may collect information about you under its own privacy policy.'] },
      { title: 'How I use your information', paras: ['Personal information is used only for the purposes it was collected for:'], list: [
        'to read and reply to your message and to discuss a project or enquiry with you;',
        'to operate, secure and improve this website;',
        'to meet legal or regulatory obligations.'],
        after: 'I do not sell or rent your personal information, and I do not use it for advertising.' },
      { title: 'Your consent', paras: [
        'By sending me a message through the contact form you agree that I may collect, use and keep the information you provide to respond to you. You can withdraw your consent at any time, subject to legal or contractual limits, by contacting me using the details below. If you withdraw consent, I may not be able to continue a conversation or project with you.'] },
      { title: 'Who I share it with', paras: ['I share personal information only when needed to run the site or reply to you, and only with service providers that help me do so, such as:'], list: [
        'the website hosting and form-handling service (Framer) and the email provider that delivers your message to me;',
        'Vimeo, if you watch an embedded video (I ask for its "do not track" setting where available);',
        'authorities or others where the law requires or allows disclosure.'],
        after: 'Links to Behance, Vimeo, LinkedIn, Instagram and other sites take you away from this website. Those sites have their own privacy practices, which I do not control.' },
      { title: 'Cookies and analytics', paras: [
        'This site does not use advertising or tracking cookies. Your browser, the hosting service and embedded content (such as Vimeo) may set cookies or similar technologies. You can block or delete cookies in your browser settings; parts of the site, such as embedded videos, may work differently if you do.',
        'If I add website analytics in the future, I will update this policy and describe what is collected.'] },
      { title: 'Where your information is stored', paras: [
        'My service providers may store or process information on servers outside Canada, including in the United States. Information held in another country may be accessed by courts, law enforcement and national security authorities under that country’s laws.'] },
      { title: 'How long I keep it', paras: [
        'I keep messages and contact details only as long as needed for the purpose they were collected for, for example while we are talking or working together, or as the law requires. After that I delete or anonymize them securely.'] },
      { title: 'How I protect it', paras: [
        'I use reasonable safeguards suited to the sensitivity of the information, such as password protection and trusted service providers. No website or email is completely secure, so please do not send highly sensitive information through the contact form.'] },
      { title: 'Your rights', paras: ['You have the right to:'], list: [
        'ask whether I hold personal information about you, and ask for access to it;',
        'ask me to correct information that is inaccurate or incomplete;',
        'withdraw your consent, and ask me to delete your information where I no longer need it;',
        'challenge my compliance with this policy.'],
        after: 'To make a request, contact me using the details below. I will respond within 30 days, as required by PIPEDA, and may need to confirm your identity first.' },
      { title: 'Children', paras: [
        'This website is for a general audience and is not directed at children. I do not knowingly collect personal information from anyone under 13. If you believe a child has sent me personal information, please contact me and I will delete it.'] },
      { title: 'Email and CASL', paras: [
        'I use your email address only to reply to your enquiry. I will not add you to a mailing list or send commercial messages without your express consent, in line with Canada’s Anti-Spam Legislation (CASL).'] },
      { title: 'Changes to this policy', paras: [
        'I may update this policy from time to time. The "last updated" date at the top shows when it last changed. Continued use of the site after a change means you accept the updated policy.'] },
      { title: 'Contact and complaints', contact: true, paras: [
        'Questions, access requests or concerns about privacy can be sent to the contact below. If you are not satisfied with my response, you may file a complaint with the Office of the Privacy Commissioner of Canada at priv.gc.ca or 1-800-282-1376.'] },
    ],
  },

  projects: [
    /* ------------------------------------------------------------------ ANIMATIONS / VIDEOS */
    {
      slug: 'showreel', hidden: true, // hidden until the real showreel exists; delete this flag to show it again
      title: 'Animation Showreel',
      client: 'Zeeshan Abid',
      industries: ['advertising'],
      categories: ['animations-videos'],
      placeholder: true,
      summary: 'A selection of motion graphics and animation work. Placeholder cut made from existing projects until the final showreel is supplied.',
      lead: { t: 'video', src: 'video/hero-reel.mp4', poster: 'img/posters/zeeshan-abid-animation-showreel-video-poster.webp', title: 'Showreel (placeholder)' },
      blocks: [
        { type: 'section', title: 'The Reel', icon: 'bolt', paras: ['The final showreel will live here. This is a placeholder cut assembled from the CarSwitch, Evercare, UT, Treble and Startup Grind projects.'] },
      ],
    },
    {
      slug: 'carswitch',
      title: 'CarSwitch Animations',
      client: 'CarSwitch, Dubai, UAE',
      industries: ['automotive'],
      categories: ['animations-videos', 'social-media'],
      summary: 'Three humorous motion graphics animations that explain how CarSwitch makes buying and selling a used car easy.',
      lead: { t: 'vimeo', id: '453608494', autoplay: true, title: 'Selling Your Car Made Easy: CarSwitch animation about selling a used car without the paperwork' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['Carswitch is a Dubai (UAE) based brand that enables you to buy or sell a used car without the worry and hassle of any paperwork. It steers you clear of any shady transactions or sketchy conversations which may lead you to sell your car for a lesser value or buy a “lemon car”. My role in the project was to use playful and humorous visuals together with its branding to create these animations. The purpose of the animations was to showcase the unique features and benefits that users can enjoy with peace of mind when they use CarSwitch.'],
          media: [{ t: 'vimeo', id: '453612550', title: 'Avoid the Chaos: CarSwitch animation about skipping the phone calls and haggling of a private sale' }],
        },
        {
          type: 'section', title: 'Problem Identification', icon: 'diamond',
          paras: ['CarSwitch wanted to market its services and the unique advantages they offer to both vehicle buyers and sellers. For sellers, CarSwitch handles all of the problems, process and paperwork that come with selling the car. Sellers can expect to get the selling price that they want and not lose value of their car. For buyers, CarSwitch inspects and tests the cars. This way buyers know that they\'re not being sold "lemon cars". They wanted to highlight how and why all of these services set them apart from other brands in Dubai\'s used car market and that they offer a complete solution from beginning to end. Customers do not need to put in effort and instead CarSwitch does the work for them.'],
          media: [
            { t: 'img', src: 'carswitch/carswitch-dubai-storyboard-endless-phone-calls.webp', alt: 'CarSwitch storyboard frame: “But that means handling endless phone calls”, with a hand holding a phone and speech bubbles saying “blah”' },
            { t: 'img', src: 'carswitch/carswitch-dubai-storyboard-mechanic-inspects-car.webp', alt: 'CarSwitch storyboard frame: a smiling mechanic in blue overalls beside a yellow car, with the line “Our experts inspect and certify so buyers are willing to pay more”' },
          ],
        },
        {
          type: 'section', title: 'My Role', icon: 'club',
          paras: ['I started by first understanding the client\'s business model and their requirements for the animations including the message they wanted to get across. I was at the forefront of communicating with the client throughout the entire project. At every stage, I made sure to incorporate the client\'s feedback into the animations without compromising on the quality and aesthetic of the brand.'],
          media: [
            { t: 'vimeo', id: '453621297', title: 'Get More Value with Us: CarSwitch animation about selling a car for the price you want' },
            { t: 'img', src: 'carswitch/carswitch-dubai-animation-colour-palette.webp', alt: 'CarSwitch colour palette: the primary orange F8A534 and blue 689AFE, with two rows of secondary colours' },
            { t: 'img', src: 'carswitch/carswitch-dubai-animation-typography.webp', alt: 'CarSwitch typography: Titillium on blue and Comfortaa on orange, with their alphabets and numerals' },
          ],
        },
        {
          type: 'section', title: 'Process & Problem Solving', icon: 'bolt',
          paras: ['My process started with research on the brand\'s mission, vision, values and personality which I then used to design the art direction. Presenting the storyboard to the client before starting work on the animation made sure that they had a clear idea of how the animation would look once it was complete. I also worked together with social media managers and project managers and the client. However, I also had to adhere to the constraints put around the animations (such as a limited duration) as they were to be used for YouTube ads as well.'],
          media: [{ t: 'img', src: 'carswitch/carswitch-dubai-animation-character-sheet.webp', alt: 'CarSwitch character sheet: the seller, the greedy car dealer, the buyer, the car inspector and the car mechanic' }],
        },
        {
          type: 'media', layout: 'grid3', heading: 'Storyboards',
          items: [
            { t: 'img', src: 'carswitch/carswitch-dubai-storyboard-looking-to-sell-your-car.webp', alt: 'CarSwitch storyboard frame: the seller character beside the question “Looking to sell your car?”' },
            { t: 'img', src: 'carswitch/carswitch-dubai-storyboard-seller-and-car-dealer.webp', alt: 'CarSwitch storyboard frame: a car seller imagines “$$” while a car dealer in a suit imagines “$$$$” outside a dealership' },
            { t: 'img', src: 'carswitch/carswitch-dubai-storyboard-haggling-with-strangers.webp', alt: 'CarSwitch storyboard frame: the seller beside a yellow car with three strangers and the line “…haggling with strangers…”' },
            { t: 'img', src: 'carswitch/carswitch-dubai-storyboard-transfer-paperwork.webp', alt: 'CarSwitch storyboard frame: a stack of paper towering over the seller’s legs, with the line “…and managing the transfer”' },
            { t: 'img', src: 'carswitch/carswitch-dubai-storyboard-you-set-the-price.webp', alt: 'CarSwitch storyboard frame: the seller holding a “$$$$” price tag on a yellow car, with the line “you set the price!”' },
            { t: 'img', src: 'carswitch/carswitch-dubai-storyboard-set-your-own-price.webp', alt: 'CarSwitch storyboard frame: a yellow car with a “$$$$” price tag and the line “…where you set your own price”' },
            { t: 'img', src: 'carswitch/carswitch-dubai-storyboard-transfers-test-drives-calls.webp', alt: 'CarSwitch storyboard frame: a blue car on a road with the words “Management of transfers”, “Test drives” and “Phone calls”' },
            { t: 'img', src: 'carswitch/carswitch-dubai-storyboard-fee-only-when-we-sell.webp', alt: 'CarSwitch storyboard frame: a small yellow car under the line “success fee only applies when WE SELL THE CAR!”' },
            { t: 'img', src: 'carswitch/carswitch-dubai-storyboard-fees-charged-after-sale.webp', alt: 'CarSwitch storyboard frame: a mechanic in a yellow cap holding a clipboard, with the line “Success fees charged after we sell the car”' },
          ],
        },
        {
          type: 'media', layout: 'grid2', heading: 'Vertical Storyboards', note: 'The same story for tall phone screens, in English and Arabic.',
          items: [
            { t: 'img', src: 'carswitch/carswitch-dubai-vertical-storyboard-selling-your-car.webp', alt: 'CarSwitch vertical storyboard: “Selling your car?” in English and Arabic over a phone showing a red car on a road, with the CarSwitch logo and phone number' },
            { t: 'img', src: 'carswitch/carswitch-dubai-vertical-storyboard-more-value-road.webp', alt: 'CarSwitch vertical storyboard: “Get more value with us!” in English and Arabic over a phone showing a white car on a country road' },
            { t: 'img', src: 'carswitch/carswitch-dubai-vertical-storyboard-more-value-coins.webp', alt: 'CarSwitch vertical storyboard: “Get more value with us!” in English and Arabic beside a tall stack of coins compared with a short one' },
            { t: 'img', src: 'carswitch/carswitch-dubai-vertical-storyboard-download-app.webp', alt: 'CarSwitch vertical storyboard end card: the CarSwitch logo, the phone number 04 506 1300 and “Download the app now!”' },
          ],
        },
        {
          type: 'section', title: 'The Outcome', icon: 'bolt',
          bullets: ['3 animated videos for social media and YouTube.', '35k views on Instagram + Facebook.', 'Social media queries dropped by 30%.', 'Customers visiting the website increased by 50%.'],
          stats: [{ n: '3', l: 'animated videos for social media and YouTube' }, { n: '35k', l: 'views on Instagram + Facebook' }, { n: '-30%', l: 'social media queries' }, { n: '+50%', l: 'customers visiting the website' }],
          paras: ['These animations that used humour to explain CarSwitch\'s car selling and buying process; a process that was usually thought to be very boring. They communicated all of CarSwitch\'s services and benefits without coming off as an ad trying to sell a product or service while still adhering to the requirements of the brand, the client and the time limits.'],
        },
        {
          type: 'section', title: 'Reframe', icon: 'heart',
          paras: ['CarSwitch, a Dubai based car selling platform wanted to market their services to car buyers and sellers by communicating them through engaging and humorous animations. They wanted to highlight the unique benefits that set them apart from other competitors in the market. After understanding their business model and their brand guidelines, I designed 3 motion graphics animations that explained their services in a humorous and entertaining way using characters and kinetic typography. The videos lowered queries by 30% and increased visibility of their website and brand by 50%.'],
          media: [{ t: 'img', src: 'carswitch/carswitch-dubai-storyboard-online-inspection-report.webp', alt: 'CarSwitch storyboard frame: a hand holding a phone that shows an online inspection report rated 4.5 out of 5' }],
        },
      ],
    },
    {
      slug: 'evercare',
      title: 'Evercare Hospital Animations',
      client: 'Evercare Hospital',
      industries: ['healthcare'],
      categories: ['animations-videos', 'social-media'],
      summary: 'Four explainer animations that helped the public understand COVID-19 at a time of confusion and panic.',
      lead: { t: 'vimeo', id: '454690781', autoplay: true, title: 'Flatten the Curve: Evercare explainer animation about slowing the spread of COVID-19' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['As an esteemed hospital and healthcare brand present in 6 countries, Evercare aims to provide accessible high quality health and medical care for low and middle income patients in countries with emerging markets.'],
          media: [{ t: 'img', src: 'evercare/evercare-flatten-the-curve-frame.webp', alt: 'Evercare animation frame: a woman in a red cape working on a laptop at home under a “Home Sweet Home” sign' }],
        },
        {
          type: 'media', layout: 'videos', heading: 'The Animations',
          items: [
            { t: 'vimeo', id: '454690781', title: 'Flatten the Curve: animation about slowing the spread of COVID-19' },
            { t: 'vimeo', id: '454699337', title: 'Home Management: animation about caring for a COVID-19 patient at home' },
            { t: 'vimeo', id: '454697981', title: '7 Ways to Prevent COVID-19: animation about everyday precautions' },
            { t: 'vimeo', id: '462079199', title: 'Shortness of Breath: animation about managing breathlessness with COVID-19' },
          ],
        },
        {
          type: 'section', title: 'Problem Identification', icon: 'diamond',
          paras: ['As the COVID-19 pandemic started to spread quickly in Lahore and other major cities of Pakistan, there was an up-rise in cases across the country, causing panic amongst the public. People did not understand what COVID-19 was, how to avoid it and what to do if they contract it. People were confused by either an excess of information or a lack of information about COVID-19.'],
          media: [
            { t: 'img', src: 'evercare/evercare-storyboard-working-at-home-isolating.webp', alt: 'Evercare storyboard frame: the woman in a red cape on her laptop at home, under a “Home Sweet Home” sign' },
            { t: 'img', src: 'evercare/evercare-storyboard-seek-medical-help.webp', alt: 'Evercare storyboard frame: paramedics in protective suits beside an ambulance, with the line “Seek specialised medical help if symptoms are persistent or get worse”' },
          ],
        },
        {
          type: 'section', title: 'My Role', icon: 'club',
          paras: ['I designed the art direction for the explainer animations using the brand guidelines and brand manuals that they had provided. The design of the animations also included all the characters and backgrounds. I also animated 4 different videos, with each animation explaining a different topic related to COVID-19.'],
          media: [{ t: 'img', src: 'evercare/evercare-storyboard-wear-face-mask-in-crowd.webp', alt: 'Evercare storyboard frame: a crowd of people wearing face masks, with the line “Wear a face mask that covers your nose when you are around others”' }],
        },
        {
          type: 'section', title: 'Process & Problem Solving', icon: 'bolt',
          paras: ['The client emphasized on visually communicating the branding of the hospital in the videos. The colours and typography of the brand needed to be at the forefront. The brand had previously used vectors illustrations and characters to communicate to its audience. I had previously used these design elements for their social media posts and graphics. Backgrounds were kept simple to avoid clutter and to focus more on the characters and the animated text. A calm background music was added to relax and de-stress the viewer.'],
          media: [{ t: 'img', src: 'evercare/evercare-storyboard-home-isolation-guidelines.webp', alt: 'Evercare storyboard frame: a person standing in a living room, with the line “Go through the home isolation guidelines provided by the Government of Pakistan, NIH and WHO”' }],
        },
        {
          type: 'media', layout: 'single', heading: 'Colour & Typography',
          items: [
            { t: 'img', src: 'evercare/evercare-animation-colour-palette.webp', alt: 'Evercare animation colour palette: dark blue, cyan, purple and green swatches' },
            { t: 'img', src: 'evercare/evercare-animation-typography.webp', alt: 'Evercare animation typography: the typeface Brown in light and bold on a dark blue background' },
          ],
        },
        {
          type: 'media', layout: 'single', heading: 'Assets',
          items: [{ t: 'img', src: 'evercare/evercare-animation-characters-backgrounds.webp', alt: 'Evercare animation assets: illustrated characters, blob shapes, a living room and a park backdrop' }],
        },
        {
          type: 'media', layout: 'grid3', heading: 'Storyboards',
          items: [
            { t: 'img', src: 'evercare/evercare-storyboard-pandemic-curve-chart.webp', alt: 'Evercare storyboard frame: a chart titled “COVID-19 pandemic” with a tall curve of cases above the healthcare capacity line' },
            { t: 'img', src: 'evercare/evercare-storyboard-sick-person-isolates.webp', alt: 'Evercare storyboard frame: rings of white and red dots on navy, with the line “But if that sick person isolates themselves…”' },
            { t: 'img', src: 'evercare/evercare-storyboard-wash-hands-with-soap.webp', alt: 'Evercare storyboard frame: hands being washed with soap, with the line “Wash your hands frequently with soap”' },
            { t: 'img', src: 'evercare/evercare-storyboard-turn-away-when-sneezing.webp', alt: 'Evercare storyboard frame: a man sneezing into his elbow beside a worried woman, with the line “Turn away from other people when sneezing or coughing”' },
            { t: 'img', src: 'evercare/evercare-storyboard-adequate-measures-on-bus.webp', alt: 'Evercare storyboard frame: masked passengers standing and sitting on a bus, with the line “When you do, take adequate measures”' },
            { t: 'img', src: 'evercare/evercare-storyboard-stay-updated.webp', alt: 'Evercare storyboard frame: a hand holding a phone with a COVID-19 updates screen, with the line “Stay updated about the latest COVID-19 information”' },
            { t: 'img', src: 'evercare/evercare-storyboard-disinfect-surfaces.webp', alt: 'Evercare storyboard frame: a spray bottle beside a bedside table, with the line “Clean hard surfaces with a disinfectant mixture”' },
            { t: 'img', src: 'evercare/evercare-storyboard-avoid-holding-breath.webp', alt: 'Evercare storyboard frame: a man walking in a park past a bench, with the line “When walking… avoid holding your breath”' },
            { t: 'img', src: 'evercare/evercare-storyboard-use-support-on-stairs.webp', alt: 'Evercare storyboard frame: a person climbing purple stairs, with the line “Avoid unnecessary climbing; if you do, use support”' },
            { t: 'img', src: 'evercare/evercare-storyboard-daily-items-within-reach.webp', alt: 'Evercare storyboard frame: a person working on a sofa in a living room, with the line “Keep your daily usable items within your reach”' },
            { t: 'img', src: 'evercare/evercare-storyboard-talk-to-family-friends.webp', alt: 'Evercare storyboard frame: two people checking their phones, with the line “When feeling anxious, talk to your family members or friends”' },
            { t: 'img', src: 'evercare/evercare-storyboard-avoid-hard-foods.webp', alt: 'Evercare storyboard frame: a man beside four snack icons, with the line “When eating, avoid foods that are difficult to chew”' },
            { t: 'img', src: 'evercare/evercare-storyboard-keep-in-touch.webp', alt: 'Evercare storyboard frame: three people in circles waving, with the line “Keep in touch: make sure your friends are informed about your condition”' },
          ],
        },
        {
          type: 'section', title: 'The Outcome', icon: 'bolt',
          bullets: ['Animations averaged around 20K views on Instagram and Facebook.', 'Common queries about COVID-19 dropped significantly by 40%.'],
          stats: [{ n: '~20K', l: 'average views per animation' }, { n: '-40%', l: 'common COVID-19 queries' }, { n: '4', l: 'explainer animations' }],
          paras: ['The animations were positively received by the client and were put up on the hospital\'s social media. Animations are an effective medium to explain a complex topic in a much simpler way, and get far more traction on social media platforms. They help the viewer understand complex topics easily, so that they can take preventative measures accordingly. They also help the brand develop a better reputation with its audience.'],
        },
        {
          type: 'section', title: 'Reframe', icon: 'heart',
          paras: ['Evercare Hospital needed an effective way to communicate a complex topic to an audience that did not understand a very recent and complex pandemic such as COVID-19. As a designer, leading the project, I suggested utilizing animations as the main component of the campaign as they could quickly get the message across through engaging visuals and simplified information. The animations were put up on the hospital\'s social media and became some of the most viewed videos on their channels, averaging around 20k views.'],
        },
      ],
    },
    {
      slug: 'app-launch', hidden: true, // hidden until it has a write-up; delete this flag to show it again
      title: 'App Launch Videos',
      client: 'COLABS / UT / Treble',
      industries: ['tech'],
      categories: ['animations-videos'],
      placeholder: true,
      summary: 'Launch and product videos for three digital products. Full write-up coming soon.',
      lead: { t: 'video', src: 'video/ut-launch.mp4', poster: 'img/posters/ut-launch-video-poster.webp', title: 'UT Launch Video' },
      blocks: [
        {
          type: 'media', layout: 'videos', heading: 'The Videos',
          items: [
            { t: 'video', src: 'video/colabs-launch.mp4', poster: 'img/posters/colabs-launch-video-poster.webp', title: 'COLABS Launch Video' },
            { t: 'video', src: 'video/treble-product.mp4', poster: 'img/posters/treble-product-video-poster.webp', title: 'Treble Product Video' },
          ],
        },
      ],
    },
    {
      slug: 'startup-grind', hidden: true, // hidden until it has a write-up; delete this flag to show it again
      title: 'Startup Grind 2019',
      client: 'Startup Grind',
      industries: ['tech'],
      categories: ['animations-videos'],
      placeholder: true,
      summary: 'Video work for Startup Grind 2019. Full write-up coming soon.',
      lead: { t: 'video', src: 'video/startup-grind-2019.mp4', poster: 'img/posters/startup-grind-2019-video-poster.webp', title: 'Startup Grind 2019' },
      blocks: [],
    },

    /* ------------------------------------------------------------------------------ BRANDING */
    {
      slug: 'pizza-now',
      title: 'Pizza Now',
      client: 'Byte Technology Systems',
      industries: ['food'],
      categories: ['branding'],
      summary: 'A mid-tier pizza brand, created from scratch, that became the highest selling brand on the Byte app.',
      lead: { t: 'img', src: 'pizza-now/pizza-now-pizza-boxes-checkerboard-pattern.webp', alt: 'Two Pizza Now pizza boxes with a red and green checkerboard pattern and the slogan “Nothing that pizza can’t fix”' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['Byte Technology Systems was a Y-Combinator funded food delivery start-up based in Lahore, Pakistan. The start-up sought to utilize smartphone apps and similar technologies to help deliver good quality food to customers at affordable and accessible prices throughout the city.'],
          media: [{ t: 'img', src: 'pizza-now/pizza-now-banner-pizza-and-logo.webp', alt: 'Pizza Now banner: a large pizza with olives, onions and peppers beside the Pizza Now logo on a green background' }],
        },
        {
          type: 'section', title: 'Problem Identification', icon: 'diamond',
          paras: ['Byte wanted to create a brand to sell affordable pizzas to a Pakistani audience that\'s on a limited budget but want to treat themselves and/ or their families to pizzas. The objective was to create a mid-tier brand that appeals to the majority of fast-food consumers. The visual identity around it had to reflect the type of pizzas commonly available at bakeries and small restaurants. The visuals had to appeal to the target audience.'],
          media: [{ t: 'img', src: 'pizza-now/pizza-now-pizza-box-pattern-in-rows.webp', alt: 'Pizza Now pizza boxes laid out side by side, showing the red and green checkerboard pattern and the logo' }],
        },
        {
          type: 'section', title: 'My Role', icon: 'club',
          paras: ['At the start of the project, the brand did not even have a name. It needed to have the word "pizza" in it and had to have something related to "quick service and delivery". I eventually came up with the name “Pizza Now”. For the visuals, I determined the look and feel of the whole brand and developed the visual identity including logos, colour palettes, typography, slogans, patterns. Additionally, I designed the social media posts and also came up with the slogans that would be the voice of the brand.'],
          media: [{ t: 'img', src: 'pizza-now/pizza-now-instagram-posts.webp', alt: 'Three Pizza Now Instagram posts: “Ab khao Pizza Now!”, “Is Now!” with an alarm-clock pizza, and “Wow, wow!”' }],
        },
        {
          type: 'section', title: 'Process & Problem Solving', icon: 'bolt',
          paras: ['I started the design process by researching on mid-tier logo styles that mirrored the look and feel that the brand needed to express. I created mood-boards and reference boards that compiled different ideas and visual directions. Then I used the research to iterate the logos and brand identity. The colour palette was influenced by the Italian Flag (as pizza originated in Italy). These colours are also typically associated with pizza and small pizza shops. Since the brand had an aspirational nature to it, a serif font was used for the logo.'],
          stack: true,
          media: [
            { t: 'img', src: 'pizza-now/pizza-now-logo-evolution-animation.webp', alt: 'Animation of the Pizza Now logo changing through its design iterations' },
            { t: 'img', src: 'pizza-now/pizza-now-final-logo-on-pizza-pan.webp', alt: 'The final Pizza Now logo above a pizza on a black pan, on a green background' },
          ],
        },
        {
          type: 'section', title: 'The Outcome', icon: 'bolt',
          bullets: ['Pizza Now became the highest selling brand on the Byte app for the next 1 year.', 'It contributed to around 50-60% of all daily sales by customers on the app (new and returning).'],
          stats: [{ n: '#1', l: 'selling brand on the Byte app for 1 year' }, { n: '50-60%', l: 'of all daily sales on the app' }],
          paras: [
            'A complete visual identity was designed that included the logo (with variations), colour palette, typography and photography references/ guides. The packaging design also needed to be in line with the aesthetics of the brand and the slogans were added to the packaging to give the brand its voice.',
            'This was a unique design challenge as the objective was to "not make it look too good". Mid-tier aesthetics are different than high-end which is why they need to be designed accordingly. The design and visuals needed to reflect the target audience it was being designed for. The audience needed to relate to it and create an association with it. In this case, going with the norm was the good choice.',
          ],
          media: [{ t: 'img', src: 'pizza-now/pizza-now-in-byte-app-restaurant-list.webp', alt: 'A hand holding a phone that shows Pizza Now in the restaurant list of the Byte app' }],
        },
        {
          type: 'section', title: 'Reframe', icon: 'heart',
          paras: ['Byte wanted to develop a mid-tier brand with the purpose of selling affordable decent quality pizzas to a Pakistani audience that has a limited budget. To successfully create a brand with these qualities, the design of the brand needed to reflect the "mid-tier aesthetic" that audiences typically/ usually associate with mid-tier affordable brands. Basic colours that are typically associated with pizza shops (red, white, green) combined with serif fonts helped to create the perfect aesthetic and sell the brand making it the most popular brand on the app.'],
        },
      ],
    },
    {
      slug: 'breakfast-box',
      title: 'Breakfast Box',
      client: 'Byte Technology Systems',
      industries: ['food'],
      categories: ['branding'],
      summary: 'A premium yet playful cloud-kitchen breakfast brand that drove 150-200 orders a day after launch.',
      lead: { t: 'img', src: 'breakfast-box/breakfast-box-logo-and-eggs-on-toast.webp', alt: 'Breakfast Box logo, an etched stack of pancakes in a blue and red oval, beside plates of eggs on toast on a pink background' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['Byte Technology Systems was a Y-Combinator funded food delivery start-up based in Lahore, Pakistan. The start-up sought to utilize smartphone apps and similar technologies to help deliver good quality food to customers at affordable and accessible prices throughout the city.'],
          media: [{ t: 'img', src: 'breakfast-box/breakfast-box-in-byte-app-restaurant-list.webp', alt: 'A hand holding a phone that shows Breakfast Box in the restaurant list of the Byte app' }],
        },
        {
          type: 'section', title: 'Problem Identification', icon: 'diamond',
          paras: ['Byte wanted to launch a new online cloud kitchen based restaurant on their app. This restaurant brand, called Breakfast Box, aimed to provide high quality intercontinental breakfast items such as croissants, pancakes, french toast, muffins, etc conveniently at affordable prices to a Pakistani audience. Byte needed branding and visual designs that would market and sell the products.'],
          media: [{ t: 'img', src: 'breakfast-box/breakfast-box-instagram-posts-pastel-pink.webp', alt: 'Three Breakfast Box Instagram posts on pastel pink: pancakes, croissants with coffee, and a woman holding a plate of pancakes' }],
        },
        {
          type: 'section', title: 'My Role', icon: 'club',
          paras: ['I researched on various art styles, developed initial mood boards and reference boards and used the research and data to come up with various visual directions that the brand could take for a successful launch on the app. Based on my research and the initial feedback from upper management, I refined the brand identity and presented steps on how to launch the brand on the platform. The qualities that I derived for the brand were: “premium” and “elegant” yet “playful” and “light-hearted”.'],
          media: [{ t: 'img', src: 'breakfast-box/breakfast-box-typefaces-monggoland-and-figtree.webp', alt: 'Breakfast Box typefaces, Monggoland and Figtree, set in pink on blue-violet' }],
        },
        {
          type: 'section', title: 'Process & Problem Solving', icon: 'bolt',
          paras: ['After the creative direction of the brand was finalized, I researched on the photography and aesthetics of the food products that the brand aimed to sell. This helped in creating the art direction of the brand including photography style, colours and typography. This was followed by development of the logo and other visual design collateral for the brand and its products. The logo consists of the name of the restaurant written in a rounded manner at the top. The words “Premium Continental Breakfast” are written at the bottom to signify the restaurant\'s primary offering of cuisine. At the center is an image of a stack of pancakes drawn in a style that pays homage to old etching drawings. The words ESTD and 2022 are written on either sides to show the legacy of the brand.'],
          media: [{ t: 'img', src: 'breakfast-box/breakfast-box-logo-on-hanging-shop-sign.webp', alt: 'The Breakfast Box logo on a round hanging shop sign' }],
        },
        {
          type: 'section', title: 'The Outcome', icon: 'bolt',
          bullets: ['The branding resulted in around 150-200 orders per day for the next 4 months.'],
          stats: [{ n: '150-200', l: 'orders per day for the next 4 months' }],
          paras: ['The outcome was a vintage but minimal aesthetic branding style with pastel colours all of which signified a high end premium brand. The launch ready brand identity included the logo, typography, colour palette, social media strategy and sample social media posts. Vintage and pastel colours were an effective way to make breakfast, bakery and confectionery items look premium and high end.'],
          media: [{ t: 'img', src: 'breakfast-box/breakfast-box-branded-coffee-cups.webp', alt: 'Two Breakfast Box paper coffee cups with blue lids, printed with the logo and “Breakfast served at its finest”' }],
        },
        {
          type: 'section', title: 'Reframe', icon: 'heart',
          paras: ['Byte Technology Systems needed to launch their new premium online restaurant on their food delivery app. The objective of this new brand was to sell high quality intercontinental breakfast to its users. To achieve this objective, Byte needed branding, visual identity and aesthetics that matched the brand\'s promise. By designing the new visual identity complete with photography, colours, typography, social media posts and a launch plan, I was able to meet the brand\'s requirements, thus enabling a successful launch for the brand.'],
        },
      ],
    },

    /* ------------------------------------------------------------------- DIGITAL MARKETING */
    {
      slug: 'black-friday',
      title: 'Black Friday Sale',
      client: 'Multiverse / XP Enterprise / Milkyway Glass',
      industries: ['cannabis'],
      categories: ['digital-marketing', 'social-media'],
      summary: 'A turquoise-on-black Black Friday campaign across email and social that lifted product sales by 60-70%.',
      lead: { t: 'img', src: 'black-friday/multiverse-black-friday-sale-25-percent-off-post.webp', alt: 'Black Friday sale post: “Black Friday Sale, starts now, 25% off site wide” in green lettering over a dark glass-pipe pattern' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['Multiverse is a brand that provides unique, high quality artistic cannabis smoking products and accessories across North America with a focus on aesthetics, function and price. Their portfolio consists of three brands, Milkyway, Milkyway X and Wormhole, through which they aim to create collectable works of art, prized for their unique style, quality and craftsmanship.'],
          media: [{ t: 'img', src: 'black-friday/multiverse-black-friday-sale-launch-posts.webp', alt: 'Two Black Friday social posts side by side: “It’s here… Black Friday Sale, starts now, 25% off site wide”, and “Comment or head over to our website”' }],
        },
        {
          type: 'section', title: 'Problem Identification', icon: 'diamond',
          paras: ['The goal of the project was to utilize and take advantage of the yearly time for Black Friday Sales across North America to market and advertise products at a time when people are looking for good deals to spend money on. The goal was to sell more products and generate more revenue. The campaign was targeted towards the brand\'s current customers as well as new customers.'],
          media: [{ t: 'img', src: 'black-friday/multiverse-black-friday-november-restocks-post.webp', alt: 'Black Friday post: “November restocks are here! 25% off during Black Friday” in red-orange and white over a green pattern of glass pieces' }],
        },
        {
          type: 'section', title: 'My Role', icon: 'club',
          paras: ['As the brand\'s designer, I came up with the art direction and design for the key visuals of the marketing and sales material that included marketing emails and social media posts.'],
          media: [{ t: 'img', src: 'black-friday/multiverse-black-friday-stock-running-out-post.webp', alt: 'Black Friday post: “Stock is running out! 25% off the entire store” in red-orange over a dark green glass pattern, with free shipping on orders above $100' }],
        },
        {
          type: 'section', title: 'Process & Problem Solving', icon: 'bolt',
          paras: ['For the visuals, I introduced a new color palette and typography style. Common colours such as red had been done a lot previously, whereas turquoise was unfamiliar to the brand yet aligned with the brand values.', 'The design used the texture of the products as backgrounds, contrary to having them at the forefront. The typeface was decorated with colours and strokes to make it visually appealing to the audience. The % of the discount needed to be emphasized as it was the main selling point.'],
          media: [{ t: 'img', src: 'black-friday/multiverse-black-friday-rewards-carousel.webp', alt: 'Three-slide rewards carousel: “Black Friday Sale for Milkyway Rewards Members”, 25% off with a free vortex bowl, and “Rewards”' }],
        },
        {
          type: 'media', layout: 'scroll', heading: 'Email Newsletters', note: 'Scroll inside each email to see the full design.',
          items: [
            { t: 'scroll', src: 'black-friday/multiverse-black-friday-rewards-email.webp', alt: 'Full-length Black Friday rewards email with a 25% off headline and a grid of featured glass products' },
            { t: 'scroll', src: 'black-friday/multiverse-black-friday-sale-starts-email.webp', alt: 'Full-length Black Friday sale-starts email with a “Black Friday Sale” headline and rows of discounted products' },
            { t: 'scroll', src: 'black-friday/multiverse-black-friday-whats-left-email.webp', alt: 'Full-length “what’s left” Black Friday email with a countdown timer and rows of remaining products' },
          ],
        },
        {
          type: 'media', layout: 'carousel', heading: 'Social Media Carousels', note: 'Swipe or scroll sideways through each carousel. Click a slide to enlarge it.',
          rows: [
            {
              label: 'Sale starts',
              items: [
                { t: 'img', src: 'black-friday/multiverse-black-friday-carousel-starts-1.webp', alt: 'Black Friday carousel slide 1: “It’s here… Black Friday Sale, starts now, 25% off site wide” in green lettering on black' },
                { t: 'img', src: 'black-friday/multiverse-black-friday-carousel-starts-2.webp', alt: 'Black Friday carousel slide 2: “Comment or head over to our website” over a hand holding a glass piece' },
              ],
            },
            {
              label: 'Sale still on',
              items: [
                { t: 'img', src: 'black-friday/multiverse-black-friday-carousel-still-on-1.webp', alt: 'Black Friday carousel slide 1: “25% off, sale is still on!” over an engraved portrait pattern' },
                { t: 'img', src: 'black-friday/multiverse-black-friday-carousel-still-on-2.webp', alt: 'Black Friday carousel slide 2: “Stock up for the holidays, now’s the time” in red-orange on a dark gift-wrap pattern' },
              ],
            },
          ],
        },
        {
          type: 'section', title: 'The Outcome', icon: 'bolt',
          bullets: ['Product sales increased by 60-70% for Black Friday.', 'Emails achieved a click rate of around 4.67%.'],
          stats: [{ n: '+60-70%', l: 'product sales over Black Friday' }, { n: '4.67%', l: 'email click rate' }],
          paras: ['I learned that customers are looking for good deals and discounts and will buy from companies they trust if they are getting an advantage.'],
        },
        {
          type: 'section', title: 'Reframe', icon: 'heart',
          paras: ['Multiverse\'s Black Friday Sale aimed to utilize the Black Friday trend to market their products to existing and new customers to ultimately increase revenue for the company. This also reassured customers that the brand\'s products are more reliable and offer greater quality as compared to the competition.'],
        },
      ],
    },
    {
      slug: 'collegiate-survival-sale',
      title: 'Collegiate Survival Sale',
      client: 'Multiverse / XP Enterprise / Milkyway Glass',
      industries: ['cannabis'],
      categories: ['digital-marketing', 'social-media'],
      summary: 'A rough, chaotic back-to-school campaign that tripled sales and sold 60% of stock within five days.',
      lead: { t: 'img', src: 'collegiate-survival-sale/collegiate-survival-sale-posts-on-instagram-and-phone.webp', alt: 'Collegiate Survival Sale posts shown in an Instagram grid and on a phone, on a dark background' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['Multiverse is a brand that provides unique, high quality artistic cannabis smoking products and accessories across North America with a focus on aesthetics, function and price. Their portfolio consists of three brands, Milkyway, Milkyway X and Wormhole, through which they aim to create collectable works of art, prized for their unique style, quality and craftsmanship.'],
          media: [{ t: 'img', src: 'collegiate-survival-sale/collegiate-survival-sale-teaser-posts.webp', alt: 'Two Collegiate Survival Sale teaser posts: a torn notebook page reading “the Collegiate Survival Sale” with a circled A+, and a collage of an alarm clock, megaphone, globe and books dated September 8th' }],
        },
        {
          type: 'section', title: 'Problem Identification', icon: 'diamond',
          paras: ['Usually, at the start of the academic year, students are stressed or frustrated because of their studies and assignments and are looking to relieve their stress. Potheads and smokers use cannabis to relieve and relax themselves and the brand wanted to capitalize on this moment.', 'Milkyway wanted to sell more of its products to the young university going student demographic. They wanted to take advantage of the "Back to School" time (August/ September) when students are returning to the university after summer holidays.'],
          media: [{ t: 'img', src: 'collegiate-survival-sale/collegiate-survival-sale-launch-posts.webp', alt: 'Two Collegiate Survival Sale launch posts: “Now live, 20% off entire stock” beside an alarm clock and megaphone collage, and “Survive the school year with 20% off the entire website”' }],
        },
        {
          type: 'section', title: 'My Role', icon: 'club',
          paras: ['I directed and designed the art direction of the whole campaign which included all of the digital marketing materials; emails, social media posts, animations.'],
          media: [{ t: 'img', src: 'collegiate-survival-sale/collegiate-survival-sale-last-call-posts.webp', alt: 'Two “last call” Collegiate Survival Sale posts: “Everything’s 20% off… last call!”, and a hand holding a glass piece beneath a thumbs-up' }],
        },
        {
          type: 'section', title: 'Process & Problem Solving', icon: 'bolt',
          paras: ['The art direction needed to be rough and chaotic with bold colors that are captivating and portray the stress of university life. The typography also needed to be just as rough and bold.', 'I took inspiration from collages that use torn paper, photographs and coloured markings. I used visuals such as papers, laptops, scribbles, stationery, eyes, mouths as decorative design elements and elements such as assignment sheets, grids and torn paper as essential background design elements. The text was arranged in a tilted fashion to show urgency and chaos.'],
          media: [{ t: 'img', src: 'collegiate-survival-sale/collegiate-survival-sale-still-on-posts.webp', alt: 'Two “still on” Collegiate Survival Sale posts with halftone lips, a pencil and a pointing hand, announcing 20% off the entire website stock from September 8 to 19' }],
        },
        {
          type: 'media', layout: 'scroll', heading: 'Email Newsletters', note: 'Scroll inside each email to see the full design.',
          items: [
            { t: 'scroll', src: 'collegiate-survival-sale/collegiate-survival-sale-launch-email.webp', alt: 'Full-length Collegiate Survival Sale launch email with the sale headline, product tiles and a red call-to-action button' },
            { t: 'scroll', src: 'collegiate-survival-sale/collegiate-survival-sale-last-call-email.webp', alt: 'Full-length Collegiate Survival Sale last-call email with the “last call” headline and rows of products' },
          ],
        },
        {
          type: 'media', layout: 'grid2', heading: 'Social Media Stories', note: 'Animated Instagram stories.',
          items: [
            { t: 'img', src: 'collegiate-survival-sale/collegiate-survival-sale-still-on-story-animation.webp', alt: 'Animated Instagram story: “the Collegiate Survival Sale is still on” with halftone lips and a pointing finger on a torn notebook page' },
            { t: 'img', src: 'collegiate-survival-sale/collegiate-survival-sale-last-call-story-animation.webp', alt: 'Animated Instagram story: “Everything’s 20% off… last call!” on a torn notebook page with a paper clip' },
          ],
        },
        {
          type: 'section', title: 'The Outcome', icon: 'bolt',
          bullets: ['The sales increased by 3x.', 'Around 60% of the stock was sold within 5 days of the sale.', 'Approx 180 products were sold throughout the sale. 5x more than regular days.', 'Click rate achieved was 2.2%.'],
          stats: [{ n: '3x', l: 'sales' }, { n: '60%', l: 'of stock sold in 5 days' }, { n: '5x', l: 'more products sold than on a regular day (approx. 180)' }, { n: '2.2%', l: 'email click rate' }],
          paras: ['The timing of the sale and the target demographic plays an important role in selling any given product. Having the sale at the start of the academic year and targeting it towards university students paid off in terms of increased sales and greater revenue as compared to regular days. The target demographic likes to see graphics that relate to them and are tailored towards them.', 'Bold graphics with eye catching colors and typography helped to cut through the competition. It often pays off to take the sale as an opportunity to design graphics that are different from regular routine branding graphics.'],
        },
        {
          type: 'section', title: 'Reframe', icon: 'heart',
          paras: ['The Collegiate Survival Sale capitalized on the time when university going students are returning to university after summer holidays. This is a time when students reunite with friends, socialize and seek to de-stress themselves as the new academic year starts. Milkyway took advantage of the opportunity and pushed out a new sale with new bold, eye-catching visuals while at the same time offering irresistible discounts on their products.'],
        },
      ],
    },

    /* ------------------------------------------------------------------- PRINT MARKETING */
    {
      slug: 'annual-winter-sale',
      title: 'Annual Winter Sale',
      client: 'Generation',
      industries: ['fashion'],
      categories: ['print-marketing'],
      summary: 'A bold, Constructivism-inspired Annual Winter Sale campaign for Generation across newspapers, web banners, social media and in-store graphics that multiplied sales by 2.5x.',
      lead: { t: 'img', src: 'annual-winter-sale/generation-winter-sale-newspaper-banner-15cm.webp', alt: 'Generation Annual Winter Sale newspaper banner: a red circle badge reading “Annual Winter Sale, up to 70% off” between two white wedges saying “Starts today” and “6th January, 2018”, with store addresses below' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['Generation is a women’s fast fashion brand based in Pakistan. The brand became an answer to the rising demand by Pakistani urban women for affordable ready-to-wear clothes that celebrate tradition with creativity & innovation.'],
        },
        {
          type: 'section', title: 'Problem Identification', icon: 'diamond',
          paras: ['Every year, Generation has its Annual Summer and Annual Winter Sales through which it attracts new and existing customers. The brand wanted to create an Annual Winter Sale campaign according to its brand requirements which included the use of Generation’s signature red colour and “Avant Garde” as its main font. The client wanted the design to look “bold”, “striking” and “masculine”. The primary design outcome would be newspaper advertisements, web banners, social media posts and in-store graphics.'],
          media: [
            { t: 'img', src: 'annual-winter-sale/generation-brand-colour-palette.webp', alt: 'Generation colour palette: Generation’s red C4232A, white FFFFFF and black 000000' },
            { t: 'img', src: 'annual-winter-sale/generation-brand-typography-avant-garde.webp', alt: 'Generation typography: ITC Avant Garde Gothic Pro in Book, Medium, Demi and Bold, with the alphabet and numerals' },
          ],
        },
        {
          type: 'section', title: 'My Role', icon: 'club',
          paras: ['As the graphic designer I was tasked with developing the campaign. I researched on various design references and took them as inspiration to create the art direction for the main artwork of the newspaper advertisements. The main artwork was used as a base to create the rest of the campaign.'],
          stack: true,
          media: [{ t: 'img', src: 'annual-winter-sale/generation-winter-sale-newspaper-ad-27cm.webp', alt: 'Generation Annual Winter Sale vertical poster, the 27 cm newspaper advertisement: a red and white funnel above a black circle reading “up to 70% off”, starting 6th January, 2018' }],
        },
        {
          type: 'section', title: 'Process & Problem Solving', icon: 'bolt',
          paras: ['The art style and direction was inspired by the “Russian Constructivism” movement from the 1920s and 1930s. I had researched on the artwork from that era and found that it aligned well with what Generation required from their campaign. The historical artwork helped inspire the shapes, patterns, design elements and compositions for the campaign artwork. For the advertisements, I also had to make sure that all the relevant information was communicated clearly.'],
          stack: true,
          media: [
            { t: 'scroll', src: 'annual-winter-sale/generation-winter-sale-constructivism-inspirations.webp', alt: 'Scrolling collection of Russian Constructivist and later poster references that shaped the campaign: a red wedge poster, a book advertisement, a Rodchenko poster, a vodka advert, a Blondie poster and a red triangle poster' },
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-initial-layouts-animation.webp', alt: 'Animation stepping through early Annual Winter Sale layouts in red, black and white, starting with “Iteration number 1”' },
          ],
        },
        {
          type: 'section', title: 'The Outcome', icon: 'bolt',
          bullets: ['2 newspaper advertisements, web banners and approximately 35 artworks for in-store graphics across 11 locations.', 'Sales increased by 2.5x during the campaign.', 'An average of PKR 1,500,000 was generated in sales every day.'],
          stats: [{ n: '2.5x', l: 'increase in sales during the campaign' }, { n: 'PKR 1.5M', l: 'average sales generated every day' }, { n: '~35', l: 'in-store artworks across 11 locations' }],
          paras: ['The outcome of the campaign included: 2 newspaper advertisements, web banners, and approximately 35 artworks for in-store graphics across 11 locations. During the campaign, sales increased by 2.5x and an average of PKR 1,500,000 was generated in sales every day.'],
        },
        {
          type: 'section', title: 'Reframe', icon: 'heart',
          paras: ['Generation is a Pakistani women’s fast fashion brand that makes an impactful statement every year with its annual summer and winter sales. The brand was looking to advertise its sale event across various print and digital mediums including in-store displays. Drawing inspiration from “Russian Constructivism”, I designed a series of digital and print artwork that multiplied sales by 2.5x.'],
        },
        {
          type: 'media', layout: 'single', heading: 'Newspaper Adaptations',
          items: [
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-dawn-newspaper-ad.webp', alt: 'The Annual Winter Sale banner printed across the bottom of the front page of the Dawn newspaper' },
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-the-news-newspaper-ad.webp', alt: 'The Annual Winter Sale advertisement placed on a page of The News newspaper' },
          ],
        },
        {
          type: 'media', layout: 'single', heading: 'Websites & Social Media',
          items: [
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-social-post-animation.webp', alt: 'Animated social media post: a woman in a floral dress beside the Annual Winter Sale badge, with “Was PKR 3698, now PKR 2698”' },
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-facebook-banner.webp', alt: 'Annual Winter Sale artwork used as the cover and a post on Generation’s Facebook page' },
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-website-banner.webp', alt: 'Annual Winter Sale “Now live” banner on the Generation website, with the red sale badge in the centre' },
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-daraz-banner.webp', alt: 'Annual Winter Sale “Now live” banner on Generation’s page on the Daraz online marketplace' },
          ],
        },
        {
          type: 'media', layout: 'single', heading: 'Store Displays',
          items: [
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-store-window-banners-mannequins.webp', alt: 'Store window with large red Annual Winter Sale banners on either side of mannequins in dark and red outfits' },
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-store-mall-entrance-window.webp', alt: 'Generation store entrance in a mall, with red Annual Winter Sale banners across the window display' },
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-store-tall-banner-mannequins.webp', alt: 'A tall red Annual Winter Sale banner hanging above seated mannequins in a store display' },
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-store-building-window-banners.webp', alt: 'A Generation store building with red Annual Winter Sale banners in its windows and a large billboard on the roof' },
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-store-billboard-above-sign.webp', alt: 'A large red Annual Winter Sale billboard above the Generation sign outside a store' },
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-store-arched-windows-banners.webp', alt: 'Three arched windows of a stone building with the words Annual, Winter and Sale, above a red sale display with a mannequin' },
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-store-mall-red-door-banner.webp', alt: 'A Generation mall store with a red Annual Winter Sale banner by the door and a window display' },
            { t: 'img', src: 'annual-winter-sale/generation-winter-sale-store-mall-entrance-banner.webp', alt: 'A Generation mall entrance with a large red Annual Winter Sale banner beside the door' },
          ],
        },
      ],
    },

    {
      slug: 'generation-magazines',
      title: 'Generation Magazines',
      client: 'Generation',
      industries: ['fashion'],
      categories: ['print-marketing'],
      placeholder: true,
      summary: 'Editorial design for three Generation magazines, shown together as one project. Full write-up coming soon.',
      lead: { t: 'img', src: 'generation-magazines/generation-magazine-three-covers.webp', alt: 'Three Generation magazine covers standing side by side: a beach portrait of three women, the Eid 2018 issue and the Autumn/Winter 2018-19 issue' },
      blocks: [
        {
          type: 'media', layout: 'single', heading: 'Magazine 1: Eid 2018', note: 'Scroll inside the last picture to see the full layout.',
          items: [
            { t: 'img', src: 'generation-magazines/generation-magazine-green-border-spread-mockup.webp', alt: 'Open Generation magazine with a green ornamental border, a photo of a woman outdoors and Urdu text on the right page' },
            { t: 'img', src: 'generation-magazines/generation-magazine-front-and-back-cover-mockup.webp', alt: 'Front and back cover of the Generation Eid 2018 magazine with a green spine, an “Our stores” list, social links and an Urdu headline' },
            { t: 'scroll', src: 'generation-magazines/generation-magazine-eid-2018-full-layout.webp', alt: 'Generation Eid 2018 magazine layout, scrolling from the green cover through the Director’s note and the inside spreads' },
          ],
        },
        {
          type: 'media', layout: 'single', heading: 'Magazine 2', note: 'Scroll inside the last picture to see the full layout.',
          items: [
            { t: 'img', src: 'generation-magazines/generation-magazine-open-spread-mockup.webp', alt: 'Open Generation magazine on a pale surface, showing a spread with a woman in a yellow outfit beside a lake and Urdu headings' },
            { t: 'img', src: 'generation-magazines/generation-magazine-spread-on-concrete-mockup.webp', alt: 'Open Generation magazine lying on a concrete slab, with portraits of models by a river and a circular photo crop' },
            { t: 'scroll', src: 'generation-magazines/generation-magazine-beach-cover-full-layout.webp', alt: 'Generation magazine layout with three women on a beach on the cover, scrolling through the Director’s note and the inside spreads' },
          ],
        },
        {
          type: 'media', layout: 'single', heading: 'Magazine 3: Autumn/Winter 2018-19', note: 'Scroll inside the last picture to see the full layout.',
          items: [
            { t: 'img', src: 'generation-magazines/generation-magazine-page-turn-spread-mockup.webp', alt: 'Generation magazine open with a page mid-turn, showing photographs of models in dark and red clothing against a beige wall' },
            { t: 'img', src: 'generation-magazines/generation-magazine-spread-on-wall-mockup.webp', alt: 'Generation magazine open against a wall, with a seated model and two women carrying water containers above three coloured lines' },
            { t: 'scroll', src: 'generation-magazines/generation-magazine-autumn-winter-18-19-layout.webp', alt: 'Generation Autumn/Winter 2018-19 magazine layout, scrolling from the cover through the Director’s note and the inside spreads' },
          ],
        },
      ],
    },

    /* --------------------------------------------------------------------------------- UI/UX */
    {
      slug: 'byte-app',
      title: 'Byte App',
      client: 'Byte Technology Systems',
      industries: ['food', 'tech'],
      categories: ['ui-ux'],
      placeholder: true,
      summary: 'A redesign of the Byte food delivery app to be easier to use and look more contemporary. Full write-up coming soon.',
      lead: { t: 'img', src: 'byte-app/byte-app-home-screen.webp', alt: 'The Byte food delivery app home screen on a phone, beside the white “byte” logo on a red background' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['Byte Technology Systems was a Y-Combinator funded food delivery start-up based in Lahore, Pakistan. The aim of this project was to re-design the whole Byte app to make it easier in terms of usability and to make it look more visually appealing and contemporary.'],
          media: [{ t: 'img', src: 'byte-app/byte-app-redesign-intro.webp', alt: 'Byte app introduction slide: text about the redesign beside a phone showing the home screen with categories and recent orders' }],
        },
        { type: 'media', layout: 'single', heading: 'User Flow', items: [{ t: 'img', src: 'byte-app/byte-app-user-flow.webp', alt: 'Byte app user flow diagram: the steps from opening the app and the splash screen, through onboarding and choosing a restaurant and item, to adding to the cart, checking out and placing the order' }] },
        { type: 'media', layout: 'single', heading: 'Wireframes', items: [{ t: 'img', src: 'byte-app/byte-app-wireframes.webp', alt: 'Hand-drawn wireframes sketching twelve screens of the Byte app' }] },
        { type: 'media', layout: 'single', heading: 'Screens', items: [{ t: 'img', src: 'byte-app/byte-app-screens-on-phones.webp', alt: 'Byte app screens on tilted phones arranged across a red background' }] },
        { type: 'media', layout: 'scroll', heading: 'Screen Designs', note: 'Scroll to see all the screens.', items: [{ t: 'scroll', src: 'byte-app/byte-app-screen-designs.webp', alt: 'Byte app screen designs grouped as onboarding, main menus, post order, and profile and help' }] },
        {
          type: 'media', layout: 'videos', heading: 'Promo Animations',
          items: [
            { t: 'video', src: 'video/byte-order-tutorial.mp4', poster: 'img/posters/byte-app-order-tutorial-video-poster.webp', title: 'Order Tutorial', alt: 'Byte order tutorial video: a phone showing a restaurant menu, with step 4, “Select your restaurant”, on a red background', portrait: true },
            { t: 'video', src: 'video/byte-just-5-taps.mp4', poster: 'img/posters/byte-app-order-in-5-taps-video-poster.webp', title: 'Order in Just 5 Taps', alt: 'Order in just 5 taps video: a phone showing a Pizza Now menu under the heading “Order in just 5 taps”, on a red background' },
            { t: 'video', src: 'video/byte-wheel.mp4', poster: 'img/posters/byte-app-wheel-animation-video-poster.webp', title: 'Wheel Animation', alt: 'Wheel animation video: a spinning wheel of food dishes on a red background' },
            { t: 'video', src: 'video/byte-too-much-on-food.mp4', poster: 'img/posters/byte-app-take-a-byte-video-poster.webp', title: 'Take a Byte', alt: 'Take a Byte video: a short promotional animation for the Byte app on a red background' },
          ],
        },
      ],
    },

    /* ----------------------------------------------------------------------- PHOTOGRAPHY */
    {
      slug: 'tango-photos', hidden: true, // hidden at the owner's request; delete this flag to show the tango photos again
      title: 'Tango Photos',
      client: 'Toronto Tango 8 Festival, 2026',
      industries: ['events'],
      categories: ['photography'],
      placeholder: true,
      summary: 'Photography from the Toronto Tango 8 Festival, 2026. Full write-up coming soon.',
      lead: { t: 'img', src: 'tango-photos/toronto-tango-festival-2026-couple-dancing-3947.webp', alt: 'A couple dancing close in a dimly lit hall with magenta uplights at the Toronto Tango 8 Festival' },
      blocks: [
        {
          type: 'media', layout: 'masonry', heading: 'On the Dance Floor', note: 'Click a photo to enlarge it.',
          items: [
            [3948, 'A woman in a dark dress with her hair up dancing in close embrace, magenta lights glowing behind them'],
            [3921, 'A couple wrapped in a close tango embrace on a red-lit dance floor, with other dancers and tables behind'],
            [3923, 'Two dancers locked in an embrace, one arm raised, in a warmly lit hall with portraits on the wall'],
            [3928, 'A couple dancing in front of a lit alcove with two large portraits, under a scatter of fairy lights'],
            [3929, 'A man in a dark shirt and a woman dancing in the middle of the hall, framed by wall lights and portraits'],
            [3931, 'A couple dancing beside a magenta-lit wall, with a man in a hat watching from the left'],
            [3933, 'A bald man and a woman with long dark hair dancing close, magenta light on the wall beside them'],
            [3934, 'The same couple turning on the dance floor, her arm over his shoulder, with other pairs dancing behind'],
            [3935, 'A couple embracing in the foreground with strings of lights and more dancers behind them'],
            [3939, 'A tall view of a couple dancing under a red-lit floor, with a lit alcove and portraits on the wall'],
            [3940, 'A close, tall frame of two dancers in an embrace, with a magenta wall behind'],
            [3946, 'A tall frame of a man in black holding a woman close, other couples dancing behind them'],
            [3951, 'A woman with her hair up smiling over her partner’s shoulder as they dance, magenta columns behind'],
            [3953, 'Two dancers cheek to cheek, with other couples and a magenta-lit column in the background'],
            [3954, 'A couple in a tight embrace in the centre of a crowded dance floor, with a red glow on the floor'],
            [3956, 'A man and a woman dancing close with their eyes closed, other couples around them'],
            [3957, 'A couple turning together on the dance floor while others dance in the background'],
            [3959, 'A bald man dancing with a woman in a dark top, other dancers filling the hall behind'],
            [3962, 'A woman with a high bun resting her head on her partner as they dance, a warm light behind'],
            [3964, 'A man in a dark shirt holding his partner, with fairy lights and other dancers behind them'],
            [3965, 'A woman with a bun and a man with braids dancing cheek to cheek in the foreground'],
            [3967, 'A man in a white shirt dancing with a woman in black, fairy lights in the background'],
            [3969, 'A bald man and a woman dancing close beside a magenta-lit wall, other couples around them'],
          ].map(([n, alt]) => ({ t: 'img', src: `tango-photos/toronto-tango-festival-2026-couple-dancing-${n}.webp`, alt: alt + ' at the Toronto Tango 8 Festival' })),
        },
      ],
    },
  ],
};

// Projects flagged `hidden: true` stay in the data but are not shown anywhere (pages, filters, counts, search data) until the flag is removed.
window.SITE.hiddenProjects = window.SITE.projects.filter(function (p) { return p.hidden; });
window.SITE.projects = window.SITE.projects.filter(function (p) { return !p.hidden; });
