import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (index: number, change: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}: CartSidebarProps) {
  const totalPrice = cart.reduce((sum, item) => {
    const basePrice = item.selectedVolume.includes('50ml') ? item.fragrance.price * 0.75 : item.fragrance.price;
    return sum + (basePrice * item.quantity);
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="cart-sidebar-container" className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Overlay background */}
          <motion.div
            id="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm"
          />

          {/* Drawers */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              id="cart-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#121212] border-l border-[#c5a880]/10 flex flex-col justify-between shadow-2xl h-full"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#c5a880]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={18} className="text-[#c5a880]" />
                  <h3 className="text-sm font-display tracking-widest text-[#f5f5f5] uppercase font-semibold">
                    VOTRE PANIER — PARIS
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-[#c5a880] p-1.5 hover:bg-white/5 transition-colors duration-200"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-12 h-12 rounded-full border border-dashed border-[#c5a880]/20 flex items-center justify-center mx-auto text-[#c5a880]/60">
                      <ShoppingBag size={20} />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-mono">
                      Votre panier est vide.
                    </p>
                    <p className="text-xs text-gray-400 max-w-[200px] mx-auto leading-relaxed">
                      Laissez-vous tenter par l'exception d'une création Maison Lumière.
                    </p>
                  </div>
                ) : (
                  cart.map((item, index) => {
                    const price = item.selectedVolume.includes('50ml') ? item.fragrance.price * 0.75 : item.fragrance.price;
                    return (
                      <div key={`${item.fragrance.id}-${item.selectedVolume}`} className="flex gap-4 pb-6 border-b border-gray-900/40 last:border-0 last:pb-0">
                        {/* Img background */}
                        <div className="w-16 h-20 bg-[#171717] rounded flex items-center justify-center p-2.5 border border-white/[0.04]">
                          <img
                            src={item.fragrance.image}
                            alt={item.fragrance.name}
                            className="max-h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-[#c5a880] font-mono">
                              {item.fragrance.category}
                            </span>
                            <h4 className="text-xs font-serif text-gray-100 tracking-wide">
                              {item.fragrance.name}
                            </h4>
                            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                              Format : {item.selectedVolume}
                            </p>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-800 rounded overflow-hidden">
                              <button
                                onClick={() => onUpdateQty(index, -1)}
                                className="px-2 py-1 hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="px-2.5 text-xs text-gray-200 min-w-[20px] text-center font-mono">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQty(index, 1)}
                                className="px-2 py-1 hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-xs font-display text-[#c5a880] font-mono">
                                {(price * item.quantity).toFixed(0)} €
                              </span>
                              <button
                                onClick={() => onRemoveItem(index)}
                                className="text-gray-500 hover:text-rose-400 p-1 rounded hover:bg-white/5 transition-colors"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 bg-[#0c0c0c] border-t border-[#c5a880]/10 space-y-4">
                  <div className="space-y-1.5 font-sans">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Boutique de Paris (Taxes incluses)</span>
                      <span>Gratuit</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Livraison sécurisée d'exception</span>
                      <span className="text-[#c5a880]">Offert</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-900">
                      <span className="text-gray-300 font-display tracking-widest text-xs uppercase">TOTAL ESTIMÉ</span>
                      <span className="text-[#c5a880] font-mono">{totalPrice.toFixed(0)} €</span>
                    </div>
                  </div>

                  <button
                    id="checkout-btn"
                    onClick={onCheckout}
                    className="w-full bg-[#c5a880] hover:bg-[#e5c8a0] text-[#0d0d0d] font-display text-xs tracking-widest font-semibold uppercase py-3.5 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-md"
                  >
                    COMMANDER SÉCURISÉ
                    <ArrowRight size={13} />
                  </button>

                  <p className="text-[9px] text-gray-500 text-center font-mono">
                    Paiement chiffré SSL — Signature à la livraison.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
