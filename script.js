
/* ============================================================
   RuleBot — a rule-based chatbot
   Core requirement fulfilled: greetings + exit handling, plain
   if/else decision logic, and a continuous request/response
   loop (each submit is one iteration of that loop, same as a
   `while True:` prompt loop in a console version).
   ============================================================ */

// ---------- 1. Canned response data, per language ----------
const TEXT = {
  en: { dir:'ltr', name:'RuleBot', sub:'if / else — decision engine',
    title:'Talking to', historyLabel:'ASKED SO FAR', empty:'Nothing yet. Say hello to start.',
    placeholder:'Type a message...', send:'Send', clear:'CLEAR HISTORY',
    hints:['hello','help','joke','fact','compliment','time','bye'],
    R: {
      greeting: ["Hey there! 👋 I'm RuleBot. Type 'help' to see what I can do.", "Hi! 😊 Ask me something, or type 'help' for a list of commands.", "Hello! 🤖 Ready when you are."],
      exit: ["Goodbye! 👋 Refresh the page to start a new session.", "Session ended. Bye for now! ✨", "See you later! 🙌 Thanks for chatting."],
      wellbeing: ["I'm just a set of if/else rules, but I'm running fine! ⚙️ You?", "Doing great, 100% uptime today. 📈 How about you?"],
      identity: ["I'm RuleBot 🤖 — a simple rule-based chatbot, no AI model involved, just keyword matching.", "RuleBot here 🧠 — I answer using plain if/else logic, nothing fancier."],
      fact: ["Fun fact: the first computer bug was an actual moth stuck in a relay in 1947. 🦋🖥️", "Fun fact: 'Hello, World!' as a first program dates back to a 1972 Bell Labs memo. 👋💻", "Fun fact: your keyboard's QWERTY layout was designed to slow typists down, not speed them up. ⌨️"],
      compliment: ["Aw, thank you! 🥰 That made my circuits happy.", "You're pretty great yourself! ✨😄"],
      help: ["I can respond to: greetings, 'how are you', 'your name', 'time', 'date', 'fact', 'joke', a compliment, 'thanks', and 'bye' to exit. 📋"],
      time: ["Right now it's ⏰ {time}."],
      date: ["Today's date is 📅 {date}."],
      joke: ["Why do programmers prefer dark mode? Because light attracts bugs. 🐛💡", "I would tell you a UDP joke, but you might not get it. 📡😄", "There are 10 types of people: those who understand binary and those who don't. 😅"],
      thanks: ["You're welcome! 🙌", "Anytime! 😊", "Happy to help! 🤝"],
      fallback: ["I don't have a rule for that yet 🤔. Try 'help' to see what I understand.", "Hmm, that's outside my rule table 📋. Type 'help' for options."]
    }
  },
  ur: { dir:'rtl', name:'RuleBot', sub:'اگر / ورنہ — فیصلہ ساز نظام',
    title:'گفتگو جاری ہے', historyLabel:'اب تک پوچھے گئے سوالات', empty:'ابھی کچھ نہیں۔ سلام کہہ کر شروع کریں۔',
    placeholder:'یہاں لکھیں...', send:'بھیجیں', clear:'تاریخ صاف کریں',
    hints:['سلام','مدد','لطیفہ','معلومات','تعریف','وقت','خدا حافظ'],
    R: {
      greeting: ["وعلیکم السلام! 👋 میں RuleBot ہوں۔ 'مدد' لکھ کر دیکھیں میں کیا کر سکتا ہوں۔", "ہیلو! 😊 کچھ پوچھیں یا 'مدد' لکھیں۔"],
      exit: ["خدا حافظ! 👋 نیا سیشن شروع کرنے کے لیے صفحہ ریفریش کریں۔", "سیشن ختم ہوا۔ پھر ملیں گے! ✨"],
      wellbeing: ["میں صرف اگر/ورنہ اصولوں کا مجموعہ ہوں، مگر ٹھیک چل رہا ہوں! ⚙️ آپ کیسے ہیں؟"],
      identity: ["میں RuleBot ہوں 🤖 — ایک سادہ rule-based چیٹ بوٹ، کوئی AI ماڈل شامل نہیں۔"],
      fact: ["دلچسپ معلومات: پہلا کمپیوٹر 'بگ' 1947 میں ایک حقیقی پتنگا تھا! 🦋🖥️"],
      compliment: ["شکریہ! 🥰 آپ نے میرا دن بنا دیا۔"],
      help: ["میں جواب دے سکتا ہوں: سلام، 'کیسے ہو', 'نام', 'وقت', 'تاریخ', 'معلومات', 'لطیفہ', تعریف، 'شکریہ', اور نکلنے کے لیے 'خدا حافظ'۔ 📋"],
      time: ["ابھی وقت ہے ⏰ {time}۔"],
      date: ["آج کی تاریخ ہے 📅 {date}۔"],
      joke: ["پروگرامرز ڈارک موڈ کیوں پسند کرتے ہیں؟ کیونکہ روشنی بگز کو کھینچتی ہے۔ 🐛💡"],
      thanks: ["خوش آمدید! 🙌"],
      fallback: ["میرے پاس اس کے لیے ابھی کوئی اصول نہیں 🤔۔ 'مدد' لکھ کر دیکھیں۔"]
    }
  },
  es: { dir:'ltr', name:'RuleBot', sub:'si / si_no — motor de reglas',
    title:'Hablando con', historyLabel:'PREGUNTADO HASTA AHORA', empty:'Nada todavía. Saluda para empezar.',
    placeholder:'Escribe un mensaje...', send:'Enviar', clear:'BORRAR HISTORIAL',
    hints:['hola','ayuda','chiste','dato','cumplido','hora','adiós'],
    R: {
      greeting: ["¡Hola! 👋 Soy RuleBot. Escribe 'ayuda' para ver qué puedo hacer.", "¡Hey! 😊 Pregúntame algo."],
      exit: ["¡Adiós! 👋 Actualiza la página para empezar una nueva sesión.", "Sesión terminada. ¡Hasta luego! ✨"],
      wellbeing: ["Solo soy un conjunto de reglas si/si_no, pero funciono bien. ⚙️ ¿Y tú?"],
      identity: ["Soy RuleBot 🤖 — un chatbot simple basado en reglas, sin ningún modelo de IA."],
      fact: ["Dato curioso: el primer 'bug' informático fue una polilla real atrapada en 1947. 🦋🖥️"],
      compliment: ["¡Gracias! 🥰 Eso alegró mis circuitos."],
      help: ["Puedo responder a: saludos, 'cómo estás', 'tu nombre', 'hora', 'fecha', 'dato curioso', 'chiste', un cumplido, 'gracias', y 'adiós' para salir. 📋"],
      time: ["Ahora mismo son las ⏰ {time}."],
      date: ["Hoy es 📅 {date}."],
      joke: ["¿Por qué los programadores prefieren el modo oscuro? Porque la luz atrae errores. 🐛💡"],
      thanks: ["¡De nada! 🙌"],
      fallback: ["Todavía no tengo una regla para eso 🤔. Prueba con 'ayuda'."]
    }
  },
  fr: { dir:'ltr', name:'RuleBot', sub:'si / sinon — moteur de règles',
    title:'Discussion avec', historyLabel:'DEMANDÉ JUSQU\u2019ICI', empty:'Rien pour l\u2019instant. Dites bonjour pour commencer.',
    placeholder:'Écrivez un message...', send:'Envoyer', clear:'EFFACER L\u2019HISTORIQUE',
    hints:['bonjour','aide','blague','anecdote','compliment','heure','au revoir'],
    R: {
      greeting: ["Bonjour ! 👋 Je suis RuleBot. Tapez 'aide' pour voir ce que je sais faire.", "Salut ! 😊 Pose-moi une question."],
      exit: ["Au revoir ! 👋 Actualisez la page pour démarrer une nouvelle session.", "Session terminée. À bientôt ! ✨"],
      wellbeing: ["Je ne suis qu\u2019un ensemble de règles si/sinon, mais tout va bien. ⚙️ Et vous ?"],
      identity: ["Je suis RuleBot 🤖 — un chatbot simple basé sur des règles, sans aucun modèle d\u2019IA."],
      fact: ["Anecdote : le premier 'bug' informatique était un vrai papillon de nuit coincé en 1947. 🦋🖥️"],
      compliment: ["Merci beaucoup ! 🥰 Ça fait plaisir à mes circuits."],
      help: ["Je peux répondre à : salutations, 'comment vas-tu', 'ton nom', 'heure', 'date', une anecdote, 'blague', un compliment, 'merci', et 'au revoir' pour quitter. 📋"],
      time: ["Il est actuellement ⏰ {time}."],
      date: ["Nous sommes le 📅 {date}."],
      joke: ["Pourquoi les programmeurs préfèrent-ils le mode sombre ? Parce que la lumière attire les bugs. 🐛💡"],
      thanks: ["Je vous en prie ! 🙌"],
      fallback: ["Je n\u2019ai pas encore de règle pour ça 🤔. Essayez 'aide'."]
    }
  },
  ar: { dir:'rtl', name:'RuleBot', sub:'إذا / وإلا — محرك القواعد',
    title:'تتحدث مع', historyLabel:'ما سُئل حتى الآن', empty:'لا شيء بعد. قل مرحباً للبدء.',
    placeholder:'اكتب رسالة...', send:'إرسال', clear:'مسح السجل',
    hints:['مرحبا','مساعدة','نكتة','معلومة','إطراء','الوقت','وداعا'],
    R: {
      greeting: ["مرحباً! 👋 أنا RuleBot. اكتب 'مساعدة' لرؤية ما يمكنني فعله.", "أهلاً! 😊 اسألني أي شيء."],
      exit: ["وداعاً! 👋 أعد تحميل الصفحة لبدء جلسة جديدة.", "انتهت الجلسة. إلى اللقاء! ✨"],
      wellbeing: ["أنا مجرد مجموعة قواعد إذا/وإلا، لكنني أعمل جيداً. ⚙️ وأنت؟"],
      identity: ["أنا RuleBot 🤖 — روبوت محادثة بسيط قائم على القواعد، بدون أي نموذج ذكاء اصطناعي."],
      fact: ["معلومة طريفة: أول 'خلل برمجي' كان فراشة حقيقية علقت عام 1947! 🦋🖥️"],
      compliment: ["شكراً لك! 🥰 هذا أسعد دوائري الكهربائية."],
      help: ["يمكنني الرد على: التحية، 'كيف حالك'، 'اسمك'، 'الوقت'، 'التاريخ'، معلومة طريفة، 'نكتة'، إطراء، 'شكراً'، و'وداعاً' للخروج. 📋"],
      time: ["الوقت الآن ⏰ {time}."],
      date: ["تاريخ اليوم هو 📅 {date}."],
      joke: ["لماذا يفضل المبرمجون الوضع الداكن؟ لأن الضوء يجذب الأخطاء. 🐛💡"],
      thanks: ["عفواً! 🙌"],
      fallback: ["ليس لدي قاعدة لهذا بعد 🤔. جرّب 'مساعدة'."]
    }
  }
};

