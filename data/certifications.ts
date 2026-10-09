// Sourced from LinkedIn. Only the certifications worth highlighting are listed here.
export interface Certification {
  title: string;
  issuer: string;
  date: string;
  link?: string;
  /** Courses earned as part of a larger program, each with its own badge. */
  courses?: { title: string; date: string; link: string }[];
}

export const certifications: Certification[] = [
  {
    title: "IBM Data Science Specialization",
    issuer: "IBM · Coursera",
    date: "May 2024",
    link: "https://www.coursera.org/account/accomplishments/specialization/QUJXKDYB6L5E",
    courses: [
      {
        title: "Applied Data Science Capstone",
        date: "May 2024",
        link: "https://www.coursera.org/account/accomplishments/records/JWE6U63TRJHL",
      },
      {
        title: "Data Visualization with Python",
        date: "May 2024",
        link: "https://www.credly.com/badges/fc6b16b7-f5aa-4913-be78-cea8b27ffd84",
      },
      {
        title: "Machine Learning with Python",
        date: "Apr 2024",
        link: "https://www.credly.com/badges/afad4bf3-7fde-47ff-9fa6-63a071f43cbd",
      },
      {
        title: "Data Analysis with Python",
        date: "Mar 2024",
        link: "https://www.credly.com/badges/5c0eedc4-d522-4939-8fad-8f5d10e64851",
      },
      {
        title: "Python Project for Data Science",
        date: "Mar 2024",
        link: "https://www.credly.com/badges/8a611c88-ce65-4842-b05f-901dc2887717",
      },
    ],
  },
];
