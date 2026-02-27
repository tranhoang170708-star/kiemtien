/**
 * CreatorTools Hub — tools.js
 * Core generator engine for all 5 tools.
 * Pure Vanilla JS. No frameworks. No API calls.
 *
 * Tools:
 *  1. TikTok Hook Generator
 *  2. Instagram Caption Generator
 *  3. YouTube Title Generator
 *  4. Hashtag Generator
 *  5. Script Idea Generator
 */

'use strict';

/* ============================================================
   SHARED UTILITIES
   ============================================================ */

/**
 * Pick N random items from an array (no repeats)
 * @param {Array} arr
 * @param {number} n
 * @returns {Array}
 */
function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, arr.length));
}

/**
 * Pick exactly one random item from an array
 * @param {Array} arr
 * @returns {*}
 */
function pickOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Capitalize first letter of a string
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Title-case a string
 * @param {string} str
 * @returns {string}
 */
function titleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Sanitize user input — trim + collapse whitespace
 * @param {string} str
 * @returns {string}
 */
function sanitize(str) {
  return str.trim().replace(/\s+/g, ' ');
}

/* ============================================================
   1. TIKTOK HOOK GENERATOR
   ============================================================ */

const TIKTOK_HOOK_TEMPLATES = [
  // Curiosity / Mystery
  (t) => `Nobody is talking about this ${t} secret — but you need to hear it 👀`,
  (t) => `I tried ${t} for 30 days and what happened shocked me...`,
  (t) => `The truth about ${t} that experts don't want you to know`,
  (t) => `This ${t} hack changed my life — and it takes less than 5 minutes`,
  (t) => `Wait until the end — this ${t} trick will blow your mind 🤯`,

  // Personal story / Vulnerability
  (t) => `I was terrible at ${t} until I discovered THIS...`,
  (t) => `My biggest ${t} mistake — and how I finally fixed it`,
  (t) => `I spent $0 on ${t} and got better results than people spending thousands`,
  (t) => `3 years of ${t} experience packed into a 60-second video`,
  (t) => `I wish someone told me this about ${t} when I first started`,

  // Challenge / Disbelief
  (t) => `You're doing ${t} completely wrong — here's the right way`,
  (t) => `Stop scrolling! This ${t} tip will save you so much time ⏱️`,
  (t) => `Everyone in the ${t} space is lying to you — here's the truth`,
  (t) => `If you're struggling with ${t}, this video was made for you`,
  (t) => `The ${t} method that went from 0 to viral in 48 hours`,

  // Number / List hook
  (t) => `3 ${t} mistakes you're probably making right now 🚫`,
  (t) => `5 signs you're actually good at ${t} (most people miss #3)`,
  (t) => `7 ${t} tips I wish I knew before wasting 6 months`,
  (t) => `The #1 ${t} rule that separates beginners from pros`,
  (t) => `2 ${t} secrets the top 1% use that nobody else talks about`,

  // Trending / FOMO
  (t) => `This ${t} trend is blowing up right now — get in early 🔥`,
  (t) => `Why everyone is suddenly obsessed with ${t} (I tested it)`,
  (t) => `The ${t} strategy that's getting millions of views in 2024`,
  (t) => `POV: You finally figured out ${t} after years of failing`,
  (t) => `The viral ${t} method — explained in under 60 seconds`,

  // Question-based
  (t) => `What if I told you ${t} was 10x easier than you think? 👇`,
  (t) => `Have you ever wondered why your ${t} isn't working? Watch this.`,
  (t) => `Can you actually make money from ${t}? Let's find out 💰`,
  (t) => `Is ${t} really worth it? I tested it so you don't have to`,
  (t) => `What nobody tells you before you start with ${t} 😬`,

  // Instructional / Value
  (t) => `How I mastered ${t} without spending a single dollar`,
  (t) => `The step-by-step ${t} system that actually works in 2024`,
  (t) => `Copy this exact ${t} formula — results guaranteed ✅`,
  (t) => `The lazy person's guide to crushing ${t} 😅`,
  (t) => `From zero to expert in ${t} — here's the fastest path`,

  // Emotional / Relatable
  (t) => `If you've ever felt lost with ${t}, this one's for you 💛`,
  (t) => `That moment when ${t} finally clicks — this is how it happens`,
  (t) => `The ${t} reality check nobody in this space gives you`,
  (t) => `Honest review: Is ${t} actually as good as everyone says?`,
  (t) => `The ${t} mindset shift that changes absolutely everything`,
];

