import { College } from "@/types";

export const MOCK_COLLEGES: College[] = [
  {
    id: "iit-bombay",
    name: "Indian Institute of Technology, Bombay (IITB)",
    description: "IIT Bombay is a leading public engineering institution known worldwide for its academic excellence, cutting-edge research, and top-tier placements. Situated in Powai, Mumbai, it features a lush campus next to Powai Lake.",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=120&h=120",
    coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200&h=450",
    featuredImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600&h=400",
    location: {
      city: "Mumbai",
      state: "Maharashtra"
    },
    established: 1958,
    type: "Public",
    rating: 4.8,
    reviewsCount: 342,
    feesRange: {
      min: 200000,
      max: 250000
    },
    ranking: {
      national: 3,
      engineering: 1
    },
    infrastructure: ["High-speed Wi-Fi", "Olympic-size Swimming Pool", "Advanced Robotics Lab", "Hostel Blocks", "24/7 Library"],
    placementStats: {
      averageSalary: 23.5,
      highestSalary: 85.0,
      placementRate: 98,
      topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "Uber", "Apple"]
    },
    courses: [
      {
        id: "iitb-cse",
        name: "B.Tech in Computer Science and Engineering",
        duration: "4 Years",
        feesPerYear: 220000,
        eligibility: "JEE Advanced Qualified"
      },
      {
        id: "iitb-ee",
        name: "B.Tech in Electrical Engineering",
        duration: "4 Years",
        feesPerYear: 220000,
        eligibility: "JEE Advanced Qualified"
      },
      {
        id: "iitb-mtech-cse",
        name: "M.Tech in Computer Science",
        duration: "2 Years",
        feesPerYear: 80000,
        eligibility: "GATE Qualified"
      }
    ],
    reviews: [
      {
        id: "rev-iitb-1",
        userName: "Aarav Sharma",
        rating: 5,
        date: "2026-04-12",
        comment: "Outstanding campus culture and peer group. The placement cell is extremely efficient, and the coding culture is second to none.",
        categoryRatings: {
          academics: 5,
          infrastructure: 4.5,
          placements: 5,
          campusLife: 5
        }
      },
      {
        id: "rev-iitb-2",
        userName: "Priya Patel",
        rating: 4.5,
        date: "2026-05-01",
        comment: "Excellent professors and research opportunities. Hostels are a bit old but the library facilities and labs make up for it.",
        categoryRatings: {
          academics: 5,
          infrastructure: 4,
          placements: 4.8,
          campusLife: 4.5
        }
      }
    ]
  },
  {
    id: "bits-pilani",
    name: "Birla Institute of Technology and Science, Pilani",
    description: "BITS Pilani is an elite private deemed university celebrated for its rigorous academic curriculum, 'no attendance policy', and strong entrepreneurship ecosystem through its alumni network.",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=120&h=120",
    coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200&h=450",
    featuredImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&q=80&w=600&h=400",
    location: {
      city: "Pilani",
      state: "Rajasthan"
    },
    established: 1964,
    type: "Private",
    rating: 4.6,
    reviewsCount: 289,
    feesRange: {
      min: 450000,
      max: 550000
    },
    ranking: {
      national: 20,
      engineering: 5
    },
    infrastructure: ["AC Classrooms", "Modern Student Center", "Innovation Garage", "Lush Campus", "Gymnasium"],
    placementStats: {
      averageSalary: 18.2,
      highestSalary: 60.5,
      placementRate: 95,
      topRecruiters: ["Amazon", "Nvidia", "Salesforce", "DE Shaw", "McKinsey"]
    },
    courses: [
      {
        id: "bits-cse",
        name: "B.E. in Computer Science",
        duration: "4 Years",
        feesPerYear: 510000,
        eligibility: "BITSAT Qualified"
      },
      {
        id: "bits-ece",
        name: "B.E. in Electronics and Communication",
        duration: "4 Years",
        feesPerYear: 510000,
        eligibility: "BITSAT Qualified"
      },
      {
        id: "bits-mba",
        name: "MBA in Business Analytics",
        duration: "2 Years",
        feesPerYear: 450000,
        eligibility: "CAT / GMAT"
      }
    ],
    reviews: [
      {
        id: "rev-bits-1",
        userName: "Rahul Verma",
        rating: 4.8,
        date: "2026-03-20",
        comment: "Zero attendance policy is amazing! It teaches you real-world responsibility. High startup incubation focus. Highly recommend.",
        categoryRatings: {
          academics: 4.5,
          infrastructure: 4.8,
          placements: 4.6,
          campusLife: 5
        }
      }
    ]
  },
  {
    id: "delhi-technological-university",
    name: "Delhi Technological University (DTU)",
    description: "DTU (formerly Delhi College of Engineering) is a premier public university in New Delhi. It is highly sought after for its exceptional corporate relations and extensive alumni list in tech leadership.",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=120&h=120",
    coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200&h=450",
    featuredImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600&h=400",
    location: {
      city: "New Delhi",
      state: "Delhi"
    },
    established: 1941,
    type: "Public",
    rating: 4.4,
    reviewsCount: 215,
    feesRange: {
      min: 180000,
      max: 220000
    },
    ranking: {
      national: 29,
      engineering: 8
    },
    infrastructure: ["Huge Sports Arena", "Auditorium", "Incubation Center", "Spacious Labs", "Central Library"],
    placementStats: {
      averageSalary: 15.6,
      highestSalary: 64.0,
      placementRate: 91,
      topRecruiters: ["Microsoft", "Adobe", "Qualcomm", "Amazon", "Deloitte"]
    },
    courses: [
      {
        id: "dtu-cse",
        name: "B.Tech in Computer Science and Engineering",
        duration: "4 Years",
        feesPerYear: 200000,
        eligibility: "JEE Main (JAC Delhi)"
      },
      {
        id: "dtu-it",
        name: "B.Tech in Information Technology",
        duration: "4 Years",
        feesPerYear: 200000,
        eligibility: "JEE Main (JAC Delhi)"
      }
    ],
    reviews: [
      {
        id: "rev-dtu-1",
        userName: "Karan Gupta",
        rating: 4.4,
        date: "2026-02-15",
        comment: "Excellent placement statistics year after year. The campus is very large, but the administrative processes can feel a bit sluggish.",
        categoryRatings: {
          academics: 4,
          infrastructure: 4.2,
          placements: 4.8,
          campusLife: 4.5
        }
      }
    ]
  },
  {
    id: "rv-college-of-engineering",
    name: "RV College of Engineering (RVCE)",
    description: "RVCE is one of the most prominent private engineering colleges in Bangalore. Backed by excellent placement records due to its location in India's IT capital.",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=120&h=120",
    coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200&h=450",
    featuredImage: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=600&h=400",
    location: {
      city: "Bangalore",
      state: "Karnataka"
    },
    established: 1963,
    type: "Private",
    rating: 4.2,
    reviewsCount: 154,
    feesRange: {
      min: 250000,
      max: 380000
    },
    ranking: {
      national: 96,
      engineering: 35
    },
    infrastructure: ["Cafeteria", "Hostels", "IT Infrastructure", "Seminar Halls", "Gym"],
    placementStats: {
      averageSalary: 11.8,
      highestSalary: 48.0,
      placementRate: 89,
      topRecruiters: ["Cisco", "Intel", "SAP", "JP Morgan", "Accenture"]
    },
    courses: [
      {
        id: "rv-cse",
        name: "B.E. in Computer Science and Engineering",
        duration: "4 Years",
        feesPerYear: 350000,
        eligibility: "KCET / COMEDK"
      },
      {
        id: "rv-ise",
        name: "B.E. in Information Science and Engineering",
        duration: "4 Years",
        feesPerYear: 320000,
        eligibility: "KCET / COMEDK"
      }
    ],
    reviews: [
      {
        id: "rev-rv-1",
        userName: "Sneha Reddy",
        rating: 4.2,
        date: "2026-04-05",
        comment: "If you want placements in Bangalore tech sector, RVCE is the best. The academics are rigorous and exams are conducted on time.",
        categoryRatings: {
          academics: 4.5,
          infrastructure: 3.8,
          placements: 4.6,
          campusLife: 3.8
        }
      }
    ]
  },
  {
    id: "iim-ahmedabad",
    name: "Indian Institute of Management, Ahmedabad (IIMA)",
    description: "IIM Ahmedabad is India's premier management institute, consistently ranked #1 in business education. Famed for its case-study method of teaching and the iconic Louis Kahn campus heritage.",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=120&h=120",
    coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200&h=450",
    featuredImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600&h=400",
    location: {
      city: "Ahmedabad",
      state: "Gujarat"
    },
    established: 1961,
    type: "Public",
    rating: 4.9,
    reviewsCount: 188,
    feesRange: {
      min: 1200000,
      max: 1300000
    },
    ranking: {
      national: 1,
      management: 1
    },
    infrastructure: ["Louis Kahn Plaza", "Harvard Business Publishing Hub", "Modern AC Rooms", "24/7 Library", "Sport Courts"],
    placementStats: {
      averageSalary: 32.7,
      highestSalary: 115.0,
      placementRate: 100,
      topRecruiters: ["McKinsey & Co", "Boston Consulting Group", "Bain & Co", "Morgan Stanley", "Tata Group"]
    },
    courses: [
      {
        id: "iima-pgp",
        name: "Post Graduate Program in Management (MBA)",
        duration: "2 Years",
        feesPerYear: 1250000,
        eligibility: "CAT + Interview"
      },
      {
        id: "iima-pgpx",
        name: "PGP for Executives (MBA-Executive)",
        duration: "1 Year",
        feesPerYear: 3000000,
        eligibility: "GMAT/GRE + Work Exp"
      }
    ],
    reviews: [
      {
        id: "rev-iima-1",
        userName: "Vikram Mehta",
        rating: 5,
        date: "2026-05-18",
        comment: "Life-changing experience. The academic load is massive but the learning and network you build here is unmatched anywhere in India.",
        categoryRatings: {
          academics: 5,
          infrastructure: 4.8,
          placements: 5,
          campusLife: 4.5
        }
      }
    ]
  },
  {
    id: "symbiosis-pune",
    name: "Symbiosis Institute of Business Management (SIBM), Pune",
    description: "SIBM Pune is a leading private business school known for its beautiful hilltop campus in Lavale, Pune, rich student-driven culture, and solid industry relationships.",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=120&h=120",
    coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200&h=450",
    featuredImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&q=80&w=600&h=400",
    location: {
      city: "Pune",
      state: "Maharashtra"
    },
    established: 1978,
    type: "Private",
    rating: 4.5,
    reviewsCount: 142,
    feesRange: {
      min: 1050000,
      max: 1150000
    },
    ranking: {
      national: 17,
      management: 6
    },
    infrastructure: ["Hilltop Viewpoint", "Swimming Pool", "Modern Hostels", "Amphitheater", "Mess & Café"],
    placementStats: {
      averageSalary: 26.8,
      highestSalary: 49.0,
      placementRate: 98,
      topRecruiters: ["ITC", "P&G", "Accenture Strategy", "Wipro", "HDFC Bank"]
    },
    courses: [
      {
        id: "sibm-mba",
        name: "MBA in Marketing/Finance/HR/Operations",
        duration: "2 Years",
        feesPerYear: 1100000,
        eligibility: "SNAP Test + GE-PI"
      }
    ],
    reviews: [
      {
        id: "rev-sibm-1",
        userName: "Ananya Sen",
        rating: 4.6,
        date: "2026-04-22",
        comment: "Lavale campus is breathtakingly beautiful. Highly vibrant campus life with constant corporate guest lectures and events.",
        categoryRatings: {
          academics: 4.2,
          infrastructure: 5,
          placements: 4.5,
          campusLife: 5
        }
      }
    ]
  },
  {
    id: "nit-trichy",
    name: "National Institute of Technology, Tiruchirappalli",
    description: "NIT Trichy is recognized as the top NIT in India, boasting massive state-of-the-art labs and a historical engineering reputation. Famed for its tech festival Pragyan.",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=120&h=120",
    coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200&h=450",
    featuredImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600&h=400",
    location: {
      city: "Trichy",
      state: "Tamil Nadu"
    },
    established: 1964,
    type: "Public",
    rating: 4.5,
    reviewsCount: 198,
    feesRange: {
      min: 125000,
      max: 150000
    },
    ranking: {
      national: 21,
      engineering: 9
    },
    infrastructure: ["Computing Center", "Heavy Machinery Labs", "Open-air Theatre", "Vast Campus", "Guest House"],
    placementStats: {
      averageSalary: 16.0,
      highestSalary: 52.8,
      placementRate: 94,
      topRecruiters: ["Microsoft", "Cisco", "Texas Instruments", "Maruti Suzuki", "Qualcomm"]
    },
    courses: [
      {
        id: "nitt-cse",
        name: "B.Tech in Computer Science and Engineering",
        duration: "4 Years",
        feesPerYear: 140000,
        eligibility: "JEE Main (JoSAA)"
      },
      {
        id: "nitt-ece",
        name: "B.Tech in Electronics and Communication Engineering",
        duration: "4 Years",
        feesPerYear: 140000,
        eligibility: "JEE Main (JoSAA)"
      }
    ],
    reviews: [
      {
        id: "rev-nitt-1",
        userName: "Manoj Kumar",
        rating: 4.5,
        date: "2026-03-10",
        comment: "Excellent lab facilities and research guidance. The placement record is close to 100% for CSE/ECE branches. Hostels are decent.",
        categoryRatings: {
          academics: 4.6,
          infrastructure: 4.2,
          placements: 4.8,
          campusLife: 4.3
        }
      }
    ]
  },
  {
    id: "vit-vellore",
    name: "Vellore Institute of Technology (VIT)",
    description: "VIT Vellore is one of the largest private university campuses in India. It is highly popular due to its flexible curriculum (FFCS) and massive record-breaking batch placement statistics.",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=120&h=120",
    coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200&h=450",
    featuredImage: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=600&h=400",
    location: {
      city: "Vellore",
      state: "Tamil Nadu"
    },
    established: 1984,
    type: "Private",
    rating: 4.1,
    reviewsCount: 423,
    feesRange: {
      min: 190000,
      max: 295000
    },
    ranking: {
      national: 11,
      engineering: 11
    },
    infrastructure: ["AC Hostel Blocks", "Smart Classrooms", "Indoor Stadium", "Tech Hub Lab", "Food Courts"],
    placementStats: {
      averageSalary: 9.2,
      highestSalary: 44.0,
      placementRate: 87,
      topRecruiters: ["Microsoft", "Cognizant", "TCS", "Infosys", "Intel"]
    },
    courses: [
      {
        id: "vit-cse",
        name: "B.Tech in Computer Science and Engineering",
        duration: "4 Years",
        feesPerYear: 198000,
        eligibility: "VITEEE Exam"
      },
      {
        id: "vit-ece",
        name: "B.Tech in Electronics and Communication",
        duration: "4 Years",
        feesPerYear: 198000,
        eligibility: "VITEEE Exam"
      }
    ],
    reviews: [
      {
        id: "rev-vit-1",
        userName: "Rohan Das",
        rating: 4.0,
        date: "2026-05-12",
        comment: "Excellent infrastructure and very modern campus. However, the student intake is extremely high, making the competition for placements fierce.",
        categoryRatings: {
          academics: 4,
          infrastructure: 4.5,
          placements: 3.8,
          campusLife: 4.2
        }
      }
    ]
  }
];
