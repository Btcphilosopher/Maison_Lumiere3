import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkle, Check, Heart, User, Sparkles, Star, Quote, X } from 'lucide-react';

interface ExclusiveClubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExclusiveClub({ isOpen, onClose }: ExclusiveClubProps) {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const togglePreference = (pref: string) => {
    if (preferences.includes(pref)) {
      setPreferences(preferences.filter((p) => p !== pref));
    } else {
      setPreferences([...preferences, pref]);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="club-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#050505]/98 backdrop-blur-xl"
        />

        {/* Modal body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          className="relative w-full max-w-xl bg-[#0e0e0e] border border-[#c5a880]/30 rounded-lg p-6 md:p-10 shadow-2xl overflow-hidden flex flex-col md:flex-row gap-6 md:gap-8"
        >
          {/* Accent light decoration */}
          <div className="absolute top-[-50px] left-[-50px] w-48 h-48 rounded-full bg-[#c5a880]/5 blur-3xl pointer-events-none" />

          {/* Left Column: Atmospheric Luxury Copy */}
          <div className="w-full md:w-1/2 flex flex-col justify-between py-2 border-b md:border-b-0 md:border-r border-gray-900/80 pr-0 md:pr-6">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#c5a880] font-mono block">CERCLE LE CERCLE</span>
              <h3 className="text-2xl font-serif text-gray-100 tracking-wide mt-1.5 mb-3">Le Salon Privé Lumière</h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                Rejoignez le cercle d'initiés de la Maison Lumière. Recevez de précieuses invitations pour nos lancements privés à Paris, nos flacons numérotés d'exception, et des sélections olfactives confidentielles adaptées à votre sillage.
              </p>
            </div>

            <div className="mt-6 md:mt-0 pt-4 border-t border-gray-900/40">
              <span className="text-[10px] text-[#c5a880] font-mono block flex items-center gap-1.5">
                <Sparkles size={11} />
                Avantages Exclusifs :
              </span>
              <ul className="text-[10px] text-gray-400 font-sans space-y-1 mt-1.5">
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 bg-[#c5a880] rounded-full" />
                  Invitations visites privées d'ateliers
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 bg-[#c5a880] rounded-full" />
                  Livraisons prioritaires gratuites
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 bg-[#c5a880] rounded-full" />
                  Bénéficiez de cadeaux d'exception
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interaction form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-3 cursor-default"
              >
                <div className="inline-flex p-3 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full">
                  <Check size={20} />
                </div>
                <h4 className="text-sm font-display uppercase tracking-widest text-emerald-400">Bienvenue au Salon, {name || "Cher Initié"}</h4>
                <p className="text-xs text-gray-400 font-serif italic">
                  Votre invitation confidentielle a été expédiée sous sceau numérique.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[9px] uppercase tracking-widest text-[#c5a880] block font-mono">
                    Votre Nom Complet
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jean-Valentin Robert"
                      className="w-full bg-[#141414] text-[#f5f5f5] text-xs font-sans rounded p-3 border border-gray-900 outline-none focus:border-[#c5a880]/60 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[9px] uppercase tracking-widest text-[#c5a880] block font-mono">
                    Votre Adresse Mail Confidentielle
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@mail.com"
                      className="w-full bg-[#141414] text-[#f5f5f5] text-xs font-sans rounded p-3 border border-gray-900 outline-none focus:border-[#c5a880]/60 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left pt-1">
                  <label className="text-[9px] uppercase tracking-widest text-[#c5a880] block font-mono">
                    Vos Aspirations Olfactives
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {["Les Origines", "Les Intenses", "Les Florales", "Les Coffrets"].map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => togglePreference(pref)}
                        className={`text-[9px] font-mono py-1 px-2.5 border rounded-full transition-colors ${
                          preferences.includes(pref)
                            ? "bg-[#c5a880] text-black border-[#c5a880]"
                            : "bg-transparent text-gray-400 border-gray-800 hover:text-[#c5a880]"
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c5a880] hover:bg-[#e5c8a0] text-[#0d0d0d] font-semibold text-xs tracking-widest uppercase font-display py-3.5 mt-2 transition-all cursor-pointer shadow-lg"
                >
                  REJOINDRE LE CERCLE
                </button>

                <p className="text-[8px] text-gray-500 font-mono text-center">
                  Nous respectons pleinement votre confidentialité absolue. Pas de pourriel. Désinscription en un clic.
                </p>
              </form>
            )}
          </div>

          {/* Close button modal header */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