/**
 * Generate TikTok hooks
 * @param {string} topic
 * @param {number} [count=10]
 * @returns {string[]}
 */
function generateTikTokHooks(topic, count = 10) {
  if (!topic) return [];
  const t = sanitize(topic.toLowerCase());
  const selected = pickRandom(TIKTOK_HOOK_TEMPLATES, count);
  return selected.map(fn => fn(t));
}

/* ============================================================
   2. INSTAGRAM CAPTION GENERATOR
   ============================================================ */

const IG_EMOJIS = {
  positive: ['✨', '💫', '🌟', '⭐', '🎉', '🙌', '💪', '🔥', '❤️', '💛', '💚', '💙', '💜'],
  lifestyle: ['☀️', '🌿', '🌸', '🍃', '🌊', '🏔️', '🌙', '🌈', '🍀', '🦋', '🌺', '🪴'],
  business:  ['💼', '📈', '💰', '🚀', '🎯', '✅', '💡', '🔑', '⚡', '🏆'],
  food:      ['🍕', '☕', '🍜', '🥗', '🍰', '🍷', '🥤', '🍣', '🧁', '🥑'],
  fitness:   ['💪', '🏋️', '🏃', '🧘', '🥊', '⚡', '🔥', '🏅', '🎽', '🦾'],
  travel:    ['✈️', '🗺️', '🏖️', '🗼', '🌍', '🧳', '📸', '🌅', '🏕️', '🛫'],
};

const IG_CTAS = [
  'Drop a ❤️ if you agree!',
  'Save this post for later! 📌',
  'Tag someone who needs to see this 👇',
  'Follow for more content like this!',
  'What do you think? Comment below! 👇',
  'Share this with a friend who needs it!',
  'Double tap if this resonates with you 💫',
  'Tell me your thoughts in the comments!',
  'Link in bio for more! 🔗',
  'Slide into my DMs if you have questions 📩',
];

const IG_SHORT_OPENERS = [
  (t) => `${t}. That's it. That's the post.`,
  (t) => `Some days it's all about ${t}.`,
  (t) => `Just here to talk about ${t}. 👇`,
  (t) => `${capitalize(t)} season is officially here.`,
  (t) => `Not all heroes wear capes. Some just master ${t}.`,
  (t) => `${capitalize(t)} > everything else.`,
  (t) => `Real talk: ${t} is underrated.`,
  (t) => `Obsessed with ${t} lately and I don't care who knows it.`,
  (t) => `Plot twist: ${t} was the answer all along.`,
  (t) => `Today's vibe: ${t}. Tomorrow's vibe: more ${t}.`,
];

const IG_ENGAGING_TEMPLATES = [
  (t) => `Can we talk about ${t} for a second? 👀\n\nI've been on this journey for a while now, and I keep coming back to one thing: it's not about being perfect — it's about showing up consistently.\n\nWhether you're just starting out or you've been deep in the ${t} world for years, remember: progress > perfection. Every. Single. Time.\n\nWhat's your biggest challenge with ${t} right now? Drop it below — I read every comment! 👇`,

  (t) => `Here's the thing about ${t} that nobody tells you...\n\nIt's not glamorous. It's not always easy. But it is 100% worth it.\n\nI've made every mistake in the book, spent hours figuring out what works, and finally cracked the code. And I'm here to share it all with you.\n\nBecause we grow better together. 💫\n\nAre you currently working on your ${t} game? Let me know below!`,

  (t) => `Real question: are you getting the results you want from ${t}?\n\nIf not, you're not alone. I was stuck for months before I changed my approach.\n\nThe secret? Consistency + the right strategy + a community that keeps you accountable.\n\nSave this post as a reminder that you're exactly where you need to be on your ${t} journey. 📌\n\nComment "YES" if you're committed to leveling up! 👇`,
];

