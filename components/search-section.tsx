"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { healthData, healthCategories, regions } from "@/lib/health-data";
import type { HealthData } from "@/lib/health-data";

type SortOption = {
  label: string;
  value: keyof HealthData;
  order: 'asc' | 'desc';
};

const sortOptions: SortOption[] = [
  { label: "Latest First", value: "year", order: "desc" },
  { label: "Oldest First", value: "year", order: "asc" },
  { label: "Title A-Z", value: "title", order: "asc" },
  { label: "Title Z-A", value: "title", order: "desc" },
  { label: "Region A-Z", value: "region", order: "asc" },
  { label: "Region Z-A", value: "region", order: "desc" },
];

export function SearchSection() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>("year-desc");

  const years = useMemo(() => {
    const uniqueYears = [...new Set(healthData.map(item => item.year))];
    return uniqueYears.sort((a, b) => b - a);
  }, []);

  const filteredAndSortedResults = useMemo(() => {
    // First, filter the results
    const filtered = healthData.filter(item => {
      const matchesQuery = query === "" || 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesRegion = selectedRegion === "all" || item.region === selectedRegion;
      const matchesYear = selectedYear === "all" || item.year.toString() === selectedYear;

      return matchesQuery && matchesCategory && matchesRegion && matchesYear;
    });

    // Then, sort the filtered results
    const [field, order] = sortBy.split('-') as [keyof HealthData, 'asc' | 'desc'];
    const sortOption = sortOptions.find(opt => `${opt.value}-${opt.order}` === sortBy);

    if (!sortOption) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[sortOption.value];
      const bVal = b[sortOption.value];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOption.order === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOption.order === 'asc' 
          ? aVal - bVal
          : bVal - aVal;
      }

      return 0;
    });
  }, [query, selectedCategory, selectedRegion, selectedYear, sortBy]);

  return (
    <Card className="p-6 mb-12 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Search health information..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            data-testid="search-input"
          />
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="min-w-[140px]">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem 
                    key={`${option.value}-${option.order}`}
                    value={`${option.value}-${option.order}`}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="min-w-[100px]"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {healthCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {filteredAndSortedResults.length > 0 && (
          <div className="space-y-4 mt-6" data-testid="search-results">
            {filteredAndSortedResults.map((result) => (
              <SearchResult key={result.id} result={result} />
            ))}
          </div>
        )}

        {query && filteredAndSortedResults.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No results found for your search criteria.
          </div>
        )}
      </div>
    </Card>
  );
}

function SearchResult({ result }: { result: HealthData }) {
  return (
    <div className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
      <h3 className="font-semibold mb-2">{result.title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
          {result.category}
        </span>
        <span className="px-2 py-1 rounded-full bg-secondary/50">
          {result.region}
        </span>
        <span className="px-2 py-1 rounded-full bg-muted">
          {result.year}
        </span>
        <span className="px-2 py-1 rounded-full bg-accent/10">
          {result.source}
        </span>
      </div>
    </div>
  );
}