// ---------- 2. Rule table: keyword -> response type ----------
// Plain if/else-style matching against a keyword list per rule.
const RULE_KEYS = {
  exit:       ['bye','goodbye','exit','quit','خدا حافظ','adiós','au revoir','وداعا'],
  greeting:   ['hello','hi ','hi','hey','salam','assalam','سلام','hola','bonjour','مرحبا','اہلا','أهلاً'],
  wellbeing:  ['how are you','kaisa','kya hal','cómo estás','comment vas','كيف حالك'],
  identity:   ['your name','who are you','naam','tu nombre','ton nom','اسمك'],
  help:       ['help','madad','مدد','ayuda','aide','مساعدة'],
  time:       ['time','waqt','وقت','hora','heure','الوقت'],
  date:       ['date','tareekh','تاریخ','fecha'],
  fact:       ['fact','trivia','maloomat','معلومات','معلومة','dato','anecdote'],
  compliment: ['you are great','you are the best','good bot','tareef','تعریف','إطراء','cumplido','compliment'],
  joke:       ['joke','latifa','لطیفہ','chiste','blague','نكتة'],
  thanks:     ['thanks','thank you','shukriya','شکریہ','gracias','merci','شكراً']
};

// ---------- 3. The decision function (if/else core) ----------
function classify(rawInput) {
  const msg = rawInput.toLowerCase().trim();
  if (!msg) return null;

  if (RULE_KEYS.exit.some(k => msg.includes(k))) return 'exit';
  else if (RULE_KEYS.greeting.some(k => msg.includes(k))) return 'greeting';
  else if (RULE_KEYS.wellbeing.some(k => msg.includes(k))) return 'wellbeing';
  else if (RULE_KEYS.identity.some(k => msg.includes(k))) return 'identity';
  else if (RULE_KEYS.help.some(k => msg.includes(k))) return 'help';
  else if (RULE_KEYS.time.some(k => msg.includes(k))) return 'time';
  else if (RULE_KEYS.date.some(k => msg.includes(k))) return 'date';
  else if (RULE_KEYS.fact.some(k => msg.includes(k))) return 'fact';
  else if (RULE_KEYS.compliment.some(k => msg.includes(k))) return 'compliment';
  else if (RULE_KEYS.joke.some(k => msg.includes(k))) return 'joke';
  else if (RULE_KEYS.thanks.some(k => msg.includes(k))) return 'thanks';
  else return 'fallback';
}

