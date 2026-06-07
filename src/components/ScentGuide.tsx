import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Bot, Sparkle, RefreshCw, ChevronRight } from 'lucide-react';

interface ScentChoice {
  label: string;
  value: string;
  tag: string;
}

interface ScentQuestion {
  question: string;
  choices: ScentChoice[];
}

interface ScentGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onLocateMatches: (tag: string) => void;
}

export default function ScentGuide({ isOpen, onClose, onLocateMatches }: ScentGuideProps) {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [recommendation, setRecommendation] = useState<{
    profile: string;
    description: string;
    tag: string;
  } | null>(null);

  const options: Record<number, ScentQuestion> = {
    1: {
      question: "Quelle atmosphère cherchez-vous à évoquer ?",
      choices: [
        { label: "Une clarté fraîche, solaire et poétique", value: "solaire", tag: "Les Florales" },
        { label: "Une présence mythique, mystérieuse et ténébreuse", value: "intense", tag: "Les Intenses" },
        { label: "Une élégance intemporelle, fraîche et boisée", value: "classique", tag: "Les Origines" }
      ]
    },
    2: {
      question: "Quelle note dominante résonne en vous ?",
      choices: [
        { label: "Fleurs précieuses d'un jardin de Versailles", value: "fleurs", tag: "Les Florales" },
        { label: "Bois sacrés d'Oud Sauvage et Patchouli", value: "bois", tag: "Les Intenses" },
        { label: "Poivre d'Angélique et Vétiver texturé", value: "epices", tag: "Les Origines" }
      ]
    },
    3: {
      question: "Comment décrivez-vous votre sillage idéal ?",
      choices: [
        { label: "Subtil, comme un voile de soie fine", value: "subtil", tag: "Les Florales" },
        { label: "Riche, persistant et captivant", value: "captivant", tag: "Les Intenses" },
        { label: "Noble, un héritage discret et soigné", value: "noble", tag: "Les Origines" }
      ]
    }
  };

  const handleSelect = (index: number, choice: ScentChoice) => {
    const updatedAnswers = { ...answers, [index]: choice.tag };
    setAnswers(updatedAnswers);

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Analyze answers to give recommendation
      // Count frequency of collection tags in answers
      const counts: Record<string, number> = {};
      Object.keys(updatedAnswers).forEach((key) => {
        const tag = updatedAnswers[Number(key)];
        counts[tag] = (counts[tag] || 0) + 1;
      });

      // Find the tag with the highest frequency
      let bestTag = "Les Origines"; // Fallback
      let maxCount = 0;
      Object.entries(counts).forEach(([tag, count]) => {
        if (count > maxCount) {
          maxCount = count;
          bestTag = tag;
        }
      });

      let profile = "La Noblesse Classique";
      let description = "Vous appréciez les trésors de l'expérience séculaire française. Les envolées fines d'iris pur, de bergamote d'italie et de bois de santal d'exception forment votre architecture signature.";

      if (bestTag === "Les Intenses") {
        profile = "L'Audace Obscure";
        description = "Vous êtes captivé par la force brute des matières premières. L'Oud d'Orient, le cuir précieux et les éclats volcaniques de patchouli soulignent votre tempérament de feu.";
      } else if (bestTag === "Les Florales") {
        profile = "La Délicatesse Poétique";
        description = "Votre univers est un bouquet de magnolias épanouis sous la rosée du matin. Vos notes de prédilection sont douces, florales pâles, soulignées de cachemire satin.";
      }

      setRecommendation({
        profile,
        description,
        tag: bestTag
      });
    }
  };

  const resetGuide = () => {
    setStep(1);
    setAnswers({});
    setRecommendation(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="scent-explorer-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Background Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#070707]/95 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#111111] border border-[#c5a880]/30 rounded-lg p-6 md:p-8 shadow-2xl overflow-hidden"
        >
          {/* Subtle gold line accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />

          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2">
              <Bot className="text-[#c5a880]" size={28} />
            </div>
            <h3 className="text-sm tracking-[0.2em] font-display text-[#c5a880] uppercase">
              L'ORIENTATEUR OLFACTIF
            </h3>
            <p className="text-[11px] text-gray-400 font-serif mt-1 italic">
              Concevez votre portrait invisible Maison Lumière
            </p>
          </div>

          {/* Progress Dot Indicator */}
          {!recommendation && (
            <div className="flex justify-center gap-1.5 mb-6">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step === num ? 'w-6 bg-[#c5a880]' : 'w-1.5 bg-gray-800'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Interactive Core */}
          <div className="min-h-[180px]">
            <AnimatePresence mode="wait">
              {!recommendation ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-xs font-serif text-gray-300 text-center leading-relaxed">
                    Question {step} de 3
                  </p>
                  <p className="text-sm font-sans text-gray-100 font-semibold mb-4 text-center">
                    {options[step].question}
                  </p>

                  <div className="space-y-2">
                    {options[step].choices.map((choice) => (
                      <button
                        key={choice.value}
                        onClick={() => handleSelect(step, choice)}
                        className="w-full text-left p-3.5 bg-[#171717] hover:bg-[#1f1f1f] text-xs font-sans text-gray-300 hover:text-white rounded border border-gray-900 hover:border-[#c5a880]/30 transition-all cursor-pointer flex justify-between items-center group"
                      >
                        <span>{choice.label}</span>
                        <ChevronRight size={14} className="text-gray-600 group-hover:text-[#c5a880] transition-colors" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="inline-flex p-3 bg-[#c5a880]/10 rounded-full text-[#c5a880] border border-[#c5a880]/20 animate-pulse">
                    <Sparkle size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase block">CONSEIL DE L'EXPERT</span>
                    <h4 className="text-lg font-serif text-[#c5a880] mt-1">{recommendation.profile}</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto font-serif italic text-balance">
                    "{recommendation.description}"
                  </p>

                  <div className="pt-4 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        onLocateMatches(recommendation.tag);
                        onClose();
                      }}
                      className="w-full bg-[#c5a880] hover:bg-[#e5c8a0] text-[#0d0d0d] font-semibold font-display text-[10px] tracking-widest uppercase py-3 cursor-pointer transition-colors"
                    >
                      DÉCOUVRIR {recommendation.tag.toUpperCase()}
                    </button>
                    <button
                      onClick={resetGuide}
                      className="text-[10px] font-mono text-gray-500 hover:text-[#c5a880] flex items-center justify-center gap-1.5 py-2"
                    >
                      <RefreshCw size={10} />
                      Recommencer le diagnostic
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Close button modal footer */}
          <div className="mt-6 pt-4 border-t border-gray-900 flex justify-end">
            <button
              onClick={onClose}
              className="text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              Fermer l'Atelier
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