const IG_STORYTELLING_TEMPLATES = [
  (t) => `Let me tell you something I don't share very often...\n\nWhen I first started with ${t}, I had absolutely no idea what I was doing. I was overwhelmed, underprepared, and honestly — embarrassed by how far behind I felt.\n\nBut then something shifted. I stopped comparing my chapter 1 to everyone else's chapter 20. I focused on learning one thing at a time. I asked for help when I needed it.\n\nFast forward to today: ${t} is something I genuinely love. Something that challenged me, changed me, and made me grow.\n\nIf you're at the beginning of your ${t} journey, I want you to know: the confusion doesn't last forever. The clarity comes. Just keep going. 💛\n\n#${t.replace(/\s+/g, '')} #PersonalGrowth #CreatorJourney`,

  (t) => `Three years ago, I made a decision that changed everything.\n\nI decided to take ${t} seriously — not as a hobby, not as something I'd "get to someday" — but as a real priority.\n\nPeople thought I was crazy. Why would anyone invest so much time and energy into ${t}? Wouldn't it be easier to just... not?\n\nBut here's what they didn't see: the late nights, the lessons, the small wins stacking up into something bigger than I imagined.\n\nToday, ${t} isn't just something I do. It's part of who I am. And I wouldn't trade that growth for anything.\n\nWhat's something that changed you? Tell me in the comments. 💬`,
];

/**
 * Generate Instagram captions (3 variants)
 * @param {string} topic
 * @returns {{short: string, engaging: string, storytelling: string}}
 */
function generateInstagramCaptions(topic) {
  if (!topic) return null;
  const t = sanitize(topic.toLowerCase());
  const emoji1 = pickOne(IG_EMOJIS.positive);
  const emoji2 = pickOne(IG_EMOJIS.lifestyle);
  const cta = pickOne(IG_CTAS);

  const shortOpener = pickOne(IG_SHORT_OPENERS)(t);
  const short = `${shortOpener} ${emoji1}\n\n${cta}`;

  const engaging = pickOne(IG_ENGAGING_TEMPLATES)(t);
  const storytelling = pickOne(IG_STORYTELLING_TEMPLATES)(t);

  return { short, engaging, storytelling };
}

/* ============================================================
   3. YOUTUBE TITLE GENERATOR
   ============================================================ */

const YT_TITLE_TEMPLATES = [
  // Curiosity Gap
  (k) => `I Tried ${titleCase(k)} for 30 Days — Here's What Happened`,
  (k) => `The ${titleCase(k)} Secret Nobody Is Talking About`,
  (k) => `What They DON'T Tell You About ${titleCase(k)}`,
  (k) => `I Tested Every ${titleCase(k)} Method — Here Are the Results`,
  (k) => `The Truth About ${titleCase(k)} (This Surprised Me)`,

  // Listicles
  (k) => `7 ${titleCase(k)} Tips That Actually Work in 2024`,
  (k) => `10 ${titleCase(k)} Mistakes You're Probably Making Right Now`,
  (k) => `5 ${titleCase(k)} Strategies the Pros Use (But Never Share)`,
  (k) => `The Top 3 ${titleCase(k)} Hacks for Beginners`,
  (k) => `9 Things I Wish I Knew Before Starting ${titleCase(k)}`,

  // How-To / Tutorial
  (k) => `How to Master ${titleCase(k)} in 2024 (Complete Beginner's Guide)`,
  (k) => `${titleCase(k)} for Beginners: Everything You Need to Know`,
  (k) => `How I Grew From 0 to Expert in ${titleCase(k)} (Step-by-Step)`,
  (k) => `The Ultimate ${titleCase(k)} Tutorial — Watch This Before Starting`,
  (k) => `How to Actually Get Results With ${titleCase(k)} (No Fluff)`,

  // Emotional / Stakes
  (k) => `${titleCase(k)} Changed My Life — Here's How It Can Change Yours`,
  (k) => `I Almost Quit ${titleCase(k)} — Until I Discovered This`,
  (k) => `Why Most People Fail at ${titleCase(k)} (And How to Succeed)`,
  (k) => `The ${titleCase(k)} Strategy That Made Me $10,000`,
  (k) => `Honest Review: Is ${titleCase(k)} Actually Worth It?`,

  // Comparison / Versus
  (k) => `${titleCase(k)}: Free vs. Paid — Which One is Better?`,
  (k) => `I Spent 6 Months on ${titleCase(k)} So You Don't Have To`,
  (k) => `Best ${titleCase(k)} Methods Compared (2024 Edition)`,
  (k) => `${titleCase(k)} Then vs. Now — What's Actually Changed?`,
  (k) => `The BEST ${titleCase(k)} Strategy vs. The WORST — Side by Side`,

  // Controversy / Bold Claims
  (k) => `Unpopular Opinion: Why ${titleCase(k)} is Overrated`,
  (k) => `Everyone Is Wrong About ${titleCase(k)} (Here's the Proof)`,
  (k) => `The Biggest ${titleCase(k)} Lie You've Been Told`,
  (k) => `Stop Doing ${titleCase(k)} Like This — Do This Instead`,
  (k) => `${titleCase(k)} Is Dead — What's Actually Working in 2024`,

  // Case Study / Results
  (k) => `How I Used ${titleCase(k)} to 10x My Results in 90 Days`,
  (k) => `${titleCase(k)} Case Study: From Zero to Results in 60 Days`,
  (k) => `Reacting to the WORST ${titleCase(k)} Advice on the Internet`,
  (k) => `I Followed a ${titleCase(k)} Expert's Advice for 30 Days — WOW`,
  (k) => `The ${titleCase(k)} Method That Got Me 1 Million Views`,
];

