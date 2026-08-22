// Product imagery (dark, black online-meeting aesthetic — matching the brief)
export const IMG = {
  hero: "https://images.unsplash.com/photo-1586985564150-11ee04838034?w=1600&auto=format&fit=crop&q=70&ixlib=rb-4.1.0",
  meeting: "https://images.unsplash.com/photo-1766074903112-79661da9ab45?w=1600&auto=format&fit=crop&q=70&ixlib=rb-4.1.0",
  studio:
    "https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a326503e5f41201f44372f6_work-haptify-cover.jpg",
  // Cinematic product loop (provided reference)
  video: "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/100.mp4",
  // Dim "goo" background video (provided iStock reference)
  goo: "https://media.istockphoto.com/id/1458453396/video/businesswoman-discussing-during-online-meeting.mp4?s=mp4-640x640-is&k=20&c=mrlsdshP3PEHUuD01efcqUwgmnVWaA8nIiz3mgFZcnA=",
};

// ----- The story: each feature is a chapter in a narrative -----
export const STORY = [
  {
    n: "00",
    kicker: "Prologue",
    title: "The meeting, reimagined.",
    body:
      "Most calls vanish the moment they end. Aski is the room that remembers — encrypted, spoken, and written down for you, automatically.",
  },
  {
    n: "01",
    kicker: "The noise",
    title: "We forgot what was said.",
    body:
      "An hour of conversation. Dozens of decisions. Zero memory. Teams re-live the same meeting three times because nobody wrote it down.",
  },
  {
    n: "02",
    kicker: "The room",
    title: "A space that's yours alone.",
    body:
      "Spin up a persistent, encrypted room in seconds. Your keys, your rules — AI, recording and waiting room set the way you want them.",
  },
  {
    n: "03",
    kicker: "The voice",
    title: "It listens while you talk.",
    body:
      "Live transcription runs through providers you bring. Read along in real time, in any language, with speaker separation.",
  },
  {
    n: "04",
    kicker: "The note",
    title: "The summary writes itself.",
    body:
      "When the call ends, Aski distills the conversation into a crisp summary and the key decisions that actually matter.",
  },
  {
    n: "05",
    kicker: "The follow-through",
    title: "Nothing falls through.",
    body:
      "Commitments become trackable action items with owners and due dates — then sync to the tools your team already lives in.",
  },
  {
    n: "06",
    kicker: "The open door",
    title: "Book it without the back-and-forth.",
    body:
      "Share a link, set your availability, and let people walk into rooms that open themselves. LiveKit, STT, LLM, email and calendar — all yours to connect.",
  },
];

// Horizontal "film reel" of story beats (like Palomino's client reel)
export const REEL = [
  {
    tag: "Encrypt",
    title: "256-bit by default",
    text: "Every frame of your call is sealed with keys you control.",
  },
  {
    tag: "Transcribe",
    title: "Speech → text, live",
    text: "Your STT provider, your transcript, your language.",
  },
  {
    tag: "Summarize",
    title: "Decisions, not minutes",
    text: "An LLM you choose turns talk into a one-screen recap.",
  },
  {
    tag: "Assign",
    title: "Action items",
    text: "Owners and due dates captured without a word of typing.",
  },
  {
    tag: "Schedule",
    title: "Rooms that book themselves",
    text: "Availability + booking pages = time, claimed.",
  },
  {
    tag: "Connect",
    title: "Bring your own stack",
    text: "Five provider types, encrypted per user.",
  },
];

export const FEATURES = [
  {
    title: "Encrypted rooms",
    body: "Every call is sealed with keys you control. We never hold the means to watch your meetings.",
    tag: "Privacy",
  },
  {
    title: "Live AI transcript",
    body: "Speech-to-text runs through your own providers. Read along in real time, in any language.",
    tag: "Intelligence",
  },
  {
    title: "Auto summaries",
    body: "When the call ends, Aski turns the conversation into a crisp summary and key decisions.",
    tag: "Productivity",
  },
  {
    title: "Action items",
    body: "Commitments are captured as trackable tasks with owners and due dates — synced to your tools.",
    tag: "Follow-through",
  },
  {
    title: "Booking pages",
    body: "Share a link, set your availability, and let people book time in rooms that open themselves.",
    tag: "Scheduling",
  },
  {
    title: "Bring your own keys",
    body: "LiveKit, STT, LLM, email and calendar all connect through encrypted, per-user integrations.",
    tag: "Open",
  },
];

