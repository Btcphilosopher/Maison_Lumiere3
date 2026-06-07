import { Fragrance, CollectionItem } from './types';

// Let's import the specific images that we generated or use high quality fallbacks
export const FRAGRANCES: Fragrance[] = [
  {
    id: "orig-1",
    name: "L'Essence de l'Intemporel",
    category: "Les Origines",
    description: "Une envolée de bergamote délicate et de poivre rose, reposant sur un lit noble de bois de santal et de musc blanc. L'essence d'un classique éternel.",
    price: 185,
    image: "/src/assets/images/les_origines_1780836517431.png",
    volume: "100ml",
    notes: {
      top: "Bergamote, Poivre Rose, Angélique",
      heart: "Iris Royal, Rose Ottoman, Bois de Cèdre",
      base: "Bois de Santal Noir, Ambre Blanc, Musc Pur"
    },
    scentProfile: "Florale Épicée Boisée"
  },
  {
    id: "int-1",
    name: "Audace Sombre",
    category: "Les Intenses",
    description: "Un sillage mystérieux de vétiver terreux sculpté par la noirceur du patchouli, équilibré par des notes d'encens sacré et d'ambre précieux.",
    price: 210,
    image: "/src/assets/images/les_intenses_1780836532633.png",
    volume: "100ml",
    notes: {
      top: "Cardamome, Oud Sauvage, Safran",
      heart: "Cuir Coriace, Vétiver Sombre, Tabac blond",
      base: "Patchouli Noble, Gousse de Vanille, Encens de Somalie"
    },
    scentProfile: "Ambrée Boisée Cuirée"
  },
  {
    id: "flor-1",
    name: "Délicatesse Éternelle",
    category: "Les Florales",
    description: "Une symphonie florale réinventée où le jasmin d'eau frôle la douceur poudrée du magnolia, enveloppée de bois de cachemire sensuel.",
    price: 195,
    image: "/src/assets/images/les_florales_1780836551967.png",
    volume: "100ml",
    notes: {
      top: "Jasmin d'Eau, Mandarine Sicile, Néroli",
      heart: "Magnolia Blanc, Fleur d'Oranger, Pruneau",
      base: "Bois de Cachemire, Musc Doux, Fève Tonka"
    },
    scentProfile: "Florale Fraîche Poudrée"
  },
  {
    id: "coff-1",
    name: "Coffret Découverte",
    category: "Les Coffrets",
    description: "L'art d'offrir ou de découvrir. Un magnifique coffret de luxe regroupant trois de nos créations mémorables au format voyage d'exception.",
    price: 120,
    image: "/src/assets/images/les_coffrets_1780836565488.png",
    volume: "3 x 15ml",
    notes: {
      top: "Notes Variées d'Agrumes",
      heart: "Fleurs Précieuses, Épices Nobles",
      base: "Bois Sacrés, Ambre Doux"
    },
    scentProfile: "Multi-facettes (Florale, Boisée, Ambrée)"
  }
];

export const COLLECTIONS: CollectionItem[] = [
  {
    id: "orig",
    title: "LES ORIGINES",
    subtitle: "L'essence de l'intemporel.",
    keyText: "Les Origines incarne la quête de pureté et d'absolu. Des notes précieuses capturées avec rigueur pour en restituer la lumière primordiale.",
    image: "/src/assets/images/les_origines_1780836517431.png",
    description: "Découvrir la quintessence de la haute parfumerie française."
  },
  {
    id: "int",
    title: "LES INTENSES",
    subtitle: "L'audace des matières brutes.",
    keyText: "Exacerbées par le feu de la création, les matières d'exception s'affirment dans un sillage captivant, intense et d'une tenue magistrale.",
    image: "/src/assets/images/les_intenses_1780836532633.png",
    description: "Une intensité sans compromis, sculptée dans d'inestimables bois et résines d'orient."
  },
  {
    id: "flor",
    title: "LES FLORALES",
    subtitle: "La délicatesse réinventée.",
    keyText: "Une corolle de pétales soyeux et précieux, cueillis à l'aube lorsque la rosée matinale révèle leurs secrets de senteur les plus intimes.",
    image: "/src/assets/images/les_florales_1780836551967.png",
    description: "Des brassées florales vibrantes de fraîcheur et de poésie parisienne."
  },
  {
    id: "coff",
    title: "LES COFFRETS",
    subtitle: "L'art d'offrir, le plaisir de révéler.",
    keyText: "Chaque coffret est un écrin de cuir d'art conçu pour célébrer de grands moments. Des rituels olfactifs d'exception pour habiller la peau.",
    image: "/src/assets/images/les_coffrets_1780836565488.png",
    description: "Le cadeau par excellence, enveloppé dans l'exclusivité emblématique noire et or de la Maison."
  }
];
