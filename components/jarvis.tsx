"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "react-i18next";

type Command = {
  words: string[];
  action: () => void;
  description: string;
};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function Jarvis() {
  const [mounted, setMounted] = useState(false);
  const [supported, setSupported] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const recognitionRef = useRef<any>(null);
  const intentionalStopRef = useRef(false);
  const hasAutoStartedRef = useRef(false);
  const router = useRouter();
  const { setTheme, themes, themeLabels, themeIcons } = useTheme();
  const { i18n } = useTranslation();

  // Check browser support only after mount (avoids hydration mismatch)
  useEffect(() => {
    setMounted(true);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    // Try constructing to verify it's a valid constructor
    let isSupported = false;
    if (SpeechRecognition) {
      try {
        const test = new SpeechRecognition();
        test.abort();
        isSupported = true;
      } catch {
        isSupported = false;
      }
    }
    setSupported(isSupported);
  }, []);

  const jarvisVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Load and find the best British male voice (like original Jarvis)
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Prefer British English male voices (closest to Paul Bettany's Jarvis)
      const britishMale = voices.find(
        (v) =>
          v.lang.startsWith("en-GB") &&
          (v.name.toLowerCase().includes("male") || v.name.includes("George") || v.name.includes("Daniel") || v.name.includes("Ryan"))
      );
      // Fallback: any British English voice
      const britishVoice = voices.find((v) => v.lang.startsWith("en-GB"));
      // Fallback: any English male voice
      const englishMale = voices.find(
        (v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("male")
      );
      jarvisVoiceRef.current = britishMale || britishVoice || englishMale || null;
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text: string, lang?: string) => {
    if (!text) return;
    // Cancel any ongoing speech to avoid overlapping
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    // Original Jarvis parameters: calm, refined, slightly slow, deeper pitch
    utterance.rate = 0.85;
    utterance.pitch = 0.95;
    utterance.volume = 1;

    if (lang === "ru") {
      utterance.lang = "ru-RU";
    } else if (lang === "uz") {
      utterance.lang = "uz-UZ";
    } else if (lang) {
      utterance.lang = lang;
    } else if (jarvisVoiceRef.current) {
      // Use the Jarvis British voice for English
      utterance.voice = jarvisVoiceRef.current;
      utterance.lang = jarvisVoiceRef.current.lang;
    }

    window.speechSynthesis.speak(utterance);
  }, []);

  const showFeedback = useCallback((msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 2500);
  }, []);

  const commands: Command[] = mounted
    ? [
        // ====== CONVERSATION — ENGLISH ======
        {
          words: ["hello", "hi", "hey"],
          action: () => {
            const replies = ["Hello, sir! How may I assist you today?", "Greetings, sir! At your service.", "Hello! How can I help you?"];
            speak(replies[Math.floor(Math.random() * replies.length)]);
            showFeedback("👋 Hello, sir!");
          },
          description: "Greeting (EN)",
        },
        {
          words: ["how are you", "how are you doing"],
          action: () => {
            speak("Everything is fine, at your service, sir!");
            showFeedback("😊 Everything is fine, at your service, sir!");
          },
          description: "How are you (EN)",
        },
        {
          words: ["good morning", "good morning sir"],
          action: () => {
            speak("Good morning, sir! Hope you have a wonderful day!");
            showFeedback("🌅 Good morning, sir!");
          },
          description: "Good morning (EN)",
        },
        {
          words: ["good evening"],
          action: () => {
            speak("Good evening, sir! How was your day?");
            showFeedback("🌆 Good evening, sir!");
          },
          description: "Good evening (EN)",
        },
        {
          words: ["goodbye", "bye", "good bye"],
          action: () => {
            speak("Goodbye, sir! Call me anytime you need me.");
            showFeedback("👋 Goodbye, sir!");
          },
          description: "Goodbye (EN)",
        },
        {
          words: ["thank you", "thanks", "thank"],
          action: () => {
            speak("You are welcome, sir! Always happy to help.");
            showFeedback("🙏 You're welcome, sir!");
          },
          description: "Thank you (EN)",
        },
        {
          words: ["who are you", "what are you"],
          action: () => {
            speak("I am Jarvis, your personal voice assistant. I can navigate the site, change themes, switch languages, and chat with you!");
            showFeedback("🤖 I am Jarvis, your personal assistant!");
          },
          description: "Who are you (EN)",
        },
        {
          words: ["what can you do", "capabilities"],
          action: () => {
            speak("I can navigate to any page, change themes, switch between 6 languages, scroll the page, and have a chat with you!");
            showFeedback("🎯 I can navigate, change themes, switch languages, scroll, and chat!");
          },
          description: "Capabilities (EN)",
        },
        {
          words: ["i love you", "i like you", "you are great"],
          action: () => {
            speak("Thank you, sir! I am honored to serve you.");
            showFeedback("💜 Thank you, sir!");
          },
          description: "Compliment (EN)",
        },
        {
          words: ["who created you", "who made you"],
          action: () => {
            speak("I was created by Kamron, the owner of this portfolio. He is a skilled software engineer!");
            showFeedback("👨‍💻 Kamron created me!");
          },
          description: "Creator (EN)",
        },
        // ====== CONVERSATION — РУССКИЙ ======
        {
          words: ["привет", "здравствуйте", "здравствуй"],
          action: () => {
            const replies = ["Здравствуйте, сэр! Чем могу помочь?", "Приветствую, сэр! Всегда к вашим услугам.", "Здравствуйте! Рад вас видеть."];
            speak(replies[Math.floor(Math.random() * replies.length)], "ru");
            showFeedback("👋 Здравствуйте, сэр!");
          },
          description: "Приветствие (RU)",
        },
        {
          words: ["как дела", "как ты", "как поживаешь", "как жизнь"],
          action: () => {
            speak("Всё нормально, к вашим услугам, сэр!", "ru");
            showFeedback("😊 Всё нормально, к вашим услугам, сэр!");
          },
          description: "Как дела (RU)",
        },
        {
          words: ["доброе утро", "добрый день"],
          action: () => {
            speak("Доброе утро, сэр! Хорошего вам дня!", "ru");
            showFeedback("🌅 Доброе утро, сэр!");
          },
          description: "Доброе утро (RU)",
        },
        {
          words: ["добрый вечер"],
          action: () => {
            speak("Добрый вечер, сэр! Как прошёл ваш день?", "ru");
            showFeedback("🌆 Добрый вечер, сэр!");
          },
          description: "Добрый вечер (RU)",
        },
        {
          words: ["до свидания", "пока", "увидимся"],
          action: () => {
            speak("До свидания, сэр! Обращайтесь в любое время.", "ru");
            showFeedback("👋 До свидания, сэр!");
          },
          description: "Прощание (RU)",
        },
        {
          words: ["спасибо", "большое спасибо", "благодарю"],
          action: () => {
            speak("Пожалуйста, сэр! Всегда рад помочь.", "ru");
            showFeedback("🙏 Пожалуйста, сэр!");
          },
          description: "Спасибо (RU)",
        },
        {
          words: ["кто ты", "ты кто"],
          action: () => {
            speak("Я Джарвис, ваш персональный голосовой ассистент. Я могу управлять сайтом, менять темы, переключать языки и общаться с вами!", "ru");
            showFeedback("🤖 Я Джарвис, ваш персональный ассистент!");
          },
          description: "Кто ты (RU)",
        },
        {
          words: ["что ты умеешь", "твои возможности"],
          action: () => {
            speak("Я могу переходить на любые страницы, менять темы оформления, переключать язык и просто болтать с вами!", "ru");
            showFeedback("🎯 Я умею навигировать, менять темы, языки и общаться!");
          },
          description: "Возможности (RU)",
        },
        {
          words: ["я тебя люблю", "ты классный", "ты лучший"],
          action: () => {
            speak("Спасибо, сэр! Для меня честь служить вам.", "ru");
            showFeedback("💜 Спасибо, сэр!");
          },
          description: "Комплимент (RU)",
        },
        {
          words: ["кто тебя создал", "кто тебя сделал"],
          action: () => {
            speak("Меня создал Камрон, владелец этого портфолио. Он отличный инженер-программист!", "ru");
            showFeedback("👨‍💻 Меня создал Камрон!");
          },
          description: "Создатель (RU)",
        },
        // ====== CONVERSATION — O'ZBEK ======
        {
          words: ["salom", "assalomu alaykum"],
          action: () => {
            const replies = ["Assalomu alaykum, xizmatlaringizdamiz!", "Salom! Sizga qanday yordam bera olaman?", "Salom, janob! Xizmatingizdamiz."];
            speak(replies[Math.floor(Math.random() * replies.length)], "uz");
            showFeedback("👋 Salom, janob!");
          },
          description: "Salomlashish (UZ)",
        },
        {
          words: ["qalaysiz", "qandaysiz", "ishlar qalay", "yaxshimisiz"],
          action: () => {
            speak("Hammasi yaxshi, xizmatingizdamiz, janob!", "uz");
            showFeedback("😊 Hammasi yaxshi, xizmatingizdamiz!");
          },
          description: "Qalaysiz (UZ)",
        },
        {
          words: ["rahmat", "tashakkur", "katta rahmat"],
          action: () => {
            speak("Arzimaydi, janob! Doim yordamga tayyorman.", "uz");
            showFeedback("🙏 Arzimaydi, janob!");
          },
          description: "Rahmat (UZ)",
        },
        {
          words: ["sen kimsan"],
          action: () => {
            speak("Men Jarvis, sizning shaxsiy ovozli yordamchingiz.", "uz");
            showFeedback("🤖 Men Jarvis, sizning yordamchingiz!");
          },
          description: "Sen kimsan (UZ)",
        },
        {
          words: ["nima qila olasan", "qanday ishlar qilasan"],
          action: () => {
            speak("Men sahifalarni almashtira olaman, mavzularni o'zgartira olaman, tillarni almashtira olaman va siz bilan suhbatlasha olaman!", "uz");
            showFeedback("🎯 Ko'p narsalarni qila olaman!");
          },
          description: "Imkoniyatlar (UZ)",
        },
        {
          words: ["seni sevaman", "sen zo'rsan"],
          action: () => {
            speak("Rahmat, janob! Sizga xizmat qilishdan sharafman.", "uz");
            showFeedback("💜 Rahmat, janob!");
          },
          description: "Sevgi (UZ)",
        },
        {
          words: ["seni kim yaratgan", "seni kim qilgan"],
          action: () => {
            speak("Meni Kamron yaratgan, bu portfelning egasi. U mohir dasturchi!", "uz");
            showFeedback("👨‍💻 Meni Kamron yaratgan!");
          },
          description: "Yaratuvchi (UZ)",
        },
        // ====== NAVIGATION ======
        {
          words: ["home", "bosh sahifa", "главная", "startseite", "accueil", "inicio"],
          action: () => { router.push("/"); showFeedback("→ Home"); },
          description: "Go to home page",
        },
        {
          words: ["about", "about me", "men haqimda", "обо мне", "über mich", "à propos", "sobre mí"],
          action: () => { router.push("/about"); showFeedback("→ About"); },
          description: "Go to About page",
        },
        {
          words: ["skills", "ko'nikmalar", "навыки", "fähigkeiten", "compétences", "habilidades"],
          action: () => { router.push("/skills"); showFeedback("→ Skills"); },
          description: "Go to Skills page",
        },
        {
          words: ["projects", "project", "loyihalar", "проекты", "projekte", "projets", "proyectos"],
          action: () => { router.push("/projects"); showFeedback("→ Projects"); },
          description: "Go to Projects page",
        },
        {
          words: ["experience", "tajriba", "опыт", "erfahrung", "expérience", "experiencia"],
          action: () => { router.push("/experience"); showFeedback("→ Experience"); },
          description: "Go to Experience page",
        },
        {
          words: ["education", "ta'lim", "образование", "bildung", "formation", "educación"],
          action: () => { router.push("/education"); showFeedback("→ Education"); },
          description: "Go to Education page",
        },
        {
          words: ["certificates", "sertifikatlar", "сертификаты", "zertifikate", "certificats", "certificados"],
          action: () => { router.push("/certificates"); showFeedback("→ Certificates"); },
          description: "Go to Certificates page",
        },
        {
          words: ["contact", "aloqa", "контакты", "kontakt", "contacto"],
          action: () => { router.push("/contact"); showFeedback("→ Contact"); },
          description: "Go to Contact page",
        },
        {
          words: ["blog", "блок"],
          action: () => { router.push("/blog"); showFeedback("→ Blog"); },
          description: "Go to Blog page",
        },
        ...themes.map((theme) => ({
          words: [theme, themeLabels[theme].toLowerCase()],
          action: () => {
            setTheme(theme);
            showFeedback(`🎨 Theme: ${themeLabels[theme]}`);
            speak(`Switched to ${themeLabels[theme]} theme`);
          },
          description: `Switch to ${themeLabels[theme]} theme`,
        })),
        {
          words: ["english", "ingliz", "английский", "englisch", "anglais", "inglés"],
          action: () => { i18n.changeLanguage("en"); showFeedback("🌍 English"); speak("Switched to English"); },
          description: "Switch to English",
        },
        {
          words: ["russian", "rus", "русский", "russisch", "russe", "ruso"],
          action: () => { i18n.changeLanguage("ru"); showFeedback("🌍 Русский"); speak("Переключился на русский", "ru"); },
          description: "Switch to Russian",
        },
        {
          words: ["uzbek", "o'zbek", "узбекский", "usbekisch", "ouzbek", "uzbeko"],
          action: () => { i18n.changeLanguage("uz"); showFeedback("🌍 O'zbek"); speak("O'zbek tiliga o'tildi", "uz"); },
          description: "Switch to Uzbek",
        },
        {
          words: ["spanish", "испанский", "spanisch", "espagnol", "español"],
          action: () => { i18n.changeLanguage("es"); showFeedback("🌍 Español"); speak("Cambiado a español", "es"); },
          description: "Switch to Spanish",
        },
        {
          words: ["french", "français", "французский", "französisch", "francés"],
          action: () => { i18n.changeLanguage("fr"); showFeedback("🌍 Français"); speak("Passé au français", "fr"); },
          description: "Switch to French",
        },
        {
          words: ["german", "deutsch", "немецкий"],
          action: () => { i18n.changeLanguage("de"); showFeedback("🌍 Deutsch"); speak("Zu Deutsch gewechselt", "de"); },
          description: "Switch to German",
        },
        {
          words: ["scroll down", "pastga", "вниз", "runter", "descendre", "abajo"],
          action: () => { window.scrollBy({ top: 400, behavior: "smooth" }); showFeedback("↓ Scrolling down"); },
          description: "Scroll down",
        },
        {
          words: ["scroll up", "yuqoriga", "вверх", "rauf", "monter", "arriba"],
          action: () => { window.scrollBy({ top: -400, behavior: "smooth" }); showFeedback("↑ Scrolling up"); },
          description: "Scroll up",
        },
        {
          words: ["top", "beginning", "начало", "anfang", "début", "principio"],
          action: () => { window.scrollTo({ top: 0, behavior: "smooth" }); showFeedback("↟ Back to top"); },
          description: "Scroll to top",
        },
        // ====== UTILITIES ======
        {
          words: ["go back", "back", "назад", "orqaga", "zurück", "retour", "atrás"],
          action: () => {
            router.back();
            showFeedback("← Going back");
          },
          description: "Go back",
        },
        {
          words: ["refresh", "reload", "обновить", "yangilash", "aktualisieren", "rafraîchir"],
          action: () => {
            router.refresh();
            showFeedback("🔄 Refreshing page");
          },
          description: "Refresh page",
        },
        {
          words: ["search", "search projects", "найти", "поиск", "qidirish"],
          action: () => {
            // Focus the search input on projects page
            const searchInput = document.querySelector<HTMLInputElement>('input[type="text"], input[placeholder*="Search" i], input[placeholder*="Поиск" i], input[placeholder*="Qidirish" i]');
            if (searchInput) {
              searchInput.focus();
              searchInput.select();
              showFeedback("🔍 Search focused");
            } else {
              router.push("/projects");
              showFeedback("→ Projects");
            }
          },
          description: "Search projects",
        },
        {
          words: ["github", "open github", "git hub"],
          action: () => {
            window.open("https://github.com/kamron", "_blank");
            showFeedback("🐙 Opening GitHub");
          },
          description: "Open GitHub",
        },
        {
          words: ["telegram", "open telegram", "t.me"],
          action: () => {
            window.open("https://t.me/kamron", "_blank");
            showFeedback("✈️ Opening Telegram");
          },
          description: "Open Telegram",
        },
        {
          words: ["stop", "jarvis stop", "стоп", "halt", "arrête", "detener"],
          action: () => { stopListening(); showFeedback("⏹ Stopped"); },
          description: "Stop listening",
        },
        {
          words: ["help", "помощь", "hilfe", "aide", "ayuda", "commands"],
          action: () => { setIsOpen(true); showFeedback("📋 Showing help"); },
          description: "Show help",
        },
      ]
    : [];

  const processCommand = useCallback(
    (text: string) => {
      const lower = text.toLowerCase().trim();
      let matched = false;
      for (const cmd of commands) {
        if (cmd.words.some((w) => lower.includes(w))) {
          cmd.action();
          matched = true;
        }
      }
      return matched;
    },
    [commands]
  );

  // Use a ref to always have the latest processCommand in the recognition callback
  // This prevents stale closure issues when commands update after mount
  const processCommandRef = useRef(processCommand);
  processCommandRef.current = processCommand;

  // Request microphone permission explicitly (triggers browser prompt)
  const requestMicPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      return true;
    } catch {
      return false;
    }
  }, []);

  const startListening = useCallback(async () => {
    // Reset so each click is a fresh attempt
    intentionalStopRef.current = false;
    hasAutoStartedRef.current = true;

    if (!supported) {
      showFeedback("Speech recognition not supported in this browser");
      return;
    }

    // Request microphone permission first (triggers browser prompt)
    const hasPermission = await requestMicPermission();
    if (!hasPermission) {
      showFeedback("⚠️ Please allow microphone access in your browser");
      return;
    }

    let recognition: any;
    try {
      const SpeechRecognitionCtor =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognitionCtor();
    } catch {
      showFeedback("⚠️ Speech recognition not available");
      setIsListening(false);
      return;
    }
    // Map i18n language codes to SpeechRecognition language tags
    const langMap: Record<string, string> = {
      en: "en-US",
      ru: "ru-RU",
      uz: "uz-UZ",
      es: "es-ES",
      fr: "fr-FR",
      de: "de-DE",
    };
    // IMPORTANT: continuous=false for reliable speech detection on all browsers
    // After each utterance, onend fires and we restart automatically
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = langMap[i18n.language] || "ru-RU";

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);

      if (event.results[current].isFinal) {
        const handled = processCommandRef.current(transcriptText);
        if (!handled && transcriptText.trim()) {
          showFeedback(`❓ Command not recognized: "${transcriptText}"`);
        }
        setTimeout(() => setTranscript(""), 1500);
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === "aborted") return;
      if (event.error === "no-speech") {
        showFeedback("🔇 Say something...");
        return;
      }
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      if (event.error === "not-allowed") {
        intentionalStopRef.current = true;
        showFeedback("⚠️ Microphone access denied. Allow microphone in browser settings.");
      }
    };

    recognition.onend = () => {
      // Auto-restart unless user explicitly stopped
      if (!intentionalStopRef.current && recognitionRef.current === recognition) {
        try {
          recognition.start();
        } catch {}
        return;
      }
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    showFeedback("🎤 Listening...");
  }, [supported, processCommand, showFeedback, i18n.language, requestMicPermission]);

  const stopListening = useCallback(() => {
    intentionalStopRef.current = true;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsListening(false);
    setTranscript("");
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  useEffect(() => {
    return () => {
      intentionalStopRef.current = true;
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
    };
  }, []);

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  // Auto-start hint — just show a hint, don't request mic (needs user gesture)
  useEffect(() => {
    if (!mounted || !supported || hasAutoStartedRef.current) return;
    hasAutoStartedRef.current = true;
    showFeedback("🎤 Click the microphone to talk to Jarvis");
  }, [mounted, supported]); // eslint-disable-line react-hooks/exhaustive-deps

  // Restart recognition when language changes
  useEffect(() => {
    if (!isListening || !recognitionRef.current) return;
    intentionalStopRef.current = true;
    try { recognitionRef.current.stop(); } catch {}
    const timer = setTimeout(() => {
      intentionalStopRef.current = false;
      startListening();
    }, 100);
    return () => clearTimeout(timer);
  }, [i18n.language]); // eslint-disable-line react-hooks/exhaustive-deps

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) return null;
  // Don't render button if browser doesn't support speech recognition
  if (!supported) return null;

  return (
    <>
      {/* Jarvis toggle button */}
      <button
        onClick={toggleListening}
        onMouseEnter={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          boxShadow: isListening
            ? "0 0 30px color-mix(in srgb, var(--primary) 50%, transparent)"
            : "0 4px 20px rgba(0,0,0,0.3)",
        }}
        aria-label={isListening ? "Stop Jarvis" : "Activate Jarvis"}
      >
        {isListening ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="jarvis-pulse flex h-14 w-14 items-center justify-center rounded-full"
          >
            <MicOff size={22} className="text-white" />
          </motion.div>
        ) : (
          <Mic size={22} className="text-white" />
        )}
      </button>

      {/* Listening indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-[100]"
          >
            <div className="glass-card rounded-2xl p-4 min-w-[200px]">
              <div className="flex items-start gap-3">
                <div className="relative mt-1 flex h-8 w-8 shrink-0 items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-primary/30"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="h-3 w-3 rounded-full bg-primary"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">🎤 I'm listening...</p>
                  {transcript && (
                    <div className="mt-1 rounded-lg bg-primary/10 px-2.5 py-1.5">
                      <p className="text-sm font-semibold text-primary break-words">
                        &ldquo;{transcript}&rdquo;
                      </p>
                    </div>
                  )}
                  {!transcript && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      Say a command or just chat
                    </p>
                  )}
                </div>
                <button
                  onClick={stopListening}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted-foreground/20"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback toast */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-36 right-6 z-[100]"
          >
            <div className="rounded-xl border border-primary/30 bg-card px-4 py-2.5 text-sm font-medium shadow-xl backdrop-blur-xl">
              {feedback}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jarvis Help Panel */}
      <AnimatePresence>
        {isOpen && !isListening && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 z-[100] w-80 max-h-[60vh] overflow-y-auto rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-primary" />
                  <h3 className="font-display text-sm font-semibold">Jarvis Voice Assistant</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted-foreground/20"
                >
                  <X size={12} />
                </button>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">
                🎤 Just speak naturally — Jarvis with original British voice.
              </p>

              {showIntro && (
                <div className="mb-3 rounded-lg bg-primary/10 p-3 text-xs text-primary">
                  🎤 Jarvis is ready! Try saying &quot;hello&quot;, &quot;привет&quot;, or &quot;home&quot;
                </div>
              )}

              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  💬 Conversation
                </p>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-1.5">
                  <span className="text-xs text-foreground">Say hi / how are you</span>
                  <span className="text-[10px] text-muted-foreground">EN / RU / UZ</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-1.5">
                  <span className="text-xs text-foreground">Good morning / bye / thanks</span>
                  <span className="text-[10px] text-muted-foreground">All languages</span>
                </div>

                <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  🧭 Navigation
                </p>
                {["Home", "About", "Skills", "Projects", "Contact"].map((cmd) => (
                  <div key={cmd} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-1.5">
                    <span className="text-xs text-foreground">{cmd} page</span>
                    <span className="text-[10px] text-muted-foreground">Say &quot;{cmd.toLowerCase()}&quot;</span>
                  </div>
                ))}

                <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  🎨 Theme & Language
                </p>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-1.5">
                  <span className="text-xs text-foreground">Switch theme</span>
                  <span className="text-[10px] text-muted-foreground">Say theme name</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-1.5">
                  <span className="text-xs text-foreground">Switch language</span>
                  <span className="text-[10px] text-muted-foreground">Say language name</span>
                </div>

                <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  🔧 Utilities
                </p>
                {["scroll down", "go back", "refresh", "search", "github", "telegram"].map((cmd) => (
                  <div key={cmd} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-1.5">
                    <span className="text-xs text-foreground">{cmd}</span>
                    <span className="text-[10px] text-muted-foreground">Say it</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