export const INTEGRATIONS = [
  { name: "LiveKit", desc: "WebRTC infrastructure for low-latency rooms." },
  { name: "Speech-to-Text", desc: "Your chosen STT provider for live captions." },
  { name: "LLM", desc: "Summaries and action-item extraction." },
  { name: "Email", desc: "Invites, reminders and recaps." },
  { name: "Calendar", desc: "Sync availability and bookings." },
];

export const STATS = [
  { value: 256, suffix: "-bit", label: "End-to-end encryption" },
  { value: 120, prefix: "<", suffix: "ms", label: "Typical join time" },
  { value: 5, suffix: "", label: "Bring-your-own providers" },
  { value: 100, suffix: "%", label: "Your keys, your data" },
];

export const PRICING = [
  {
    name: "Solo",
    price: "Free",
    blurb: "For individuals getting started.",
    features: ["1 room", "AI transcripts", "Community support"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Team",
    price: "$12",
    per: "/seat/mo",
    blurb: "For teams that live in meetings.",
    features: ["Unlimited rooms", "Auto summaries", "Action items", "Integrations"],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "For organizations with security reviews.",
    features: ["SSO / SAML", "Audit logs", "Dedicated infra", "SLA"],
    cta: "Talk to us",
    highlight: false,
  },
];

// Longer product narrative for the "about the product" section
export const PRODUCT_NARRATIVE = {
  lede: "Aski.ai is an AI-powered, end-to-end encrypted video conferencing platform built for teams who'd rather talk than type.",
  paragraphs: [
    "We started Aski because the best ideas in a company die in the gap between a meeting ending and someone writing it down. Recorders exist. Note-takers exist. But nothing joins the room, understands the conversation, and hands you the outcome — securely, and on your terms.",
    "So we built a platform where the room is encrypted by default, the intelligence is yours to plug in (bring your own LiveKit, STT and LLM), and the output is a living record: transcript, summary, decisions, and action items that travel to the tools your team already uses.",
    "The result is a meeting that doesn't evaporate. It becomes searchable, assignable, and shareable — without anyone leaving the conversation to take notes.",
  ],
};

// Real people, real rooms — provided iStock references
export const ISTOCK = {
  family:
    "https://media.istockphoto.com/id/1221656384/photo/family-and-friends-happy-moments-in-video-conference-at-home.jpg?b=1&s=612x612",
  friends:
    "https://media.istockphoto.com/id/1221246710/photo/asian-chinese-male-having-online-video-conference-with-friends.webp?a=1&b=1&s=612x612",
  connect:
    "https://media.istockphoto.com/id/1179323412/photo/a-businessman-hand-touch-on-button-to-connecting-online-network-to-contact-organization.webp?a=1&b=1&s=612x612",
};

// Detailed feature breakdown for the dedicated /features page
export const FEATURE_PAGES = [
  {
    id: "encrypted",
    tag: "Privacy",
    title: "Encrypted rooms, keys you hold",
    body: "Every frame is sealed with keys you control. Aski never holds the means to watch your meetings — zero-knowledge by architecture.",
    image: ISTOCK.family,
    points: [
      "256-bit end-to-end encryption",
      "Per-user key custody",
      "No plaintext at rest or in transit",
    ],
  },
  {
    id: "transcript",
    tag: "Intelligence",
    title: "Live AI transcript",
    body: "Speech becomes text in real time through the STT provider you connect. Speaker separation, multiple languages, searchable from the first sentence.",
    image: ISTOCK.friends,
    points: [
      "Real-time captions",
      "Bring-your-own speech-to-text",
      "Speaker labels & languages",
    ],
  },
  {
    id: "summary",
    tag: "Productivity",
    title: "Summaries that think",
    body: "When the call ends, your LLM distills the conversation into a crisp summary and the key decisions that actually matter.",
    image: IMG.studio,
    points: [
      "One-screen recap",
      "Key decisions extracted",
      "Your LLM, your prompts",
    ],
  },
  {
    id: "actions",
    tag: "Follow-through",
    title: "Action items, assigned",
    body: "Commitments become trackable tasks with owners and due dates, then sync to the tools your team already lives in.",
    image: ISTOCK.connect,
    points: [
      "Auto-captured owners",
      "Due dates & statuses",
      "Push to your stack",
    ],
  },
];

// Social links for the footer
export const SOCIAL = [
  { label: "GitHub", href: "https://github.com/MORYASSHAN", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shaan-goswami-778729274/",
    icon: "linkedin",
  },
];