function buildReply(type, lang) {
  const pool = TEXT[lang].R[type];
  let reply = pool[Math.floor(Math.random() * pool.length)];
  const now = new Date();
  reply = reply.replace('{time}', now.toLocaleTimeString());
  reply = reply.replace('{date}', now.toLocaleDateString());
  return reply;
}

// ---------- 4. App state + the "continuous loop" ----------
// Each call to handleSubmit() is one iteration of the classic
// `while True: user_input = input(); ...` loop — here triggered
// by Enter/Send instead of blocking on stdin.
let lang = 'en';
let history = [];   // previously asked questions
let ended = false;

const els = {
  thread: document.getElementById('thread'),
  input: document.getElementById('input'),
  sendBtn: document.getElementById('sendBtn'),
  langSelect: document.getElementById('langSelect'),
  historyList: document.getElementById('historyList'),
  historyEmpty: document.getElementById('historyEmpty'),
  clearBtn: document.getElementById('clearBtn'),
  hintRow: document.getElementById('hintRow'),
  subLabel: document.getElementById('subLabel'),
  historyLabel: document.getElementById('historyLabel'),
  topbarTitle: document.getElementById('topbarTitle'),
  sidebar: document.getElementById('sidebar'),
  overlay: document.getElementById('sidebarOverlay'),
  hamburger: document.getElementById('hamburger'),
  main: document.querySelector('.main')
};

