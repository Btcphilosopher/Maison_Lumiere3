import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CornerDownRight, Check, Sparkle } from 'lucide-react';

interface CustomEngravingProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmEngraving: (text: string) => void;
}

export default function CustomEngraving({ isOpen, onClose, onConfirmEngraving }: CustomEngravingProps) {
  const [engravingText, setEngravingText] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (engravingText.trim().length === 0) return;
    onConfirmEngraving(engravingText);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="engraving-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-[#131313] border border-[#c5a880]/30 rounded-lg p-6 md:p-8 shadow-2xl overflow-hidden text-center"
        >
          {/* Top visual design badge */}
          <div className="flex justify-center mb-2">
            <Sparkle className="text-[#c5a880] animate-spin" style={{ animationDuration: '6s' }} size={24} />
          </div>

          <span className="text-[9px] uppercase tracking-widest text-[#c5a880] font-mono">SERIGRAPHIE D'ARTISTE</span>
          <h3 className="text-xl font-serif text-[#f5f5f5] mt-1 mb-3">L'Empreinte Spirituelle</h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed max-w-xs mx-auto mb-6">
            Gravez gracieusement vos initiales ou un message d'exception à base d'or 24 carats sur le verre de votre flacon Maison Lumière.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type="text"
                maxLength={20}
                required
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                placeholder="EX: PARIS L.C. 2026"
                className="w-full bg-[#1c1c1c] text-[#f5f5f5] border border-gray-800 focus:border-[#c5a880] rounded py-3 px-4 text-xs font-mono tracking-widest uppercase text-center outline-none transition-all duration-300"
              />
              <span className="absolute bottom-2.5 right-3 text-[9px] font-mono text-gray-600 block">
                {engravingText.length}/20 chars
              </span>
            </div>

            {/* Live previews of what the bottle would look like */}
            <div className="bg-[#181818] rounded-md border border-gray-900 p-4 relative overflow-hidden">
              <span className="absolute top-2 left-2 text-[8px] font-mono text-gray-600 tracking-wider">APERÇU DU FLACON</span>
              
              <div className="py-6 flex flex-col items-center justify-center">
                {/* Simulated bottle body glass silhouette */}
                <div className="w-16 h-24 border border-white/10 rounded-lg relative flex items-center justify-center p-2 mb-2 bg-gradient-to-b from-white/[0.03] to-transparent">
                  {/* Perfume golden juice sim */}
                  <div className="absolute inset-x-1 bottom-1 top-6 bg-[#c5a880]/10 rounded-b-md blur-[1px] pointer-events-none" />
                  <div className="absolute top-[-8px] w-6 h-5 border border-white/10 bg-[#151515] rounded-t-sm" />
                  
                  {/* The actual label */}
                  <div className="w-12 py-2 border border-[#c5a880]/20 bg-[#111] flex flex-col items-center justify-center text-center">
                    <span className="text-[6px] font-display text-[#c5a880] scale-75">LUMIÈRE</span>
                    <span className="text-[5px] text-gray-500 scale-75">PARIS</span>
                  </div>

                  {/* Simulated laser/gold engraving */}
                  <div className="absolute bottom-3 inset-x-0 text-center">
                    <p className="text-[7px] text-[#c5a880] font-mono select-none tracking-widest animate-pulse h-3">
                      {engravingText || "VOTRE MESSAGE"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                disabled={isSaved}
                className={`w-full py-3.5 px-4 font-display text-[10px] tracking-widest uppercase transition-all duration-350 font-bold flex items-center justify-center gap-2 cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-800 text-emerald-100'
                    : 'bg-[#c5a880] hover:bg-[#e5c8a0] text-[#0d0d0d]'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check size={12} />
                    GRAVURE ENREGISTRÉE !
                  </>
                ) : (
                  <>
                    CONFIRMER LA SÉRIGRAPHIE
                    <ArrowRight size={11} />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-[10px] font-mono text-gray-500 hover:text-gray-300 py-1"
              >
                Passer cette étape
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
