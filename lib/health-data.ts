export interface HealthData {
  id: string;
  title: string;
  description: string;
  region: string;
  category: string;
  year: number;
  source: string;
}

export const healthCategories = [
  "Infectious Diseases",
  "Mental Health",
  "Chronic Conditions",
  "Healthcare Access",
  "Vaccination",
  "Public Health",
] as const;

export const regions = [
  "Global",
  "North America",
  "Europe",
  "Asia",
  "Africa",
  "South America",
  "Oceania",
] as const;

export const healthData: HealthData[] = [
  {
    id: "1",
    title: "COVID-19 Vaccination Progress",
    description: "Analysis of global COVID-19 vaccination rates showing 68% of the population fully vaccinated.",
    region: "Global",
    category: "Vaccination",
    year: 2024,
    source: "WHO Global Health Observatory"
  },
  {
    id: "2",
    title: "Mental Health in Nordic Countries",
    description: "Study reveals 15% decrease in anxiety disorders through improved healthcare accessibility.",
    region: "Europe",
    category: "Mental Health",
    year: 2023,
    source: "European Health Report"
  },
  {
    id: "3",
    title: "Diabetes Prevalence in Southeast Asia",
    description: "Rising diabetes cases with 12% of adult population affected, highlighting need for intervention.",
    region: "Asia",
    category: "Chronic Conditions",
    year: 2024,
    source: "Asian Development Bank Health Initiative"
  },
  {
    id: "4",
    title: "Healthcare Access in Rural Africa",
    description: "Analysis of healthcare facility distribution showing 60% improvement in rural access.",
    region: "Africa",
    category: "Healthcare Access",
    year: 2023,
    source: "African Health Observatory"
  },
  {
    id: "5",
    title: "Malaria Prevention Success",
    description: "Successful implementation of prevention programs resulting in 40% reduction in cases.",
    region: "Africa",
    category: "Infectious Diseases",
    year: 2024,
    source: "WHO Malaria Report"
  },
  {
    id: "6",
    title: "Air Quality Impact on Health",
    description: "Study correlating air quality improvements with 25% reduction in respiratory conditions.",
    region: "Asia",
    category: "Public Health",
    year: 2024,
    source: "Environmental Health Insights"
  },
  {
    id: "7",
    title: "Depression Rates in Americas",
    description: "Comprehensive analysis showing 30% increase in depression diagnoses post-pandemic.",
    region: "North America",
    category: "Mental Health",
    year: 2023,
    source: "Pan American Health Organization"
  },
  {
    id: "8",
    title: "Vaccination Coverage in Oceania",
    description: "childhood vaccination rates reaching 95% across Pacific islands.",
    region: "Oceania",
    category: "Vaccination",
    year: 2024,
    source: "Pacific Health Initiative"
  },
  {
    id: "9",
    title: "Heart Disease Trends",
    description: "Global study showing 20% reduction in cardiovascular mortality through prevention.",
    region: "Global",
    category: "Chronic Conditions",
    year: 2024,
    source: "World Heart Federation"
  },
  {
    id: "10",
    title: "TB Eradication Progress",
    description: "Tuberculosis cases reduced by 35% through improved detection and treatment.",
    region: "South America",
    category: "Infectious Diseases",
    year: 2023,
    source: "Global TB Report"
  }
];