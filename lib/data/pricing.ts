import type { PricingData } from "@/lib/types/pricing";

export const pricingData: PricingData = {
  individual: [
    {
      id: 1,
      title: "Single Credit",
      price: "$2.5",
      period: "/1 credit",
      description:
        "You can buy a single credit to create a personalized book or use it to generate a book from a template. Illustrator is not included in the single credit purchase.",
      features: [
        "Listen to books come alive with text-to-speech feature",
        "Books in your language and voiceover",
        "Edit or change your illustrations up to 16 times",
        "Limitless editing with canva integration",
        "Personalized and unique characters",
        "Up to 12 pages per AI generated book",
        "One personalized book or a template generation",
      ],
      buttonText: "Buy a Single Book",
    },
    {
      id: 2,
      title: "Premium Plan",
      price: "$29",
      period: "/year*",
      disclaimer: "*Cancel anytime",
      description:
        "Premium plan is the best option for those who want to create a lot of personalized children's books with AI or want to illustrate their own story with our Childbook Illustrator™",
      features: [
        "Access to Childbook Illustrator™ and Illustrate your Children's Book with AI - without pages limitation",
        "500 illustrations per month",
        "Up to 100 personalized AI generated books per month",
        "Limitless editing with canva integration",
        "Books in your language",
        "Your name on the book cover",
        "Edit the story and illustrations to your liking",
        "Option for more text content per page",
        "Up to 20 pages per generated book",
        "Premium book cover that you can generate",
        "Personalized and unique characters, illustrations and stories",
        "Listen to books come alive with text-to-speech Feature",
      ],
      popular: true,
      badge: { image: "/illustrations/gold-crown-icon.svg", alt: "Crown" },
      buttonText: "Get Premium",
    },
    {
      id: 3,
      title: "Hobby Plan",
      price: "$19",
      period: "/year*",
      disclaimer: "*Cancel anytime",
      description:
        "Hobby plan is the best option for those who want to create a few personalized children's books with AI or want to illustrate a short story with our AI Illustrator™",
      features: [
        "Access to Childbook Illustrator™ and Illustrate your Children's Book with AI- without pages limitation",
        "100 illustrations per month",
        "Up to 20 ai generated books per month",
        "Books in your language",
        "Limitless editing with canva integration",
        "Your name on the book cover",
        "Option for more text content per page",
        "Up to 16 pages per generated book",
        "Personalized and unique characters, illustrations and stories",
        "Listen to books come alive with text-to-speech Feature",
      ],
      badge: { image: "/illustrations/silver-crown-icon.svg", alt: "Crown" },
      buttonText: "Buy Hobby Plan",
    },
  ],
  business: [
    {
      id: 1,
      title: "Business Plan",
      price: "$99",
      period: "/year*",
      disclaimer: "*Cancel anytime",
      description:
        "Perfect for businesses, publishers, and professional authors who need high volume of illustrations and books without childbook.ai watermark.",
      features: [
        "Commercial license for all generated content",
        "2000 illustrations per month in our Childbook Illustrator™",
        "Up to 200 AI generated books per month with 24 pages",
        "Export without watermarks",
        "Upload your own illustrations for customization",
        "Priority queue for faster AI generation",
        "All features from Premium plan included",
      ],
      buttonText: "Get Business Plan",
    },
  ],
};