function openSidebar() { els.sidebar.classList.add('open'); els.overlay.classList.add('show'); }
function closeSidebar() { els.sidebar.classList.remove('open'); els.overlay.classList.remove('show'); }
els.hamburger.addEventListener('click', () => {
  els.sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});
els.overlay.addEventListener('click', closeSidebar);

function applyLanguageChrome() {
  const t = TEXT[lang];
  document.documentElement.setAttribute('dir', t.dir);
  els.input.placeholder = t.placeholder;
  els.sendBtn.textContent = t.send;
  els.clearBtn.textContent = t.clear;
  els.subLabel.textContent = t.sub;
  els.historyLabel.textContent = t.historyLabel;
  els.topbarTitle.innerHTML = t.title + ' <b>' + t.name + '</b>';
  els.hintRow.innerHTML = '';
  t.hints.forEach(h => {
    const b = document.createElement('button');
    b.className = 'hint';
    b.textContent = h;
    b.onclick = () => { els.input.value = h; handleSubmit(); };
    els.hintRow.appendChild(b);
  });
  renderHistory();

  els.main.classList.remove('lang-fade');
  void els.main.offsetWidth; // restart animation
  els.main.classList.add('lang-fade');
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function addRow(text, who) {
  const row = document.createElement('div');
  row.className = 'row ' + who;
  const b = document.createElement('div');
  b.className = 'bubble';
  row.appendChild(b);
  els.thread.appendChild(row);
  els.thread.scrollTop = els.thread.scrollHeight;

  if (who === 'user' || prefersReducedMotion) {
    b.textContent = text;
    return;
  }
  typeText(b, text);
}

function typeText(el, text, speed) {
  speed = speed || 16;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  let i = 0;
  el.textContent = '';
  el.appendChild(cursor);
  const timer = setInterval(() => {
    i++;
    el.textContent = text.slice(0, i);
    el.appendChild(cursor);
    els.thread.scrollTop = els.thread.scrollHeight;
    if (i >= text.length) {
      clearInterval(timer);
      setTimeout(() => cursor.remove(), 500);
    }
  }, speed);
}

function renderHistory() {
  els.historyList.innerHTML = '';
  if (history.length === 0) {
    els.historyList.appendChild(els.historyEmpty);
    els.historyEmpty.textContent = TEXT[lang].empty;
    return;
  }
  history.forEach((q, i) => {
    const btn = document.createElement('button');
    btn.className = 'history-item';
    btn.innerHTML = '<span class="idx">' + (i + 1) + '.</span>' + q;
    btn.title = q;
    btn.onclick = () => {
      els.input.value = q;
      els.input.focus();
      if (window.innerWidth <= 900) closeSidebar();
    };
    els.historyList.appendChild(btn);
  });
}

function showTyping() {
  const row = document.createElement('div');
  row.className = 'row bot typing';
  row.id = 'typingRow';
  row.innerHTML = '<div class="bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
  els.thread.appendChild(row);
  els.thread.scrollTop = els.thread.scrollHeight;
}
function removeTyping() {
  const row = document.getElementById('typingRow');
  if (row) row.remove();
}

function handleSubmit() {
  if (ended) return;
  const val = els.input.value;
  if (!val.trim()) return;

  addRow(val, 'user');
  history.unshift(val);
  renderHistory();
  els.input.value = '';

  els.sendBtn.classList.remove('send-pulse');
  void els.sendBtn.offsetWidth;
  els.sendBtn.classList.add('send-pulse');

  showTyping();
  const type = classify(val);
  const reply = buildReply(type, lang);
  const delay = prefersReducedMotion ? 60 : 450 + Math.random() * 250;
  setTimeout(() => {
    removeTyping();
    addRow(reply, 'bot');
    if (type === 'exit') {
      ended = true;
      els.input.disabled = true;
      els.sendBtn.disabled = true;
    }
  }, delay);
}

els.sendBtn.addEventListener('click', handleSubmit);
els.input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSubmit(); });
els.clearBtn.addEventListener('click', () => { history = []; renderHistory(); });
els.langSelect.addEventListener('change', e => { lang = e.target.value; applyLanguageChrome(); });

// Boot
applyLanguageChrome();
addRow(buildReply('greeting', lang), 'bot');
els.input.focus();