/**
 * Generate YouTube titles
 * @param {string} keyword
 * @param {number} [count=10]
 * @returns {string[]}
 */
function generateYouTubeTitles(keyword, count = 10) {
  if (!keyword) return [];
  const k = sanitize(keyword);
  const selected = pickRandom(YT_TITLE_TEMPLATES, count);
  return selected.map(fn => fn(k));
}

/* ============================================================
   4. HASHTAG GENERATOR
   ============================================================ */

/**
 * Build a dynamic hashtag set from a keyword
 * Categories: Mega (1M+), Macro (100K–1M), Micro (10K–100K), Niche (<10K)
 * @param {string} keyword
 * @returns {{ mega: string[], macro: string[], micro: string[], niche: string[] }}
 */
function generateHashtags(keyword) {
  if (!keyword) return null;

  const k = sanitize(keyword.toLowerCase()).replace(/\s+/g, '');
  const kWords = sanitize(keyword.toLowerCase()).split(' ');
  const kTitle = kWords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');

  // Mega hashtags (platform-wide reach, 1M+ posts)
  const megaPool = [
    '#viral', '#trending', '#foryou', '#fyp', '#explore',
    '#contentcreator', '#smallbusiness', '#motivation', '#lifestyle',
    '#instagood', '#love', '#photooftheday', '#reels', '#instagram',
    '#youtube', '#tiktok', '#socialmedia', '#marketing', '#entrepreneur',
  ];

  // Macro hashtags (topic-adjacent, 100K–1M)
  const macroPool = [
    `#${k}tips`,
    `#${k}life`,
    `#${k}community`,
    `#${k}lover`,
    `#${k}goals`,
    `#${k}journey`,
    '#contentmarketing',
    '#digitalcreator',
    '#growthmindset',
    '#onlinebusiness',
    '#personalbranding',
    '#creatoreconomy',
    '#socialmediamarketing',
    '#contentcreation',
  ];

  // Micro hashtags (specific, 10K–100K)
  const microPool = [
    `#${k}hacks`,
    `#${k}advice`,
    `#${k}101`,
    `#${k}strategy`,
    `#${k}secrets`,
    `#${k}results`,
    `#${k}motivation`,
    `#${k}inspiration`,
    `#learn${k}`,
    `#${k}training`,
    `#${k}guide`,
    `#${k}masterclass`,
  ];

  // Niche hashtags (highly targeted, <10K)
  const nichePool = [
    `#${k}creator`,
    `#${k}expert`,
    `#${k}nerd`,
    `#${k}obsessed`,
    `#${k}daily`,
    `#${k}pro`,
    `#${kTitle}Gang`,
    `#${kTitle}Life`,
    `#${kTitle}Nation`,
    `#${kTitle}Club`,
  ];

  return {
    mega:  pickRandom(megaPool, 5),
    macro: pickRandom(macroPool, 6),
    micro: pickRandom(microPool, 5),
    niche: pickRandom(nichePool, 4),
  };
}

/* ============================================================
   5. SCRIPT IDEA GENERATOR
   ============================================================ */

