export const CATEGORIES = [
  { key: "marketing", label: "שיווק", icon: "🚀" },
  { key: "sales", label: "מכירות", icon: "📣" },
  { key: "fundraising", label: "גיוס משקיעים", icon: "🎤" },
  { key: "refine", label: "שיפור וחידוד", icon: "🔍" },
];

export function categoryLabel(key) {
  return CATEGORIES.find((c) => c.key === key)?.label || key;
}
