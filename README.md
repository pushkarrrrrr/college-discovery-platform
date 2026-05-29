# EduDiscover: College Discovery Platform

> A production-grade frontend internship project demonstrating modern web development practices, architectural resilience, and scalable UX design.

## 📌 Project Overview
EduDiscover is a comprehensive platform designed to help students discover, compare, and shortlist educational institutions. The project serves as a showcase of robust frontend engineering, focusing on performance, accessibility, responsive design, and scalable state management.

## 🛠 Tech Stack
- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand, URL Query Parameters
- **Authentication:** NextAuth.js (v4)
- **UI Components:** custom `shadcn/ui` adaptation utilizing `@base-ui/react`, `lucide-react`, and `vaul`
- **Tooling:** TypeScript, ESLint, Turbopack

## 🏗 Architecture Decisions
- **App Router Integration:** Leveraging Next.js App Router for optimal routing, layouts, and server/client component boundaries to reduce hydration payloads.
- **Client-Side State via Zustand:** Centralized client-side state for the comparison tool (`useCompareStore`) and authentication/shortlist synchronization (`useAuthStore`).
- **URL-Based State Sync:** Complex filter states (search, location, fee ranges, ratings) are synchronized bidirectionally with URL search parameters. This ensures shareable URLs, accurate browser history (back/forward), and persistent filters upon refresh.
- **Resilient UI/UX:** Implementation of comprehensive error boundaries, localized fallback UI components (`ErrorState`), and loading skeletons to guarantee the UI never crashes unexpectedly and always provides clear feedback during network failures or data loading delays.

## 📂 Folder Structure
```text
src/
├── app/
│   ├── api/auth/       # NextAuth.js API routes
│   ├── colleges/       # College directory and detailed profiles
│   ├── compare/        # Multi-college comparison tool
│   ├── login/          # Authentication views
│   └── saved/          # Protected user shortlists dashboard
├── components/
│   ├── college/        # Domain-specific UI (cards, detail sections)
│   ├── compare/        # Comparison tabular components
│   ├── filters/        # Stateful search and filter components
│   ├── layout/         # Application shell (Navbar, Footer, shell providers)
│   └── ui/             # Reusable design system components (buttons, badges)
├── lib/                # Utility functions and shared helpers
├── services/           # Data fetching logic and mock API integrations
├── store/              # Zustand global state slices
└── types/              # TypeScript type definitions and interfaces
```

## ✨ Implemented Features
- **Discovery Catalog:** Search, filter, and browse a list of colleges with dynamic pagination.
- **Advanced Filtering:** Multi-dimensional filtering by affiliation type, geographical location, fee ranges (sliders), and minimum student ratings.
- **Detailed Profiles:** In-depth views into college infrastructure, course offerings, placement statistics, and reviews.
- **Comparison Engine:** A robust tabular interface to compare up to 3 colleges side-by-side highlighting the best metrics across fees, placements, and rankings.
- **User Shortlists:** Protected routes for saving and managing bookmarked colleges via simulated authentication.

## 🚀 Frontend Engineering Highlights

### State Management Strategy
The application employs a hybrid state management approach:
1. **URL as the Source of Truth:** Filters and search queries are bound to the URL (`?location=Delhi&sort=fees`), avoiding messy `useEffect` synchronization chains and duplicated state.
2. **Zustand for Transient Global State:** Used for cross-component interactions that do not belong in the URL, such as queuing colleges for comparison or caching a user's saved shortlist across page navigations.

### Responsive Design Strategy
- **Mobile-First Approach:** Utilizing Tailwind CSS to scale typography and spacing fluidly across viewports.
- **Complex Data Layouts:** The comparison table employs horizontal overflow wrappers and sticky headers to remain touch-friendly and readable on small screens without breaking the layout structure.
- **Adaptive Components:** Menus and filters dynamically swap between inline sidebars on desktop and accessible bottom-sheet drawers (`vaul`) on mobile devices.

### Performance Considerations
- **Optimized Rendering:** Minimized unnecessary re-renders by pushing state down the component tree where possible and leveraging React 19 features.
- **Asset Optimization:** Next/Image is utilized for automatic format conversion and lazy loading of college logos.
- **Lazy Hydration:** Non-critical UI segments are progressively loaded, and static compilation guarantees fast LCP (Largest Contentful Paint) metrics.

### Accessibility Improvements (WCAG AA)
The application adheres strictly to WAI-ARIA guidelines:
- **Keyboard Navigation:** Custom `:focus-visible` states globally ensure reliable keyboard traversal. Included a "Skip to Main Content" mechanism.
- **Semantic HTML:** Correct usage of landmarks (`<main>`, `<nav>`), table structures (`scope="col"`, `scope="row"`), and accessible lists (`<ul>`/`<li>`).
- **Screen Reader Support:** Extensive use of `aria-label`, `aria-hidden` (to mute decorative icons), and distinct `role` definitions (e.g., `role="alert"` for error states, `role="tablist"` for navigation).

## 📸 Screenshots
*(Add high-quality screenshots of the College Listing, Comparison View, and Mobile Drawer here)*
- `[Screenshot 1: College Listing & Filters]`
- `[Screenshot 2: Comparison Tool]`
- `[Screenshot 3: Mobile Responsive Layout]`

## ⚙️ Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd intern
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 🔮 Future Improvements
- **Real Backend Integration:** Swap the mock API services with a production PostgreSQL/Redis backend using tRPC or React Server Actions.
- **Advanced Authentication:** Implement full OAuth2 providers (Google, GitHub) via NextAuth.js and persist user shortlists to a database.
- **Map View Integration:** Add an interactive map view utilizing Mapbox GL or Google Maps to visualize college locations dynamically.

## 🔗 Deployment
*Live Demo:* [https://intern-dusky-pi.vercel.app](https://intern-dusky-pi.vercel.app)