const SCRIPT_HOOKS = [
  (n) => `Open with a shocking statistic about ${n} that stops the scroll`,
  (n) => `Start with a relatable struggle: "I used to be terrible at ${n}..."`,
  (n) => `Jump straight to the controversial take: "Everything you know about ${n} is wrong"`,
  (n) => `Open with a bold promise: "In the next 60 seconds, I'll teach you everything you need about ${n}"`,
  (n) => `Lead with a question: "What if the reason you're failing at ${n} is something you've never considered?"`,
  (n) => `Open mid-action: Show the end result of your ${n} work first, then say "Let me show you how I did it"`,
  (n) => `Start with social proof: "This ${n} strategy got me [X] results — here's exactly how"`,
  (n) => `Use a countdown: "3 things about ${n} that nobody wants to admit... #3 will surprise you"`,
  (n) => `Recreate a relatable fail: "Me before I understood ${n}" [pause] "Me after" — then reveal the shift`,
  (n) => `Pattern interrupt: Start with something completely unrelated to ${n}, then snap-cut to your main point`,
];

const SCRIPT_BODIES = [
  (n) => `Break down the top 3 common mistakes people make in ${n}. For each mistake: name it, show why it fails, then give the correction. Use text overlays for each point.`,
  (n) => `Walk through your personal step-by-step system for ${n}. Keep it to 3–5 steps max. Be specific — use numbers, percentages, or timeframes to make each step feel actionable.`,
  (n) => `Use the "Before/After" structure: show the struggle phase of ${n}, explain the key turning point, then reveal the transformation. Make the middle moment vivid and specific.`,
  (n) => `Do a rapid-fire tip delivery: give 5 bite-sized ${n} tips in under 30 seconds. Each tip gets 3–5 seconds max. Use jump cuts and text overlays to maintain pace.`,
  (n) => `Tell a mini case study about a real (or hypothetical) person who struggled with ${n}, found your method, and got measurable results. Include a specific number or outcome.`,
  (n) => `Use the "myth vs. reality" format: bust 3 popular myths about ${n} and replace each with the real truth. This builds authority while delivering massive value.`,
  (n) => `Do a "day in the life" style breakdown showing exactly how you implement ${n} in real time. Show the tools, the decisions, and the small details others skip.`,
  (n) => `Teach the single most important concept in ${n} that most people overlook. Go deep on one thing instead of shallow on many. Use a simple analogy to make it stick.`,
];

const SCRIPT_CTAS = [
  (n) => `End with: "If you want to go deeper on ${n}, follow me — I post new strategies every week."`,
  (n) => `Close with: "Save this video for later — you'll want to rewatch it when you're actually working on ${n}."`,
  (n) => `Finish with a comment prompt: "Tell me your biggest challenge with ${n} in the comments — I'll reply to every one."`,
  (n) => `Use a cliffhanger: "That's just step 1. Tomorrow I'm posting the part 2 that most ${n} creators never figure out."`,
  (n) => `End with a challenge: "Try this ${n} method for 7 days and come back to tell me your results."`,
  (n) => `Close with social proof + follow: "Over [X] people already used this ${n} system. Follow so you don't miss the next one."`,
  (n) => `Finish with a freebie offer: "I made a free checklist for everything I covered about ${n} — link in bio."`,
  (n) => `End with a duet/stitch invite: "Try this ${n} method and stitch this video with your results!"`,
];

const SCRIPT_TITLES = [
  (n) => `The ${titleCase(n)} Formula That Actually Works`,
  (n) => `Why You're Getting ${titleCase(n)} Wrong (And How to Fix It)`,
  (n) => `${titleCase(n)} in 60 Seconds — The No-Fluff Version`,
  (n) => `The ${titleCase(n)} Secret That Changed Everything For Me`,
  (n) => `Stop Making These ${titleCase(n)} Mistakes`,
  (n) => `The Fastest Way to Learn ${titleCase(n)} From Scratch`,
  (n) => `${titleCase(n)}: What Nobody Tells You`,
  (n) => `I Tested Every ${titleCase(n)} Strategy So You Don't Have To`,
  (n) => `My ${titleCase(n)} System — Step By Step`,
  (n) => `The Honest Truth About ${titleCase(n)}`,
];

/**
 * Generate script ideas
 * @param {string} niche
 * @param {number} [count=5]
 * @returns {Array<{id: number, title: string, hook: string, body: string, cta: string}>}
 */
