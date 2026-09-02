export type AppPage = 
  | 'inicio'
  | 'menu-sabores'
  | 'inspiracion'
  | 'como-pedir'
  | 'cotizar-disponibilidad';

export type ProductCategory = 
  | 'todos'
  | 'tortas'
  | 'minicakes'
  | 'cupcakes'
  | 'cookies'
  | 'boxes'
  | 'postres';

export interface ProductItem {
  id: string;
  name: string;
  category: 'tortas' | 'minicakes' | 'cupcakes' | 'cookies' | 'boxes' | 'postres';
  description: string;
  priceFrom: number; // in Bolivianos (Bs.)
  servings: string;
  leadTime: string;
  badge?: 'MÁS PEDIDO' | 'NUEVO' | 'PERSONALIZABLE' | 'EDICIÓN ESPECIAL';
  image: string;
  flavorsAvailable: string[];
  sizes: string[];
  ingredientsHighlight: string;
}

export interface FlavorBase {
  id: string;
  name: string;
  description: string;
  tag: string;
  colorHex: string;
}

export interface FlavorFilling {
  id: string;
  name: string;
  description: string;
  tag: string;
}

export interface FlavorCombo {
  name: string;
  badge: 'Favorita de la casa' | 'Más vendida' | 'Edición especial';
  base: string;
  filling: string;
  coating: string;
  description: string;
  pairingNote: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'cumpleanos' | 'infantil' | 'minimalista' | 'vintage' | 'floral' | 'tematica' | 'graduacion' | 'babyshower';
  categoryLabel: string;
  image: string;
  servings: string;
  style: string;
  occasion: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  event: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
}

export interface FaqItem {
  id: string;
  category: 'pedidos' | 'pagos' | 'sabores' | 'envios' | 'cuidados' | 'cambios';
  question: string;
  answer: string;
}

export interface WizardOrderState {
  productType: string;
  occasion: string;
  servings: string;
  flavorBase: string;
  flavorFilling: string;
  designStyle: string;
  colorPalette: string;
  eventDate: string;
  messageDedication: string;
  clientName: string;
  clientPhone: string;
  additionalNotes: string;
}
