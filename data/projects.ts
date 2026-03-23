export interface Project {
  title: string;
  description: string;
  tags: string[];
  stats?: string;
}

export const project : Project[] = [
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
  }
];