function generateScriptIdeas(niche, count = 5) {
  if (!niche) return [];
  const n = sanitize(niche.toLowerCase());

  const hooks  = pickRandom(SCRIPT_HOOKS, count);
  const bodies = pickRandom(SCRIPT_BODIES, count);
  const ctas   = pickRandom(SCRIPT_CTAS, count);
  const titles = pickRandom(SCRIPT_TITLES, count);

  return Array.from({ length: count }, (_, i) => ({
    id:    i + 1,
    title: titles[i](n),
    hook:  hooks[i](n),
    body:  bodies[i](n),
    cta:   ctas[i](n),
  }));
}

/* ============================================================
   DOM RENDERERS
   Each tool page calls its own init function on DOMContentLoaded.
   ============================================================ */

/* ------ SHARED: Copy icon SVG ------ */
const COPY_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;

/* ============================================================
   TOOL 1 — TIKTOK HOOK GENERATOR UI
   ============================================================ */

function initTikTokTool() {
  const form       = document.getElementById('tiktok-form');
  const topicInput = document.getElementById('tiktok-topic');
  const generateBtn= document.getElementById('tiktok-generate');
  const outputArea = document.getElementById('tiktok-output');
  const copyAllBtn = document.getElementById('tiktok-copy-all');

  if (!form || !topicInput || !generateBtn || !outputArea) return;

  let lastResults = [];

  function render(results) {
    lastResults = results;
    outputArea.classList.remove('output-area--empty');

    outputArea.innerHTML = `<ol class="output-list" aria-label="Generated TikTok hooks" role="list">
      ${results.map((text, i) => `
        <li class="output-item" role="listitem">
          <span class="output-item__number" aria-hidden="true">${i + 1}</span>
          <p class="output-item__text">${escapeHTML(text)}</p>
          <button
            class="copy-btn"
            data-copy="${escapeAttr(text)}"
            aria-label="Copy hook ${i + 1} to clipboard"
          >${COPY_ICON} Copy</button>
        </li>
      `).join('')}
    </ol>`;

    if (copyAllBtn) copyAllBtn.style.display = 'inline-flex';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const topic = topicInput.value.trim();
    if (!topic) {
      topicInput.focus();
      return;
    }

    window.CTH.setButtonLoading(generateBtn);

    // Simulated async feel
    setTimeout(() => {
      const results = generateTikTokHooks(topic, 10);
      render(results);
      window.CTH.resetButtonLoading(generateBtn);
      outputArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 600);
  });

  if (copyAllBtn) {
    copyAllBtn.addEventListener('click', async () => {
      if (!lastResults.length) return;
      const text = lastResults.map((h, i) => `${i + 1}. ${h}`).join('\n\n');
      const ok = await window.CTH.copyToClipboard(text);
      if (ok) {
        window.CTH.showCopiedFeedback(copyAllBtn);
        window.CTH.showToast('All hooks copied to clipboard!', 'success');
      }
    });
  }
}

/* ============================================================
   TOOL 2 — INSTAGRAM CAPTION GENERATOR UI
   ============================================================ */

function initInstagramTool() {
  const form       = document.getElementById('ig-form');
  const topicInput = document.getElementById('ig-topic');
  const generateBtn= document.getElementById('ig-generate');
  const outputArea = document.getElementById('ig-output');

  if (!form || !topicInput || !generateBtn || !outputArea) return;

  function renderCaption(id, label, text, badgeClass) {
    return `
      <div class="output-item" style="flex-direction: column; align-items: stretch; gap: var(--sp-3);">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--sp-2);">
          <span class="badge ${badgeClass}" style="text-transform: uppercase; letter-spacing: 0.05em;">${label}</span>
          <button
            class="copy-btn"
            data-copy="${escapeAttr(text)}"
            aria-label="Copy ${label} caption to clipboard"
          >${COPY_ICON} Copy</button>
        </div>
        <p class="output-item__text" style="white-space: pre-line;">${escapeHTML(text)}</p>
      </div>
    `;
  }

  function render(captions) {
    outputArea.classList.remove('output-area--empty');
    outputArea.innerHTML = `
      <div class="output-list" aria-label="Generated Instagram captions">
        ${renderCaption('short', '✍️ Short & Punchy', captions.short, 'badge-primary')}
        ${renderCaption('engaging', '💬 Engaging', captions.engaging, 'badge-warning')}
        ${renderCaption('story', '📖 Story-telling', captions.storytelling, 'badge-success')}
      </div>
    `;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const topic = topicInput.value.trim();
    if (!topic) { topicInput.focus(); return; }

    window.CTH.setButtonLoading(generateBtn);

    setTimeout(() => {
      const captions = generateInstagramCaptions(topic);
      render(captions);
      window.CTH.resetButtonLoading(generateBtn);
      outputArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 600);
  });
}

