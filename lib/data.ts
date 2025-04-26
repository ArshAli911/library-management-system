// Mock data for the CCET library management system with expanded categories and more books

// Helper function to generate random books
function generateBooks(count, categoryType, startId = 0) {
  const categories = {
    academic: [
      "mathematics",
      "physics",
      "chemistry",
      "computer science",
      "electrical engineering",
      "mechanical engineering",
      "civil engineering",
      "electronics",
      "biotechnology",
      "environmental science",
    ],
    newspapers: ["daily", "weekly", "financial", "technical", "educational"],
    novels: [
      "fiction",
      "science fiction",
      "fantasy",
      "mystery",
      "thriller",
      "romance",
      "historical fiction",
      "biography",
      "self-help",
    ],
    papers: ["mid-term", "end-term", "entrance exams", "competitive exams", "research papers"],
  }

  const authors = {
    academic: [
      "B.S. Grewal",
      "R.K. Gaur",
      "H.C. Verma",
      "Thomas H. Cormen",
      "R.K. Bansal",
      "James W. Nilsson",
      "Frank M. White",
      "M. Morris Mano",
      "Michael Sipser",
      "Yunus A. Cengel",
      "Norman S. Nise",
      "R.C. Hibbeler",
      "Adel S. Sedra",
      "Andrew S. Tanenbaum",
      "Alan V. Oppenheim",
      "Abraham Silberschatz",
      "P.C. Jain",
      "C. Venkatramaiah",
      "Stuart Russell",
    ],
    newspapers: [
      "The Times of India",
      "The Hindu",
      "Economic Times",
      "The Indian Express",
      "Hindustan Times",
      "The Tribune",
      "Dainik Bhaskar",
      "Amar Ujala",
      "The Telegraph",
      "Deccan Herald",
      "Business Standard",
      "Mint",
    ],
    novels: [
      "Chetan Bhagat",
      "Amish Tripathi",
      "Arundhati Roy",
      "Vikram Seth",
      "Jhumpa Lahiri",
      "Ruskin Bond",
      "Khushwant Singh",
      "Rabindranath Tagore",
      "R.K. Narayan",
      "Salman Rushdie",
      "Anita Desai",
      "Kiran Desai",
      "Amitav Ghosh",
      "Shashi Tharoor",
      "Sudha Murty",
      "Devdutt Pattanaik",
    ],
    papers: [
      "CCET Faculty",
      "AICTE",
      "UGC",
      "CBSE",
      "GATE Committee",
      "JEE Committee",
      "IIT Delhi",
      "IIT Bombay",
      "IIT Kanpur",
      "PEC University",
      "Punjab University",
      "Delhi University",
    ],
  }

  const years = Array.from({ length: 30 }, (_, i) => 2023 - i)

  const books = []

  for (let i = 0; i < count; i++) {
    const id = `book-${startId + i + 1}`
    const category = categories[categoryType][Math.floor(Math.random() * categories[categoryType].length)]
    const author = authors[categoryType][Math.floor(Math.random() * authors[categoryType].length)]
    const publishYear = years[Math.floor(Math.random() * years.length)]
    const pages = Math.floor(Math.random() * 500) + 100
    const available = Math.random() > 0.3 // 70% chance of being available

    let title, description, type, location

    if (categoryType === "academic") {
      const subjects = [
        "Introduction to",
        "Advanced",
        "Fundamentals of",
        "Principles of",
        "Modern",
        "Applied",
        "Theoretical",
        "Practical",
        "Comprehensive Guide to",
        "Handbook of",
        "Concepts in",
        "Studies in",
        "Essentials of",
      ]

      const topics = [
        "Calculus",
        "Algebra",
        "Mechanics",
        "Thermodynamics",
        "Algorithms",
        "Data Structures",
        "Circuit Analysis",
        "Fluid Dynamics",
        "Digital Logic",
        "Control Systems",
        "Structural Analysis",
        "Database Systems",
        "Operating Systems",
        "Artificial Intelligence",
        "Machine Learning",
        "Quantum Physics",
        "Organic Chemistry",
        "Microprocessors",
        "Networking",
      ]

      title = `${subjects[Math.floor(Math.random() * subjects.length)]} ${topics[Math.floor(Math.random() * topics.length)]}`
      description = `This comprehensive textbook covers the fundamental concepts of ${category} with a focus on ${topics[Math.floor(Math.random() * topics.length)].toLowerCase()}. Ideal for undergraduate engineering students.`
      type = Math.random() > 0.4 ? "hardcopy" : "ebook"
      location =
        type === "hardcopy"
          ? `${category.charAt(0).toUpperCase() + category.slice(1)} Section, Shelf ${String.fromCharCode(65 + Math.floor(Math.random() * 8))}${Math.floor(Math.random() * 5) + 1}`
          : "Digital Library"
    } else if (categoryType === "newspapers") {
      const newspaperNames = [
        "The Engineering Times",
        "Tech Chronicle",
        "Science Daily",
        "Innovation Today",
        "Campus Herald",
        "CCET Gazette",
        "Engineering Insights",
        "Research Weekly",
        "Academic Observer",
        "The Student Express",
        "Industry Connect",
        "Future Engineers",
      ]

      title = newspaperNames[Math.floor(Math.random() * newspaperNames.length)]
      const date = new Date(publishYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      const formattedDate = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      description = `${title} issue dated ${formattedDate}. Covers latest news in engineering, technology, campus events, and industry developments.`
      type = Math.random() > 0.7 ? "hardcopy" : "ebook"
      location = type === "hardcopy" ? "Newspaper Section, Current Periodicals" : "Digital Library"
    } else if (categoryType === "novels") {
      const novelTitles = [
        "The Last Equation",
        "Midnight in the Lab",
        "The Quantum Paradox",
        "Bridge of Innovation",
        "The Algorithm",
        "Silicon Dreams",
        "The Engineer's Daughter",
        "Beyond the Stars",
        "The Code Breaker",
        "Echoes of Invention",
        "The Patent",
        "Circuits of the Heart",
        "The Architect's Vision",
        "Digital Horizons",
        "The Last Theorem",
      ]

      title = novelTitles[Math.floor(Math.random() * novelTitles.length)]
      description = `A captivating ${category} novel that takes readers on a journey through the world of innovation, discovery, and human connection.`
      type = Math.random() > 0.5 ? "hardcopy" : "ebook"
      location = type === "hardcopy" ? "Fiction Section, Leisure Reading Area" : "Digital Library"
    } else if (categoryType === "papers") {
      const examTypes = [
        "Mid-Term Examination",
        "End Semester Examination",
        "Supplementary Examination",
        "Entrance Test",
        "Competitive Examination",
        "Placement Test",
        "Aptitude Test",
        "Technical Assessment",
        "Practical Examination",
      ]

      const subjects = [
        "Engineering Mathematics",
        "Applied Physics",
        "Computer Programming",
        "Data Structures",
        "Digital Electronics",
        "Microprocessors",
        "Control Systems",
        "Fluid Mechanics",
        "Thermodynamics",
        "Structural Analysis",
        "Machine Design",
        "Power Systems",
      ]

      title = `${examTypes[Math.floor(Math.random() * examTypes.length)]} - ${subjects[Math.floor(Math.random() * subjects.length)]} (${publishYear})`
      description = `Previous year question paper for ${subjects[Math.floor(Math.random() * subjects.length)]} from the ${publishYear} examination. Includes complete solutions and marking scheme.`
      type = Math.random() > 0.2 ? "ebook" : "hardcopy"
      location = type === "hardcopy" ? "Question Papers Archive, Reference Section" : "Digital Library"
    }

    books.push({
      id,
      title,
      author,
      isbn: `978${Math.floor(Math.random() * 10000000000)}`,
      category,
      publishYear,
      pages,
      description,
      available,
      type,
      location,
      dateAdded: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      popularity: Math.floor(Math.random() * 100) + 1, // 1-100 popularity score
    })
  }

  return books
}

// Generate books for different categories
const academicBooks = generateBooks(40, "academic")
const newspapers = generateBooks(15, "newspapers", 40)
const novels = generateBooks(25, "novels", 55)
const papers = generateBooks(20, "papers", 80)

// Books data - combine all categories
export const books = [...academicBooks, ...newspapers, ...novels, ...papers]

// Get recently added books (last 30 days)
const thirtyDaysAgo = new Date()
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

export const recentlyAddedBooks = books
  .filter((book) => new Date(book.dateAdded) > thirtyDaysAgo)
  .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
  .slice(0, 8)

// Get most popular books
export const popularBooks = [...books].sort((a, b) => b.popularity - a.popularity).slice(0, 8)

// Users data
export const users = [
  {
    id: "user-1",
    name: "Rahul Sharma",
    email: "rahul.sharma@ccet.ac.in",
    role: "student",
    department: "Computer Science",
    rollNumber: "CS2023001",
  },
  {
    id: "user-2",
    name: "Priya Patel",
    email: "priya.patel@ccet.ac.in",
    role: "student",
    department: "Electrical Engineering",
    rollNumber: "EE2023015",
  },
  {
    id: "user-3",
    name: "Dr. Amit Kumar",
    email: "amit.kumar@ccet.ac.in",
    role: "admin",
    department: "Library",
    staffId: "LIB001",
  },
  {
    id: "user-4",
    name: "Vikram Singh",
    email: "vikram.singh@ccet.ac.in",
    role: "student",
    department: "Mechanical Engineering",
    rollNumber: "ME2023022",
  },
  {
    id: "user-5",
    name: "Neha Gupta",
    email: "neha.gupta@ccet.ac.in",
    role: "student",
    department: "Civil Engineering",
    rollNumber: "CE2023008",
  },
]

// Loans data
export const loans = [
  {
    id: "loan-1",
    bookId: "book-2",
    userId: "user-1",
    borrowDate: "2023-04-01T00:00:00.000Z",
    dueDate: "2023-04-15T00:00:00.000Z",
    returned: false,
    returnDate: null,
    isOverdue: true,
    fine: 75, // Rs. 10 per day for 7.5 days
    daysOverdue: 7,
  },
  {
    id: "loan-2",
    bookId: "book-6",
    userId: "user-2",
    borrowDate: "2023-04-05T00:00:00.000Z",
    dueDate: "2023-04-19T00:00:00.000Z",
    returned: false,
    returnDate: null,
    isOverdue: false,
    fine: 0,
    daysOverdue: 0,
  },
  {
    id: "loan-3",
    bookId: "book-3",
    userId: "user-1",
    borrowDate: "2023-03-15T00:00:00.000Z",
    dueDate: "2023-03-29T00:00:00.000Z",
    returned: true,
    returnDate: "2023-03-28T00:00:00.000Z",
    isOverdue: false,
    fine: 0,
    daysOverdue: 0,
  },
  {
    id: "loan-4",
    bookId: "book-12",
    userId: "user-4",
    borrowDate: "2023-04-02T00:00:00.000Z",
    dueDate: "2023-04-16T00:00:00.000Z",
    returned: false,
    returnDate: null,
    isOverdue: true,
    fine: 30, // Rs. 10 per day for 3 days
    daysOverdue: 3,
  },
  {
    id: "loan-5",
    bookId: "book-9",
    userId: "user-5",
    borrowDate: "2023-04-10T00:00:00.000Z",
    dueDate: "2023-04-24T00:00:00.000Z",
    returned: false,
    returnDate: null,
    isOverdue: false,
    fine: 0,
    daysOverdue: 0,
  },
]

// Featured books (subset of books)
export const featuredBooks = [
  books[0], // Engineering Mathematics
  books[2], // Data Structures and Algorithms
  books[4], // Electric Circuits
  books[19], // Artificial Intelligence
]

// Announcements
export const announcements = [
  {
    title: "Extended Library Hours During Exams",
    content:
      "The library will be open 24/7 during the final examination period (May 1-15) to accommodate student study needs. Additional study rooms will be available on a first-come, first-served basis.",
    date: "April 15, 2023",
    type: "important",
  },
  {
    title: "New Engineering Databases Available",
    content:
      "We've added three new research databases to our digital collection: IEEE Xplore, ASME Digital Collection, and ACM Digital Library. Access them through your student portal.",
    date: "April 10, 2023",
    type: "announcement",
  },
  {
    title: "Technical Book Fair",
    content:
      "The annual Technical Book Fair will be held from April 20-22 in the Main Auditorium. Publishers from across India will showcase the latest engineering and technical books with special discounts for CCET students.",
    date: "April 5, 2023",
    type: "event",
  },
  {
    title: "Library System Maintenance",
    content:
      "The library catalog and online services will be unavailable on Saturday, April 22, from 2:00 AM to 6:00 AM due to scheduled system maintenance.",
    date: "April 1, 2023",
    type: "important",
  },
]

// Get unique categories, authors, and years for filters
export const uniqueCategories = [...new Set(books.map((book) => book.category))].sort()
export const uniqueAuthors = [...new Set(books.map((book) => book.author))].sort()
export const uniqueYears = [...new Set(books.map((book) => book.publishYear))].sort((a, b) => b - a)

// Group books by category type
export const booksByType = {
  academic: books.filter((book) => academicBooks.some((b) => b.id === book.id)),
  newspapers: books.filter((book) => newspapers.some((b) => b.id === book.id)),
  novels: books.filter((book) => novels.some((b) => b.id === book.id)),
  papers: books.filter((book) => papers.some((b) => b.id === book.id)),
}
