import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, ChevronRight, Check, Sparkles } from 'lucide-react';
import { Fragrance, CartItem } from '../types';

interface DetailModalProps {
  fragrance: Fragrance | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (fragrance: Fragrance, volume: string) => void;
}

export default function DetailModal({ fragrance, isOpen, onClose, onAddToCart }: DetailModalProps) {
  const [selectedVol, setSelectedVol] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  React.useEffect(() => {
    if (fragrance) {
      setSelectedVol(fragrance.volume);
      setAddedSuccess(false);
    }
  }, [fragrance]);

  if (!fragrance) return null;

  const handleAdd = () => {
    onAddToCart(fragrance, selectedVol);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none">
          {/* Overlay */}
          <motion.div
            id="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            id="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-4xl bg-[#111111] border border-[#c5a880]/20 rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Close Button */}
            <button
              id="close-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-[#c5a880] hover:text-[#e5c8a0] bg-[#1a1a1a]/85 p-2 rounded-full border border-[#c5a880]/15 hover:border-[#c5a880]/40 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left Column: Image with beautiful background */}
            <div id="modal-image-col" className="w-full md:w-1/2 relative bg-[#181818] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#c5a880]/10 min-h-[300px] md:min-h-0">
              <div className="absolute inset-0 bg-radial from-[#c5a880]/10 to-transparent pointer-events-none" />
              <img
                src={fragrance.image}
                alt={fragrance.name}
                className="max-h-[250px] md:max-h-[420px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-4 left-4 text-[10px] tracking-widest font-mono text-[#c5a880]/60 uppercase">
                {fragrance.scentProfile}
              </span>
            </div>

            {/* Right Column: Detailed info */}
            <div id="modal-info-col" className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#c5a880] font-medium font-display mb-1 block">
                    {fragrance.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-[#f5f5f5] tracking-wide font-normal">
                    {fragrance.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-xl font-display text-[#c5a880] font-medium">
                      {fragrance.price} €
                    </p>
                    <span className="text-xs text-gray-400 border border-gray-800 px-2.5 py-0.5 rounded">
                      En stock d'exception
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#c5a880]/10 pt-4">
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    {fragrance.description}
                  </p>
                </div>

                {/* Scent Notes Pyramid structure or list */}
                <div className="space-y-3 bg-[#171717] p-4 rounded border border-gray-900">
                  <h4 className="text-xs uppercase tracking-widest text-[#c5a880] font-medium font-semibold">
                    Architecture Olfactive
                  </h4>
                  <div className="grid grid-cols-3 gap-2 font-sans text-xs">
                    <div className="p-2 bg-[#1d1d1d] rounded">
                      <span className="block text-[9px] text-[#c5a880]/70 uppercase font-mono tracking-wider">Note de Tête</span>
                      <p className="text-gray-200 mt-1 line-clamp-2">{fragrance.notes.top}</p>
                    </div>
                    <div className="p-2 bg-[#1d1d1d] rounded">
                      <span className="block text-[9px] text-[#c5a880]/70 uppercase font-mono tracking-wider">Note de Cœur</span>
                      <p className="text-gray-200 mt-1 line-clamp-2">{fragrance.notes.heart}</p>
                    </div>
                    <div className="p-2 bg-[#1d1d1d] rounded">
                      <span className="block text-[9px] text-[#c5a880]/70 uppercase font-mono tracking-wider">Note de Fond</span>
                      <p className="text-gray-200 mt-1 line-clamp-2">{fragrance.notes.base}</p>
                    </div>
                  </div>
                </div>

                {/* Volume Selector */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 block font-mono">
                    Format disponible :
                  </label>
                  <div className="flex gap-2">
                    {[fragrance.volume, '50ml (Édition Voyage)'].map((vol) => (
                      <button
                        key={vol}
                        type="button"
                        onClick={() => setSelectedVol(vol)}
                        className={`text-xs px-4 py-2 border transition-all duration-300 ${
                          selectedVol === vol
                            ? 'border-[#c5a880] text-[#c5a880] bg-[#c5a880]/10'
                            : 'border-gray-800 text-gray-400 hover:border-gray-700'
                        }`}
                      >
                        {vol}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-[#c5a880]/10 flex flex-col gap-3">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  disabled={addedSuccess}
                  className={`w-full py-3.5 px-4 font-display text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-800 text-emerald-100'
                      : 'bg-[#c5a880] hover:bg-[#e5c8a0] text-[#0d0d0d] font-semibold'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check size={14} className="animate-bounce" />
                      Ajouté au panier d'exception
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} />
                      Ajouter au panier ({(selectedVol.includes('50ml') ? fragrance.price * 0.75 : fragrance.price).toFixed(0)} €)
                    </>
                  )}
                </button>

                <p className="text-[10px] text-gray-400 text-center font-mono italic">
                  Livraison offerte – Expédié sous écrin de cire Maison Lumière.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