/* ============================================================
   TOOL 3 — YOUTUBE TITLE GENERATOR UI
   ============================================================ */

function initYouTubeTool() {
  const form       = document.getElementById('yt-form');
  const kwInput    = document.getElementById('yt-keyword');
  const generateBtn= document.getElementById('yt-generate');
  const outputArea = document.getElementById('yt-output');
  const copyAllBtn = document.getElementById('yt-copy-all');

  if (!form || !kwInput || !generateBtn || !outputArea) return;

  let lastResults = [];

  function render(results) {
    lastResults = results;
    outputArea.classList.remove('output-area--empty');

    outputArea.innerHTML = `<ol class="output-list" aria-label="Generated YouTube titles" role="list">
      ${results.map((text, i) => `
        <li class="output-item" role="listitem">
          <span class="output-item__number" aria-hidden="true">${i + 1}</span>
          <p class="output-item__text">${escapeHTML(text)}</p>
          <button
            class="copy-btn"
            data-copy="${escapeAttr(text)}"
            aria-label="Copy title ${i + 1} to clipboard"
          >${COPY_ICON} Copy</button>
        </li>
      `).join('')}
    </ol>`;

    if (copyAllBtn) copyAllBtn.style.display = 'inline-flex';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const keyword = kwInput.value.trim();
    if (!keyword) { kwInput.focus(); return; }

    window.CTH.setButtonLoading(generateBtn);

    setTimeout(() => {
      const results = generateYouTubeTitles(keyword, 10);
      render(results);
      window.CTH.resetButtonLoading(generateBtn);
      outputArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 600);
  });

  if (copyAllBtn) {
    copyAllBtn.addEventListener('click', async () => {
      if (!lastResults.length) return;
      const text = lastResults.map((t, i) => `${i + 1}. ${t}`).join('\n');
      const ok = await window.CTH.copyToClipboard(text);
      if (ok) {
        window.CTH.showCopiedFeedback(copyAllBtn);
        window.CTH.showToast('All titles copied!', 'success');
      }
    });
  }
}

/* ============================================================
   TOOL 4 — HASHTAG GENERATOR UI
   ============================================================ */

