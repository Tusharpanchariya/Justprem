export const HARMONIUM_POLICY_VERSION = "2026-11-14-v1";

export type PurchasePolicy = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const EU_COUNTRY_CODES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
]);

export const EUROPEAN_WITHDRAWAL_COUNTRY_CODES = new Set([...EU_COUNTRY_CODES, "GB"]);

export const purchasePolicies: PurchasePolicy[] = [
  {
    id: "handcrafted",
    title: "Handcrafted Product Disclaimer",
    paragraphs: [
      "Every JustPrem harmonium is individually handcrafted using natural wood and traditional woodworking techniques.",
      "Because wood is a natural material and every instrument is finished by hand, slight variations in appearance may occur.",
    ],
    bullets: [
      "Natural wood grain variations.",
      "Slight differences in wood colour and shade.",
      "Minor polish and finishing variations.",
      "Small handcrafted marks that do not affect structural integrity.",
      "Minor variations in handcrafted detailing.",
      "Slight differences between product photographs and the actual product due to lighting and display settings.",
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Delivery Policy",
    paragraphs: [
      "JustPrem delivers harmoniums across India and to selected international destinations.",
      "Each instrument undergoes a quality inspection before dispatch.",
      "Customers should inspect the outer packaging upon delivery and check the harmonium for visible damage.",
      "We strongly recommend recording an unboxing video and taking photographs of any damaged packaging or instrument.",
      "Visible shipping damage should be reported within 48 hours wherever reasonably possible.",
      "Delivery timelines are estimates unless expressly confirmed otherwise. Delays may occur due to courier disruptions, customs inspections, weather conditions and other circumstances beyond reasonable control.",
      "The absence of an unboxing video will not automatically invalidate a genuine complaint.",
    ],
  },
  {
    id: "returns",
    title: "Return & Replacement Policy",
    paragraphs: [
      "JustPrem does not offer general voluntary change-of-mind returns for correctly supplied, non-defective standard harmoniums in India.",
      "Eligible claims involving defective, damaged, incorrect or materially non-conforming products will be assessed for appropriate remedies.",
      "Natural wood grain variations, slight colour differences and minor non-structural handmade finishing variations alone are not eligible for defect-based returns.",
      "Mandatory consumer rights in the customer's destination country always prevail. For eligible EU online purchases, the statutory 14-day withdrawal right generally applies, subject to legal exceptions.",
      "Customised products qualify for a withdrawal exception only where the applicable legal requirements are satisfied. Choosing a standard colour or finish does not by itself remove a withdrawal right.",
    ],
    bullets: [
      "Broken wooden structures.",
      "Broken or non-functional keys.",
      "Significant bellows leakage.",
      "Manufacturing defects in reeds.",
      "Major functional problems.",
      "Incorrect product specifications.",
      "Missing included components.",
    ],
  },
  {
    id: "damage",
    title: "Damage Reporting Policy",
    paragraphs: [
      "If your harmonium arrives damaged, contact JustPrem as soon as possible, preferably within 48 hours of delivery.",
      "Please provide the following information to help us investigate:",
    ],
    bullets: [
      "Order number.",
      "Photographs of the outer packaging.",
      "Photographs of the damaged harmonium.",
      "Unboxing video, if available.",
      "Description of the problem.",
    ],
  },
  {
    id: "refunds",
    title: "Refund Policy",
    paragraphs: [
      "Refunds may be provided where:",
      "Approved refunds will normally be initiated through the original payment method. Our ordinary operational target is 7–10 business days after approval and any necessary verification, subject to applicable statutory deadlines. EU statutory withdrawal refunds follow the applicable legal deadlines.",
    ],
    bullets: [
      "A qualifying manufacturing defect cannot reasonably be repaired.",
      "A suitable replacement is unavailable.",
      "The delivered product materially differs from the confirmed order.",
      "JustPrem cannot fulfil the order.",
      "A refund is required by applicable consumer law.",
      "A valid statutory withdrawal right is exercised.",
    ],
  },
  {
    id: "warranty",
    title: "Six-Month Warranty Policy",
    paragraphs: [
      "JustPrem offers a six-month commercial warranty from the date of delivery for eligible manufacturing and workmanship defects.",
      "Subject to assessment, coverage includes:",
    ],
    bullets: [
      "Manufacturing defects in wooden structures.",
      "Bellows manufacturing defects.",
      "Defective keys and internal mechanisms.",
      "Manufacturing defects in reeds and reed assemblies.",
      "The commercial warranty does not ordinarily cover normal wear and tear, accidental damage after delivery, water damage, improper handling or storage, unauthorised repairs or modifications, natural wood variations, or minor non-structural handcrafted variations.",
    ],
  },
  {
    id: "international",
    title: "International Orders & Customs",
    paragraphs: [
      "International customers may be subject to import duties, taxes, customs clearance charges and local import requirements.",
      "The applicable shipping arrangement and known additional charges will be disclosed before payment.",
      "International return and withdrawal rights are governed by applicable destination-country consumer protection laws.",
      "JustPrem will provide appropriate assistance with eligible international defect and damage claims.",
    ],
  },
  {
    id: "cancellation",
    title: "Order Cancellation",
    paragraphs: [
      "Customers may request cancellation before dispatch.",
      "For customised or made-to-order harmoniums, cancellation restrictions may apply after production has commenced, where legally permitted and properly disclosed before purchase.",
      "Nothing in this section removes any statutory cancellation or withdrawal rights.",
    ],
  },
  {
    id: "support",
    title: "Customer Support & Grievance Redressal",
    paragraphs: [
      "Customers may contact us for assistance regarding orders, delivery, damage, returns, refunds, repairs and warranty claims.",
      "Our aim is to acknowledge complaints within 48 hours and resolve them within one month, subject to applicable law.",
    ],
    bullets: [
      "Brand: JustPrem Harmoniums",
      "Legal Entity: VITTHAL PREM TRAVELS LLP",
      "Customer Support Email: connect@justprem.shop",
      "Phone / WhatsApp: +91 9289001698 / +91 9971141996",
      "Grievance Officer: ",
      "Grievance Email: connect@justprem.shop",
    ],
  },
];

export const europeanWithdrawalPolicy: PurchasePolicy = {
  id: "eu-withdrawal",
  title: "European Withdrawal Information & Model Form",
  paragraphs: [
    "For eligible EU consumer distance purchases, you generally have 14 days from delivery to withdraw without giving a reason, subject to applicable legal exceptions. An exception for goods made to a consumer's specifications or clearly personalised applies only when the legal requirements are met; selecting among standard product or finish options does not automatically remove withdrawal rights.",
    "To exercise a withdrawal right, contact JustPrem Harmoniums at connect@justprem.shop with a clear statement that you wish to withdraw. You may use the model form below, but it is not obligatory. This notice does not limit more protective rights under the law that applies to your purchase.",
    "For goods covered by EU consumer sales rules, the statutory legal guarantee is generally at least two years. The six-month commercial warranty is additional and does not replace that guarantee or any longer mandatory rights.",
    "Model withdrawal form (complete and return only if you wish to withdraw):",
  ],
  bullets: [
    "To: VITTHAL PREM TRAVELS LLP, JustPrem Harmoniums, connect@justprem.shop.",
    "I/We hereby give notice that I/We withdraw from my/our contract of sale of the following goods: ____________________.",
    "Ordered on / received on: ____________________.",
    "Name of consumer(s): ____________________.",
    "Address of consumer(s): ____________________.",
    "Date: ____________________.",
  ],
};

export const ukWithdrawalPolicy: PurchasePolicy = {
  id: "uk-withdrawal",
  title: "United Kingdom Cancellation Information",
  paragraphs: [
    "For eligible UK consumer distance purchases, you generally have 14 days after receiving the goods to cancel without giving a reason, subject to applicable exceptions. Bespoke or personalised goods may be excluded only where the legal conditions are met.",
    "To cancel, contact connect@justprem.shop with a clear statement that you wish to cancel. Nothing here limits mandatory rights under UK consumer law.",
  ],
  bullets: ["Name: ____________________.", "Address: ____________________.", "Order reference: ____________________.", "Goods to be returned: ____________________.", "Date: ____________________."],
};

export function applicablePurchasePolicies(countryCode: string) {
  const code = countryCode.toUpperCase();
  if (EU_COUNTRY_CODES.has(code)) return [...purchasePolicies, europeanWithdrawalPolicy];
  if (code === "GB") return [...purchasePolicies, ukWithdrawalPolicy];
  return purchasePolicies;
}

export function buildPurchasePolicySnapshot(countryCode: string) {
  return {
    version: HARMONIUM_POLICY_VERSION,
    sections: applicablePurchasePolicies(countryCode).map(({ id, title, paragraphs, bullets }) => ({ id, title, paragraphs, bullets: bullets ?? [] })),
    additionalRightsNotice: "Mandatory consumer rights applicable to the purchase remain unaffected.",
  };
}
