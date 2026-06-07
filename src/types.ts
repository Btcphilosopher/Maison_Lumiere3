export interface Fragrance {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  volume: string;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  scentProfile: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  keyText: string;
}

export interface CartItem {
  fragrance: Fragrance;
  quantity: number;
  selectedVolume: string;
}
