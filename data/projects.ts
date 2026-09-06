export interface Project {
  title: string;
  description: string;
  tags: string[];
  stats?: string;
  githubLink?: string;
  liveLink?: string;
}

export const project: Project[] = [
  {
    title: "Recurrent Depth Transformer (RDT)",
    description: "Implemented a Recurrent Depth Transformer from scratch in PyTorch, replacing stacked transformer layers with a single recurrently-looped block. Matched a parameter-matched GPT baseline's accuracy on multi-hop reasoning (1-5 hops) at 30-47% fewer parameters, then ran inference-time loop-scaling experiments (6/10/14 loops). Built a tool-calling agent on top of it, caught a misleading evaluation metric reporting 100% completion regardless of correctness, and rewrote the harness to report results honestly.",
    tags: ["Python", "PyTorch", "Transformers", "Evaluation"],
    stats: "30-47% Fewer Params",
    githubLink: "https://github.com/PrathibhaDevkar/rdt_transformer"
  },
  {
    title: "Confidence-Aware Meeting Intelligence",
    description: "Built a meeting summarizer and action-item extractor that scores the reliability of each output instead of presenting everything with equal certainty. A local LLM (Ollama, llama3.2:3b) extracts summaries and action items, independently cross-checked by a fine-tuned DistilBERT classifier; a calibrated confidence score (logistic regression on quote-grounding, owner-attribution plausibility, cross-model agreement, and self-reported confidence) was trained on 228 hand-labeled examples.",
    tags: ["Python", "Ollama", "DistilBERT", "Streamlit"],
    stats: "58% vs 16% Precision",
    githubLink: "https://github.com/PrathibhaDevkar/confidence-aware-meeting-intelligence"
  },
  {
    title: "Apex F1 Predictor",
    description: "Full-stack ML app forecasting Formula 1 race outcomes from historical race data (2023+) with a RandomForestClassifier and a FastAPI backend, including autonomous retraining after each race and WebSocket-based live telemetry. Reached AUC of 0.97/0.91/0.82 for win/podium/points-finish probability; exact finishing-position prediction is harder (~4-position MAE), a limitation surfaced directly in the app rather than hidden.",
    tags: ["Python", "FastAPI", "scikit-learn", "WebSocket"],
    stats: "0.97 AUC (Win)",
    githubLink: "https://github.com/PrathibhaDevkar/F1-prediction",
    liveLink: "https://frontend-snowy-alpha-65.vercel.app"
  }
];