function initHashtagTool() {
  const form       = document.getElementById('hashtag-form');
  const kwInput    = document.getElementById('hashtag-keyword');
  const generateBtn= document.getElementById('hashtag-generate');
  const outputArea = document.getElementById('hashtag-output');
  const copyAllBtn = document.getElementById('hashtag-copy-all');

  if (!form || !kwInput || !generateBtn || !outputArea) return;

  let allHashtags = [];

  function render(result) {
    const { mega, macro, micro, niche } = result;
    allHashtags = [...mega, ...macro, ...micro, ...niche];
    outputArea.classList.remove('output-area--empty');

    function renderGroup(label, tags, sizeLabel) {
      return `
        <div>
          <p class="hashtag-category">${label} <span style="font-weight:400; text-transform:none; letter-spacing:0;">(${sizeLabel})</span></p>
          <div class="hashtag-cloud">
            ${tags.map(tag => `
              <button
                class="hashtag-tag"
                data-tag="${escapeAttr(tag)}"
                aria-label="Copy ${tag}"
                title="Click to copy"
              >${escapeHTML(tag)}</button>
            `).join('')}
          </div>
        </div>
      `;
    }

    outputArea.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: var(--sp-5);">
        ${renderGroup('🔥 Mega', mega, '1M+ posts')}
        ${renderGroup('📢 Macro', macro, '100K–1M posts')}
        ${renderGroup('🎯 Micro', micro, '10K–100K posts')}
        ${renderGroup('💎 Niche', niche, 'Under 10K posts')}
      </div>
    `;

    if (copyAllBtn) copyAllBtn.style.display = 'inline-flex';

    // Individual tag click to copy
    outputArea.querySelectorAll('.hashtag-tag').forEach(tagBtn => {
      tagBtn.addEventListener('click', async () => {
        const tag = tagBtn.dataset.tag;
        const ok = await window.CTH.copyToClipboard(tag);
        if (ok) {
          tagBtn.classList.add('copied-single');
          const prev = tagBtn.textContent;
          tagBtn.textContent = '✓ Copied!';
          setTimeout(() => {
            tagBtn.classList.remove('copied-single');
            tagBtn.textContent = prev;
          }, 1500);
        }
      });
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const keyword = kwInput.value.trim();
    if (!keyword) { kwInput.focus(); return; }

    window.CTH.setButtonLoading(generateBtn);

    setTimeout(() => {
      const result = generateHashtags(keyword);
      render(result);
      window.CTH.resetButtonLoading(generateBtn);
      outputArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 600);
  });

  if (copyAllBtn) {
    copyAllBtn.addEventListener('click', async () => {
      if (!allHashtags.length) return;
      const text = allHashtags.join(' ');
      const ok = await window.CTH.copyToClipboard(text);
      if (ok) {
        window.CTH.showCopiedFeedback(copyAllBtn);
        window.CTH.showToast('All 20 hashtags copied!', 'success');
      }
    });
  }
}

/* ============================================================
   TOOL 5 — SCRIPT IDEA GENERATOR UI
   ============================================================ */

function initScriptTool() {
  const form       = document.getElementById('script-form');
  const nicheInput = document.getElementById('script-niche');
  const generateBtn= document.getElementById('script-generate');
  const outputArea = document.getElementById('script-output');

  if (!form || !nicheInput || !generateBtn || !outputArea) return;

  function render(ideas) {
    outputArea.classList.remove('output-area--empty');

    outputArea.innerHTML = `
      <div class="output-list" aria-label="Generated script ideas">
        ${ideas.map(idea => `
          <div class="script-card">

            <div class="script-card__head">
              <span class="script-card__num">Idea #${idea.id}</span>
              <strong style="font-family: var(--font-heading); font-size: var(--fs-base); color: var(--color-text-heading); flex: 1; padding-inline: var(--sp-3);">${escapeHTML(idea.title)}</strong>
              <button
                class="copy-btn"
                data-copy="${escapeAttr(`TITLE: ${idea.title}\n\nHOOK:\n${idea.hook}\n\nBODY:\n${idea.body}\n\nCTA:\n${idea.cta}`)}"
                aria-label="Copy full script idea ${idea.id}"
              >${COPY_ICON} Copy All</button>
            </div>

            <div class="script-card__body">

              <div class="script-section">
                <span class="script-section__badge badge-hook">🎣 Hook</span>
                <p class="script-section__text">${escapeHTML(idea.hook)}</p>
              </div>

              <div class="script-section">
                <span class="script-section__badge badge-body">📦 Body</span>
                <p class="script-section__text">${escapeHTML(idea.body)}</p>
              </div>

              <div class="script-section">
                <span class="script-section__badge badge-cta">📣 CTA</span>
                <p class="script-section__text">${escapeHTML(idea.cta)}</p>
              </div>

            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const niche = nicheInput.value.trim();
    if (!niche) { nicheInput.focus(); return; }

    window.CTH.setButtonLoading(generateBtn);

    setTimeout(() => {
      const ideas = generateScriptIdeas(niche, 5);
      render(ideas);
      window.CTH.resetButtonLoading(generateBtn);
      outputArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 700);
  });
}

/* ============================================================
   SECURITY HELPERS
   ============================================================ */

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ============================================================
   AUTO-INIT based on page
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Detect which tool page we're on and init accordingly
  if (document.getElementById('tiktok-form'))   initTikTokTool();
  if (document.getElementById('ig-form'))        initInstagramTool();
  if (document.getElementById('yt-form'))        initYouTubeTool();
  if (document.getElementById('hashtag-form'))   initHashtagTool();
  if (document.getElementById('script-form'))    initScriptTool();
});

/* ============================================================
   PUBLIC API (for inline page scripts if needed)
   ============================================================ */

window.CTH_TOOLS = {
  generateTikTokHooks,
  generateInstagramCaptions,
  generateYouTubeTitles,
  generateHashtags,
  generateScriptIdeas,
};
