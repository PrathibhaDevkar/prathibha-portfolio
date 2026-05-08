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
    title: "Intelligent Handwritten Document Recognition (HTR)",
    description: "Built an end-to-end handwritten document digitization pipeline that preserved layout semantics and exported structured Markdown and JSON using a hybrid synthetic + real annotated dataset. Integrated YOLOv8s and TrOCR-large (33% CER) after evaluating multiple engines.",
    tags: ["Python", "PyTorch", "YOLOv8", "TrOCR"],
    stats: "76.11% mAP@50"
  },
  {
    title: "COVID-19 Detection via Chest X-Rays",
    description: "Built a transfer-learning pipeline to classify chest X-ray images into COVID-19, pneumonia, and normal using a dataset of 33.9K images. Achieved 93.16% test accuracy and deployed via Streamlit for real-time inference.",
    tags: ["TensorFlow", "Keras", "Streamlit", "EfficientNet"],
    stats: "93.16% Accuracy"
  },
  {
    title: "Recurrent Depth Transformer (RDT)",
    description: "Implemented the RDT architecture from scratch — a transformer that reasons through iterative refinement loops (h(t+1) = A·h(t) + B·e + Transformer(h(t), e)) rather than stacking layers. Benchmarked multi-hop reasoning (1–10 hops) against parameter-matched GPT baselines, demonstrating deeper reasoning without proportional parameter growth.",
    tags: ["Python", "PyTorch", "tiktoken", "CUDA/MPS"],
    stats: "3-Phase Pipeline",
    githubLink: "https://github.com/PrathibhaDevkar/rdt_transformer"
  },
  {
    title: "HVAC Lab Energy Monitoring Platform",
    description: "Built a real-time telemetry platform for HVAC, water heater, and solar energy systems using an MQTT middleware layer. Designed normalized data schemas and topic structures for time-series ingestion, validated multi-topic publish/subscribe pipelines, and contributed to a modular containerized microservices architecture spanning data collection, streaming, storage, and visualization.",
    tags: ["Python", "MQTT", "InfluxDB", "Grafana", "Docker"],
    stats: "Real-time Streaming"
  }
];
