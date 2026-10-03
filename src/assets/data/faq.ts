import type { Question } from "@/types/content";
export const faq = {
  eyebrow: "04 / A LITTLE MORE CLARITY",
  title: "Curiosity is a good place to start.",
  description: "A few things you might be wondering before you take the next step.",
  items: [
    {
      question: "Is Orbit a real space-travel operator?",
      answer:
        "Orbit is a fictional brand created for this Junno UI template. Journeys, prices, and passenger stories are demonstration content, not bookable offers.",
    },
    {
      question: "What happens when I enquire?",
      answer:
        "The form prepares a message in your email app. It does not send a message automatically, reserve a seat, or process a payment. A template owner can connect their own enquiry service.",
    },
    {
      question: "Can a journey be tailored to a private group?",
      answer:
        "The Beyond concept illustrates a bespoke offering. The template is designed to be customized for private experiences, expeditions, hospitality, or an entirely different business.",
    },
    {
      question: "How should I prepare for an experience like this?",
      answer:
        "For a real journey, preparation and eligibility would be defined by the operator. Replace this sample answer with your own verified requirements before publishing a travel offering.",
    },
    {
      question: "Where can I learn more about the template?",
      answer:
        "Orbit is published by Junno UI. Visit junno-ui.com for template information, support, and custom work, or read the documentation included with your download.",
    },
  ] satisfies Question[],
};
