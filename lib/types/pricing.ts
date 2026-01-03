export interface PricingCard {
  id: number;
  title: string;
  price: string;
  period?: string;
  disclaimer?: string;
  description?: string;
  features: string[];
  popular?: boolean;
  badge?: string | { image: string; alt: string };
  buttonText: string | { text: string; icon: string };
}

export interface PricingData {
  individual: PricingCard[];
  business: PricingCard[];
}

