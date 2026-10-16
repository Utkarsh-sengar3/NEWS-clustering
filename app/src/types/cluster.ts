export type ClusterCategory =
  | "All"
  | "World"
  | "Technology"
  | "Business"
  | "Sports"
  | "Lifestyle"
  | "Politics"
  | "Local"
  | "General"
  | "Energy";

export interface ClusterInfo {
  id: number;
  name: string;
  category: ClusterCategory;
  articleCount: number;
  datasetPercentage: number;
  topTerms: string[];
  description: string;
  interpretation: string;
  samples: string[];
  pcaX?: number;
  pcaY?: number;
}

export interface PredictionResult {
  cluster: number;
  topic: string;
  distance_to_centroid?: number;
}

export interface ArticlePreviewData {
  title?: string;
  source?: string;
  inputType: "text" | "pdf" | "docx" | "txt" | "url";
  filename?: string;
  url?: string;
  text: string;
  wordCount: number;
  charCount: number;
  readingTimeMin: number;
}

export interface BackendHealth {
  status: "healthy" | "offline" | "checking";
  modelLoaded?: boolean;
  clusters?: number;
}

export type Theme = "dark" | "light" | "system";

export interface ToastMessage {
  id: string;
  type: "success" | "info" | "error";
  message: string;
}
