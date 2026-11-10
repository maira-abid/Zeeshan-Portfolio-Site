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
    poster: 'img/posters/hero-reel.webp',
  },

  // Social links - TODO: add the real URLs (the owner will provide them).
  social: [
    { id: 'behance', label: 'Behance', href: 'https://www.behance.net/Zeeshan-Abid' },
    { id: 'vimeo', label: 'Vimeo', href: 'https://vimeo.com/zeeshanabid' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/zeeshan-abid1/' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/zeeshanabid_photodesign/' },
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

  // Projects shown on the home page, in this order (slugs). Everything else lives on the Projects page.
  featured: ['carswitch', 'evercare', 'pizza-now', 'collegiate-survival-sale', 'breakfast-box', 'black-friday'],
  // Home page "Featured Work" panels. Every figure comes from the project write-ups below. color = [panel colour taken from the work, readable text colour on it].
  featuredMeta: {
    carswitch: { need: 'Animation that gets noticed', metric: '35k', words: 'views, 30% fewer queries', outcome: '35k views, 30% fewer queries and 50% more website visits.', color: ['#c97c00', '#ffffff'], img: 'carswitch/storyboard-4.webp', pos: '64% 50%', alt: 'CarSwitch animation frame: a seller character beside the question "Looking to sell your car?"' },
    evercare: { need: 'A hard message made simple', metric: '−40%', words: 'common COVID-19 queries', outcome: 'Cut common COVID-19 queries by 40% with explainers averaging 20K views.', color: ['#14367a', '#ffffff'], img: 'evercare/flatten-curve.webp', pos: '50% 50%', alt: 'Evercare Hospital explainer animation frame: a woman working at home in a red cape' },
    'pizza-now': { need: 'A brand that sells', metric: '#1', words: 'selling brand for a year', outcome: 'The highest-selling brand on the Byte app for a year, driving 50–60% of daily sales.', color: ['#17763a', '#ffffff'], img: 'pizza-now/box-1.webp', alt: 'Pizza Now pizza boxes' },
    'collegiate-survival-sale': { need: 'A campaign that converts', metric: '3x', words: 'sales in five days', outcome: 'Tripled sales and sold 60% of the stock in five days.', color: ['#d3202b', '#ffffff'], img: 'collegiate-survival-sale/hero-5.webp', alt: 'Collegiate Survival Sale campaign on social media and devices' },
    'breakfast-box': { need: 'A launch that gets orders', metric: '150–200', words: 'orders a day', outcome: '150–200 orders a day for the four months after launch.', color: ['#dc6b8e', '#ffffff'], img: 'breakfast-box/bb-3.webp', pos: '0% 50%', alt: 'Breakfast Box branding with the logo on a plate of breakfast' },
    'black-friday': { need: 'A sale that stands out', metric: '+60–70%', words: 'Black Friday sales', outcome: 'Lifted Black Friday product sales by 60–70%.', color: ['#14a074', '#ffffff'], img: 'black-friday/hero-1.webp', alt: 'Black Friday sale social posts' },
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
    email: '', // TODO: add the contact email for privacy requests; shown as a placeholder until filled in
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
      lead: { t: 'video', src: 'video/hero-reel.mp4', poster: 'img/posters/hero-reel.webp', title: 'Showreel (placeholder)' },
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
      lead: { t: 'vimeo', id: '453608494', title: 'Selling Your Car Made Easy - CarSwitch' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['Carswitch is a Dubai (UAE) based brand that enables you to buy or sell a used car without the worry and hassle of any paperwork. It steers you clear of any shady transactions or sketchy conversations which may lead you to sell your car for a lesser value or buy a “lemon car”. My role in the project was to use playful and humorous visuals together with its branding to create these animations. The purpose of the animations was to showcase the unique features and benefits that users can enjoy with peace of mind when they use CarSwitch.'],
          media: [{ t: 'img', src: 'carswitch/intro.webp', alt: 'CarSwitch animation opening frame with the seller character and logo' }],
        },
        {
          type: 'section', title: 'Problem Identification', icon: 'diamond',
          paras: ['CarSwitch wanted to market its services and the unique advantages they offer to both vehicle buyers and sellers. For sellers, CarSwitch handles all of the problems, process and paperwork that come with selling the car. Sellers can expect to get the selling price that they want and not lose value of their car. For buyers, CarSwitch inspects and tests the cars. This way buyers know that they\'re not being sold "lemon cars". They wanted to highlight how and why all of these services set them apart from other brands in Dubai\'s used car market and that they offer a complete solution from beginning to end. Customers do not need to put in effort and instead CarSwitch does the work for them.'],
          media: [
            { t: 'img', src: 'carswitch/storyboard-2.webp', alt: 'Storyboard frame: a seller and a greedy car dealer' },
            { t: 'img', src: 'carswitch/storyboard-3.webp', alt: 'Storyboard frame: endless phone calls' },
          ],
        },
        {
          type: 'section', title: 'My Role', icon: 'club',
          paras: ['I started by first understanding the client\'s business model and their requirements for the animations including the message they wanted to get across. I was at the forefront of communicating with the client throughout the entire project. At every stage, I made sure to incorporate the client\'s feedback into the animations without compromising on the quality and aesthetic of the brand.'],
          media: [{ t: 'img', src: 'carswitch/characters.webp', alt: 'CarSwitch character sheet' }],
        },
        {
          type: 'section', title: 'Process & Problem Solving', icon: 'bolt',
          paras: ['My process started with research on the brand\'s mission, vision, values and personality which I then used to design the art direction. Presenting the storyboard to the client before starting work on the animation made sure that they had a clear idea of how the animation would look once it was complete. I also worked together with social media managers and project managers and the client. However, I also had to adhere to the constraints put around the animations (such as a limited duration) as they were to be used for YouTube ads as well.'],
          media: [
            { t: 'img', src: 'carswitch/palette.webp', alt: 'CarSwitch animation colour palette' },
            { t: 'img', src: 'carswitch/typography.webp', alt: 'CarSwitch animation typography: Comforta and Titillium' },
          ],
        },
        {
          type: 'media', layout: 'grid3', heading: 'Storyboards',
          items: [1, 4, 5].map((n) => ({ t: 'img', src: `carswitch/storyboard-${n}.webp`, alt: `CarSwitch storyboard ${n}` })),
        },
        {
          type: 'section', title: 'The Outcome', icon: 'bolt',
          bullets: ['3 animated videos for social media and YouTube.', '35k views on Instagram + Facebook.', 'Social media queries dropped by 30%.', 'Customers visiting the website increased by 50%.'],
          stats: [{ n: '3', l: 'animated videos for social media and YouTube' }, { n: '35k', l: 'views on Instagram + Facebook' }, { n: '-30%', l: 'social media queries' }, { n: '+50%', l: 'customers visiting the website' }],
          paras: ['These animations that used humour to explain CarSwitch\'s car selling and buying process; a process that was usually thought to be very boring. They communicated all of CarSwitch\'s services and benefits without coming off as an ad trying to sell a product or service while still adhering to the requirements of the brand, the client and the time limits.'],
          media: [
            { t: 'vimeo', id: '453608494', title: 'Selling Your Car Made Easy' },
            { t: 'vimeo', id: '453612550', title: 'Avoid the Chaos' },
            { t: 'vimeo', id: '453621297', title: 'Get More Value with Us' },
          ],
        },
        {
          type: 'section', title: 'Reframe', icon: 'heart',
          paras: ['CarSwitch, a Dubai based car selling platform wanted to market their services to car buyers and sellers by communicating them through engaging and humorous animations. They wanted to highlight the unique benefits that set them apart from other competitors in the market. After understanding their business model and their brand guidelines, I designed 3 motion graphics animations that explained their services in a humorous and entertaining way using characters and kinetic typography. The videos lowered queries by 30% and increased visibility of their website and brand by 50%.'],
          media: [{ t: 'img', src: 'carswitch/storyboard-6.webp', alt: 'Storyboard frame: online inspection reports rated 4.5 out of 5' }],
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
      lead: { t: 'vimeo', id: '454690781', title: 'Flatten the Curve - COVID-19 - Evercare' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['As an esteemed hospital and healthcare brand present in 6 countries, Evercare aims to provide accessible high quality health and medical care for low and middle income patients in countries with emerging markets.'],
          media: [{ t: 'img', src: 'evercare/flatten-curve.webp', alt: 'Evercare animation: the flatten the curve chart' }],
        },
        {
          type: 'media', layout: 'videos', heading: 'The Animations',
          items: [
            { t: 'vimeo', id: '454690781', title: 'Flatten the Curve - COVID-19' },
            { t: 'vimeo', id: '454699337', title: 'COVID-19 - Home Management' },
            { t: 'vimeo', id: '454697981', title: '7 Ways to Prevent COVID-19' },
            { t: 'vimeo', id: '462079199', title: 'COVID-19 - Shortness of Breath' },
          ],
        },
        {
          type: 'section', title: 'Problem Identification', icon: 'diamond',
          paras: ['As the COVID-19 pandemic started to spread quickly in Lahore and other major cities of Pakistan, there was an up-rise in cases across the country, causing panic amongst the public. People did not understand what COVID-19 was, how to avoid it and what to do if they contract it. People were confused by either an excess of information or a lack of information about COVID-19.'],
          media: [
            { t: 'img', src: 'evercare/storyboard-3.webp', alt: 'Evercare storyboard: isolating at home' },
            { t: 'img', src: 'evercare/storyboard-5.webp', alt: 'Evercare storyboard: turn away when sneezing or coughing' },
          ],
        },
        {
          type: 'section', title: 'My Role', icon: 'club',
          paras: ['I designed the art direction for the explainer animations using the brand guidelines and brand manuals that they had provided. The design of the animations also included all the characters and backgrounds. I also animated 4 different videos, with each animation explaining a different topic related to COVID-19.'],
        },
        {
          type: 'section', title: 'Process & Problem Solving', icon: 'bolt',
          paras: ['The client emphasized on visually communicating the branding of the hospital in the videos. The colours and typography of the brand needed to be at the forefront. The brand had previously used vectors illustrations and characters to communicate to its audience. I had previously used these design elements for their social media posts and graphics. Backgrounds were kept simple to avoid clutter and to focus more on the characters and the animated text. A calm background music was added to relax and de-stress the viewer.'],
        },
        {
          type: 'media', layout: 'grid2', heading: 'Colour, Typography & Assets',
          items: [
            { t: 'img', src: 'evercare/colour-typography.webp', alt: 'Evercare animation colour and typography' },
            { t: 'img', src: 'evercare/assets.webp', alt: 'Evercare animation characters, shapes and backgrounds' },
          ],
        },
        {
          type: 'media', layout: 'grid3', heading: 'Storyboards',
          items: [1, 2, 4, 6, 7, 8, 9, 10, 11, 12].map((n) => ({ t: 'img', src: `evercare/storyboard-${n}.webp`, alt: `Evercare storyboard ${n}` })),
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
      lead: { t: 'video', src: 'video/ut-launch.mp4', poster: 'img/posters/ut-launch.webp', title: 'UT Launch Video' },
      blocks: [
        {
          type: 'media', layout: 'videos', heading: 'The Videos',
          items: [
            { t: 'video', src: 'video/colabs-launch.mp4', poster: 'img/posters/colabs-launch.webp', title: 'COLABS Launch Video' },
            { t: 'video', src: 'video/treble-product.mp4', poster: 'img/posters/treble-product.webp', title: 'Treble Product Video' },
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
      lead: { t: 'video', src: 'video/startup-grind-2019.mp4', poster: 'img/posters/startup-grind-2019.webp', title: 'Startup Grind 2019' },
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
      lead: { t: 'img', src: 'pizza-now/box-1.webp', alt: 'Pizza Now pizza boxes' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['Byte Technology Systems was a Y-Combinator funded food delivery start-up based in Lahore, Pakistan. The start-up sought to utilize smartphone apps and similar technologies to help deliver good quality food to customers at affordable and accessible prices throughout the city.'],
          media: [{ t: 'img', src: 'pizza-now/storefront-wide.webp', alt: 'Pizza Now food court banner' }],
        },
        {
          type: 'section', title: 'Problem Identification', icon: 'diamond',
          paras: ['Byte wanted to create a brand to sell affordable pizzas to a Pakistani audience that\'s on a limited budget but want to treat themselves and/ or their families to pizzas. The objective was to create a mid-tier brand that appeals to the majority of fast-food consumers. The visual identity around it had to reflect the type of pizzas commonly available at bakeries and small restaurants. The visuals had to appeal to the target audience.'],
          media: [{ t: 'img', src: 'pizza-now/food-court.webp', alt: 'Pizza Now food court artwork' }],
        },
        {
          type: 'section', title: 'My Role', icon: 'club',
          paras: ['At the start of the project, the brand did not even have a name. It needed to have the word "pizza" in it and had to have something related to "quick service and delivery". I eventually came up with the name “Pizza Now”. For the visuals, I determined the look and feel of the whole brand and developed the visual identity including logos, colour palettes, typography, slogans, patterns. Additionally, I designed the social media posts and also came up with the slogans that would be the voice of the brand.'],
          media: [{ t: 'img', src: 'pizza-now/socials.webp', alt: 'Pizza Now social media posts and app screen' }],
        },
        {
          type: 'section', title: 'Process & Problem Solving', icon: 'bolt',
          paras: ['I started the design process by researching on mid-tier logo styles that mirrored the look and feel that the brand needed to express. I created mood-boards and reference boards that compiled different ideas and visual directions. Then I used the research to iterate the logos and brand identity. The colour palette was influenced by the Italian Flag (as pizza originated in Italy). These colours are also typically associated with pizza and small pizza shops. Since the brand had an aspirational nature to it, a serif font was used for the logo.'],
          media: [
            { t: 'img', src: 'pizza-now/logo-iterations.webp', alt: 'Pizza Now logo iterations' },
            { t: 'img', src: 'pizza-now/logo-evolution.webp', alt: 'Animation of the Pizza Now logo evolution' },
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
          media: [{ t: 'img', src: 'pizza-now/box-2.webp', alt: 'Pizza Now box pattern' }, { t: 'img', src: 'pizza-now/storefront.webp', alt: 'Pizza Now storefront and delivery' }],
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
      lead: { t: 'img', src: 'breakfast-box/bb-3.webp', alt: 'Breakfast Box branding with the logo on a plate of breakfast' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['Byte Technology Systems was a Y-Combinator funded food delivery start-up based in Lahore, Pakistan. The start-up sought to utilize smartphone apps and similar technologies to help deliver good quality food to customers at affordable and accessible prices throughout the city.'],
          media: [{ t: 'img', src: 'breakfast-box/bb-2.webp', alt: 'Breakfast Box on the Byte app' }],
        },
        {
          type: 'section', title: 'Problem Identification', icon: 'diamond',
          paras: ['Byte wanted to launch a new online cloud kitchen based restaurant on their app. This restaurant brand, called Breakfast Box, aimed to provide high quality intercontinental breakfast items such as croissants, pancakes, french toast, muffins, etc conveniently at affordable prices to a Pakistani audience. Byte needed branding and visual designs that would market and sell the products.'],
          media: [{ t: 'img', src: 'breakfast-box/bb-1.webp', alt: 'Breakfast Box social media posts' }],
        },
        {
          type: 'section', title: 'My Role', icon: 'club',
          paras: ['I researched on various art styles, developed initial mood boards and reference boards and used the research and data to come up with various visual directions that the brand could take for a successful launch on the app. Based on my research and the initial feedback from upper management, I refined the brand identity and presented steps on how to launch the brand on the platform. The qualities that I derived for the brand were: “premium” and “elegant” yet “playful” and “light-hearted”.'],
          media: [{ t: 'img', src: 'breakfast-box/bb-4.webp', alt: 'Breakfast Box typefaces' }],
        },
        {
          type: 'section', title: 'Process & Problem Solving', icon: 'bolt',
          paras: ['After the creative direction of the brand was finalized, I researched on the photography and aesthetics of the food products that the brand aimed to sell. This helped in creating the art direction of the brand including photography style, colours and typography. This was followed by development of the logo and other visual design collateral for the brand and its products. The logo consists of the name of the restaurant written in a rounded manner at the top. The words “Premium Continental Breakfast” are written at the bottom to signify the restaurant\'s primary offering of cuisine. At the center is an image of a stack of pancakes drawn in a style that pays homage to old etching drawings. The words ESTD and 2022 are written on either sides to show the legacy of the brand.'],
          media: [{ t: 'img', src: 'breakfast-box/bb-6.webp', alt: 'Breakfast Box logo on a hanging sign' }],
        },
        {
          type: 'section', title: 'The Outcome', icon: 'bolt',
          bullets: ['The branding resulted in around 150-200 orders per day for the next 4 months.'],
          stats: [{ n: '150-200', l: 'orders per day for the next 4 months' }],
          paras: ['The outcome was a vintage but minimal aesthetic branding style with pastel colours all of which signified a high end premium brand. The launch ready brand identity included the logo, typography, colour palette, social media strategy and sample social media posts. Vintage and pastel colours were an effective way to make breakfast, bakery and confectionery items look premium and high end.'],
          media: [{ t: 'img', src: 'breakfast-box/bb-5.webp', alt: 'Breakfast Box coffee cups' }],
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
      lead: { t: 'img', src: 'black-friday/hero-1.webp', alt: 'Black Friday sale social posts' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['Multiverse is a brand that provides unique, high quality artistic cannabis smoking products and accessories across North America with a focus on aesthetics, function and price. Their portfolio consists of three brands, Milkyway, Milkyway X and Wormhole, through which they aim to create collectable works of art, prized for their unique style, quality and craftsmanship.'],
          media: [{ t: 'img', src: 'black-friday/post-starts-1.webp', alt: 'Black Friday sale starts now post' }],
        },
        {
          type: 'section', title: 'Problem Identification', icon: 'diamond',
          paras: ['The goal of the project was to utilize and take advantage of the yearly time for Black Friday Sales across North America to market and advertise products at a time when people are looking for good deals to spend money on. The goal was to sell more products and generate more revenue. The campaign was targeted towards the brand\'s current customers as well as new customers.'],
          media: [{ t: 'img', src: 'black-friday/post-starts-2.webp', alt: 'Black Friday 25% off post' }],
        },
        {
          type: 'section', title: 'My Role', icon: 'club',
          paras: ['As the brand\'s designer, I came up with the art direction and design for the key visuals of the marketing and sales material that included marketing emails and social media posts.'],
        },
        {
          type: 'section', title: 'Process & Problem Solving', icon: 'bolt',
          paras: ['For the visuals, I introduced a new color palette and typography style. Common colours such as red had been done a lot previously, whereas turquoise was unfamiliar to the brand yet aligned with the brand values.', 'The design used the texture of the products as backgrounds, contrary to having them at the forefront. The typeface was decorated with colours and strokes to make it visually appealing to the audience. The % of the discount needed to be emphasized as it was the main selling point.'],
          media: [{ t: 'img', src: 'black-friday/post-still-on-1.webp', alt: 'Black Friday holiday post' }, { t: 'img', src: 'black-friday/post-still-on-2.webp', alt: 'Black Friday sale still on post' }],
        },
        {
          type: 'media', layout: 'scroll', heading: 'Email Newsletters', note: 'Scroll inside each email to see the full design.',
          items: [
            { t: 'scroll', src: 'black-friday/email-rewards.webp', alt: 'Black Friday rewards email' },
            { t: 'scroll', src: 'black-friday/email-starts.webp', alt: 'Black Friday sale starts email' },
            { t: 'scroll', src: 'black-friday/email-whats-left.webp', alt: 'Black Friday what\'s left email' },
          ],
        },
        {
          type: 'section', title: 'The Outcome', icon: 'bolt',
          bullets: ['Product sales increased by 60-70% for Black Friday.', 'Emails achieved a click rate of around 4.67%.'],
          stats: [{ n: '+60-70%', l: 'product sales over Black Friday' }, { n: '4.67%', l: 'email click rate' }],
          paras: ['I learned that customers are looking for good deals and discounts and will buy from companies they trust if they are getting an advantage.'],
          media: [{ t: 'img', src: 'black-friday/hero-4.webp', alt: 'Black Friday campaign on devices' }],
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
      lead: { t: 'img', src: 'collegiate-survival-sale/hero-5.webp', alt: 'Collegiate Survival Sale campaign on social and devices' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['Multiverse is a brand that provides unique, high quality artistic cannabis smoking products and accessories across North America with a focus on aesthetics, function and price. Their portfolio consists of three brands, Milkyway, Milkyway X and Wormhole, through which they aim to create collectable works of art, prized for their unique style, quality and craftsmanship.'],
          media: [{ t: 'img', src: 'collegiate-survival-sale/teaser-1.webp', alt: 'Collegiate Survival Sale teaser post' }],
        },
        {
          type: 'section', title: 'Problem Identification', icon: 'diamond',
          paras: ['Usually, at the start of the academic year, students are stressed or frustrated because of their studies and assignments and are looking to relieve their stress. Potheads and smokers use cannabis to relieve and relax themselves and the brand wanted to capitalize on this moment.', 'Milkyway wanted to sell more of its products to the young university going student demographic. They wanted to take advantage of the "Back to School" time (August/ September) when students are returning to the university after summer holidays.'],
          media: [{ t: 'img', src: 'collegiate-survival-sale/launch.webp', alt: 'Collegiate Survival Sale launch posts' }],
        },
        {
          type: 'section', title: 'My Role', icon: 'club',
          paras: ['I directed and designed the art direction of the whole campaign which included all of the digital marketing materials; emails, social media posts, animations.'],
        },
        {
          type: 'section', title: 'Process & Problem Solving', icon: 'bolt',
          paras: ['The art direction needed to be rough and chaotic with bold colors that are captivating and portray the stress of university life. The typography also needed to be just as rough and bold.', 'I took inspiration from collages that use torn paper, photographs and coloured markings. I used visuals such as papers, laptops, scribbles, stationery, eyes, mouths as decorative design elements and elements such as assignment sheets, grids and torn paper as essential background design elements. The text was arranged in a tilted fashion to show urgency and chaos.'],
          media: [{ t: 'img', src: 'collegiate-survival-sale/still-on.webp', alt: 'Collegiate Survival Sale still on posts' }],
        },
        {
          type: 'media', layout: 'grid3', heading: 'Social Posts',
          items: [
            { t: 'img', src: 'collegiate-survival-sale/teaser-2.webp', alt: 'Collegiate Survival Sale teaser' },
            { t: 'img', src: 'collegiate-survival-sale/last-call-1.webp', alt: 'Collegiate Survival Sale last call' },
            { t: 'img', src: 'collegiate-survival-sale/last-call-2.webp', alt: 'Collegiate Survival Sale last call with a hand holding a piece' },
          ],
        },
        {
          type: 'media', layout: 'scroll', heading: 'Email Newsletters', note: 'Scroll inside each email to see the full design.',
          items: [
            { t: 'scroll', src: 'collegiate-survival-sale/email-launch.webp', alt: 'Collegiate Survival Sale launch email' },
            { t: 'scroll', src: 'collegiate-survival-sale/email-last-call.webp', alt: 'Collegiate Survival Sale last call email' },
          ],
        },
        {
          type: 'section', title: 'The Outcome', icon: 'bolt',
          bullets: ['The sales increased by 3x.', 'Around 60% of the stock was sold within 5 days of the sale.', 'Approx 180 products were sold throughout the sale. 5x more than regular days.', 'Click rate achieved was 2.2%.'],
          stats: [{ n: '3x', l: 'sales' }, { n: '60%', l: 'of stock sold in 5 days' }, { n: '5x', l: 'more products sold than on a regular day (approx. 180)' }, { n: '2.2%', l: 'email click rate' }],
          paras: ['The timing of the sale and the target demographic plays an important role in selling any given product. Having the sale at the start of the academic year and targeting it towards university students paid off in terms of increased sales and greater revenue as compared to regular days. The target demographic likes to see graphics that relate to them and are tailored towards them.', 'Bold graphics with eye catching colors and typography helped to cut through the competition. It often pays off to take the sale as an opportunity to design graphics that are different from regular routine branding graphics.'],
          media: [{ t: 'img', src: 'collegiate-survival-sale/hero-6.webp', alt: 'Collegiate Survival Sale on tablet and phone' }],
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
      placeholder: true,
      summary: 'A newspaper advertisement for the launch of Generation\'s Annual Winter Sale, adapted for print, web and social media.',
      lead: { t: 'img', src: 'annual-winter-sale/final-designs.webp', alt: 'Final Annual Winter Sale designs' },
      blocks: [
        {
          type: 'section', title: 'The Brief', icon: 'spade',
          paras: ['Design a newspaper advertisement that informs customers and newspaper readers about Generation\'s Annual Winter Sale launch. Full write-up coming soon.'],
          media: [{ t: 'img', src: 'annual-winter-sale/brief.webp', alt: 'Annual Winter Sale brief, colours and typefaces' }],
        },
        {
          type: 'section', title: 'Inspirations & References', icon: 'diamond',
          paras: ['Reference artwork collected before sketching the first layouts.'],
          media: [{ t: 'scroll', src: 'annual-winter-sale/inspiration.webp', alt: 'Inspiration and reference artwork' }],
        },
        { type: 'media', layout: 'single', heading: 'Initial Attempts', items: [{ t: 'img', src: 'annual-winter-sale/initial-attempts.webp', alt: 'Initial Annual Winter Sale layout attempts' }] },
        { type: 'media', layout: 'single', heading: 'Final Designs', items: [{ t: 'img', src: 'annual-winter-sale/final-designs.webp', alt: 'Final Annual Winter Sale designs' }] },
        {
          type: 'media', layout: 'grid2', heading: 'Newspaper Adaptations',
          items: [
            { t: 'img', src: 'annual-winter-sale/banner-15cm.webp', alt: '15 cm newspaper adaptation' },
            { t: 'img', src: 'annual-winter-sale/ad-27cm.webp', alt: '27 cm newspaper adaptation' },
            { t: 'img', src: 'annual-winter-sale/newspapers.webp', alt: 'Ad in Dawn and The News newspapers' },
            { t: 'img', src: 'annual-winter-sale/dawn.webp', alt: 'Ad on the Dawn website' },
          ],
        },
        {
          type: 'media', layout: 'grid2', heading: 'Websites & Social Media',
          items: [
            { t: 'img', src: 'annual-winter-sale/website.webp', alt: 'Annual Winter Sale website banner' },
            { t: 'img', src: 'annual-winter-sale/daraz.webp', alt: 'Annual Winter Sale on Daraz' },
            { t: 'img', src: 'annual-winter-sale/facebook-ad.webp', alt: 'Annual Winter Sale Facebook ad' },
            { t: 'img', src: 'annual-winter-sale/facebook-cover.webp', alt: 'Annual Winter Sale Facebook cover' },
            { t: 'img', src: 'annual-winter-sale/web-social.webp', alt: 'Websites and social media overview' },
            { t: 'img', src: 'annual-winter-sale/templates.webp', alt: 'Social media post templates' },
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
      lead: { t: 'img', src: 'generation-magazines/covers.webp', alt: 'Three Generation magazine covers' },
      blocks: [
        {
          type: 'media', layout: 'scroll', heading: 'The Magazines', note: 'Scroll inside each magazine to see the full layout.',
          items: [
            { t: 'scroll', src: 'generation-magazines/magazine-1.webp', alt: 'Generation magazine 1 layout' },
            { t: 'scroll', src: 'generation-magazines/magazine-2.webp', alt: 'Generation magazine 2 layout' },
            { t: 'scroll', src: 'generation-magazines/magazine-3.webp', alt: 'Generation magazine 3 layout' },
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
      lead: { t: 'img', src: 'byte-app/cover.webp', alt: 'Byte app on a phone' },
      blocks: [
        {
          type: 'section', title: 'Introduction', icon: 'spade',
          paras: ['Byte Technology Systems was a Y-Combinator funded food delivery start-up based in Lahore, Pakistan. The aim of this project was to re-design the whole Byte app to make it easier in terms of usability and to make it look more visually appealing and contemporary.'],
          media: [{ t: 'img', src: 'byte-app/byte-02.webp', alt: 'Byte app introduction and user flow' }],
        },
        {
          type: 'media', layout: 'grid2', heading: 'Wireframes & Visual Design',
          items: [
            { t: 'img', src: 'byte-app/byte-03.webp', alt: 'Byte app wireframes' },
            { t: 'img', src: 'byte-app/byte-06.webp', alt: 'Byte app screens on red background' },
          ],
        },
        { type: 'media', layout: 'scroll', heading: 'Screen Designs', note: 'Scroll to see all the screens.', items: [{ t: 'scroll', src: 'byte-app/screens.webp', alt: 'Byte app screen designs: on-boarding, main menus, post order, profile and help' }] },
        {
          type: 'media', layout: 'videos', heading: 'Promo Animations',
          items: [
            { t: 'video', src: 'video/byte-order-tutorial.mp4', poster: 'img/posters/byte-order-tutorial.webp', title: 'Order Tutorial', portrait: true },
            { t: 'video', src: 'video/byte-just-5-taps.mp4', poster: 'img/posters/byte-just-5-taps.webp', title: 'Order in Just 5 Taps' },
            { t: 'video', src: 'video/byte-wheel.mp4', poster: 'img/posters/byte-wheel.webp', title: 'Wheel Animation' },
            { t: 'video', src: 'video/byte-too-much-on-food.mp4', poster: 'img/posters/byte-too-much-on-food.webp', title: 'Take a Byte' },
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
      lead: { t: 'img', src: 'tango-photos/tango-3947.webp', alt: 'Tango dancers at the Toronto Tango 8 Festival' },
      blocks: [
        {
          type: 'media', layout: 'masonry', heading: 'On the Dance Floor', note: 'Click a photo to enlarge it.',
          items: [3948, 3921, 3923, 3928, 3929, 3931, 3933, 3934, 3935, 3939, 3940, 3946, 3951, 3953, 3954, 3956, 3957, 3959, 3962, 3964, 3965, 3967, 3969]
            .map((n) => ({ t: 'img', src: `tango-photos/tango-${n}.webp`, alt: 'Dancers at the Toronto Tango 8 Festival' })),
        },
      ],
    },
  ],
};

// Projects flagged `hidden: true` stay in the data but are not shown anywhere (pages, filters, counts, search data) until the flag is removed.
window.SITE.hiddenProjects = window.SITE.projects.filter(function (p) { return p.hidden; });
window.SITE.projects = window.SITE.projects.filter(function (p) { return !p.hidden; });
