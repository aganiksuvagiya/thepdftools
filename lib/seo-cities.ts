export const citySeoPages = [
  { slug: "delhi", city: "Delhi", state: "Delhi", country: "India", countrySlug: "india" },
  { slug: "mumbai", city: "Mumbai", state: "Maharashtra", country: "India", countrySlug: "india" },
  { slug: "london", city: "London", state: "England", country: "United Kingdom", countrySlug: "united-kingdom" },
  { slug: "new-york-city", city: "New York City", state: "New York", country: "United States", countrySlug: "united-states" },
  { slug: "dubai", city: "Dubai", state: "Dubai", country: "United Arab Emirates", countrySlug: "united-arab-emirates" },
  { slug: "toronto", city: "Toronto", state: "Ontario", country: "Canada", countrySlug: "canada" },
  { slug: "sydney", city: "Sydney", state: "New South Wales", country: "Australia", countrySlug: "australia" },
  { slug: "singapore-city", city: "Singapore", state: "Singapore", country: "Singapore", countrySlug: "singapore" },
  { slug: "bangalore", city: "Bengaluru", state: "Karnataka", country: "India", countrySlug: "india" },
  { slug: "karachi", city: "Karachi", state: "Sindh", country: "Pakistan", countrySlug: "pakistan" },
  { slug: "dhaka", city: "Dhaka", state: "Dhaka Division", country: "Bangladesh", countrySlug: "bangladesh" },
  { slug: "riyadh", city: "Riyadh", state: "Riyadh Province", country: "Saudi Arabia", countrySlug: "saudi-arabia" },
  { slug: "los-angeles", city: "Los Angeles", state: "California", country: "United States", countrySlug: "united-states" },
  { slug: "melbourne", city: "Melbourne", state: "Victoria", country: "Australia", countrySlug: "australia" },
  { slug: "vancouver", city: "Vancouver", state: "British Columbia", country: "Canada", countrySlug: "canada" },
  { slug: "manchester", city: "Manchester", state: "England", country: "United Kingdom", countrySlug: "united-kingdom" },
  { slug: "abu-dhabi", city: "Abu Dhabi", state: "Abu Dhabi", country: "United Arab Emirates", countrySlug: "united-arab-emirates" },
  { slug: "hyderabad", city: "Hyderabad", state: "Telangana", country: "India", countrySlug: "india" },
  { slug: "chennai", city: "Chennai", state: "Tamil Nadu", country: "India", countrySlug: "india" },
  { slug: "pune", city: "Pune", state: "Maharashtra", country: "India", countrySlug: "india" },
  { slug: "ahmedabad", city: "Ahmedabad", state: "Gujarat", country: "India", countrySlug: "india" },
  { slug: "surat", city: "Surat", state: "Gujarat", country: "India", countrySlug: "india" },
  { slug: "kolkata", city: "Kolkata", state: "West Bengal", country: "India", countrySlug: "india" },
  { slug: "chicago", city: "Chicago", state: "Illinois", country: "United States", countrySlug: "united-states" },
  { slug: "houston", city: "Houston", state: "Texas", country: "United States", countrySlug: "united-states" },
  { slug: "birmingham-uk", city: "Birmingham", state: "England", country: "United Kingdom", countrySlug: "united-kingdom" },
  { slug: "calgary", city: "Calgary", state: "Alberta", country: "Canada", countrySlug: "canada" },
  { slug: "brisbane", city: "Brisbane", state: "Queensland", country: "Australia", countrySlug: "australia" },
  { slug: "sharjah", city: "Sharjah", state: "Sharjah", country: "United Arab Emirates", countrySlug: "united-arab-emirates" },
  { slug: "lahore", city: "Lahore", state: "Punjab", country: "Pakistan", countrySlug: "pakistan" },
  { slug: "islamabad", city: "Islamabad", state: "Islamabad Capital Territory", country: "Pakistan", countrySlug: "pakistan" },
  { slug: "chittagong", city: "Chattogram", state: "Chattogram Division", country: "Bangladesh", countrySlug: "bangladesh" },
  { slug: "jeddah", city: "Jeddah", state: "Makkah Province", country: "Saudi Arabia", countrySlug: "saudi-arabia" },
  { slug: "berlin", city: "Berlin", state: "Berlin", country: "Germany", countrySlug: "germany" },
  { slug: "munich", city: "Munich", state: "Bavaria", country: "Germany", countrySlug: "germany" },
  { slug: "paris", city: "Paris", state: "Ile-de-France", country: "France", countrySlug: "france" },
  { slug: "lyon", city: "Lyon", state: "Auvergne-Rhone-Alpes", country: "France", countrySlug: "france" },
  { slug: "cape-town", city: "Cape Town", state: "Western Cape", country: "South Africa", countrySlug: "south-africa" },
  { slug: "johannesburg", city: "Johannesburg", state: "Gauteng", country: "South Africa", countrySlug: "south-africa" },
  { slug: "tokyo", city: "Tokyo", state: "Tokyo", country: "Japan", countrySlug: "japan" },
  { slug: "osaka", city: "Osaka", state: "Osaka", country: "Japan", countrySlug: "japan" },
  { slug: "jakarta", city: "Jakarta", state: "Jakarta", country: "Indonesia", countrySlug: "indonesia" },
  { slug: "manila", city: "Manila", state: "Metro Manila", country: "Philippines", countrySlug: "philippines" },
  { slug: "bangkok", city: "Bangkok", state: "Bangkok", country: "Thailand", countrySlug: "thailand" },
  { slug: "kuala-lumpur", city: "Kuala Lumpur", state: "Kuala Lumpur", country: "Malaysia", countrySlug: "malaysia" },
  { slug: "jaipur", city: "Jaipur", state: "Rajasthan", country: "India", countrySlug: "india" },
  { slug: "vadodara", city: "Vadodara", state: "Gujarat", country: "India", countrySlug: "india" },
  { slug: "rajkot", city: "Rajkot", state: "Gujarat", country: "India", countrySlug: "india" },
] as const;

export type CitySeoPage = (typeof citySeoPages)[number];

export function getCitySeoPage(slug: string) {
  return citySeoPages.find((item) => item.slug === slug);
}

export function getCitySeoPageByCountry(countrySlug: string, citySlug: string) {
  return citySeoPages.find((item) => item.countrySlug === countrySlug && item.slug === citySlug);
}

export function getCitiesForCountry(countrySlug: string) {
  return citySeoPages.filter((item) => item.countrySlug === countrySlug);
}
