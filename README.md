# ChildbookAI Landing Page

A modern, responsive landing page for ChildbookAI - an AI-powered platform for creating personalized children's books. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **Modern UI/UX**: Beautiful, accessible interface with smooth animations
- **Type-Safe**: Full TypeScript implementation with strict type checking
- **Component-Based**: Reusable, well-organized component architecture
- **Performance Optimized**: Next.js Image optimization and code splitting
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd childbookai-landingpage
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
childbookai-landingpage/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles and CSS variables
├── components/            # React components
│   ├── layout/            # Layout components (Navbar, Footer)
│   ├── sections/         # Page sections (Hero, Services, Pricing, etc.)
│   ├── shared/            # Reusable shared components
│   ├── typography/        # Typography components
│   └── ui/                # UI primitives (buttons, inputs, etc.)
├── lib/                   # Utility functions and data
│   ├── constants.ts       # Shared constants
│   ├── data/              # Data files (services, pricing, features, etc.)
│   ├── types/             # TypeScript type definitions
│   └── utils.ts           # Utility functions
├── public/                # Static assets
│   ├── background/        # Background images and SVGs
│   ├── illustrations/     # Illustration SVGs
│   └── images/            # Image assets
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Component Organization

### Layout Components
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Footer with links and social media icons

### Section Components
- **Hero**: Hero section with carousel
- **Services**: Services showcase
- **CreateABook**: Book creation interface
- **Steps**: Step-by-step process
- **Pricing**: Pricing plans (Individual & Business)
- **Features**: Feature highlights

### Shared Components
- **AppButton**: Custom button component with variants
- **CustomCard**: Reusable card component
- **BackgroundShape**: Reusable SVG background component
- **SocialIcon**: Social media icon wrapper
- **DecorativeText**: Text with decorative elements

## 📝 Data Management

All content data is extracted to dedicated data files in `lib/data/`:
- `services.ts` - Service offerings
- `pricing.ts` - Pricing plans
- `features.ts` - Feature descriptions
- `steps.ts` - Process steps
- `navigation.ts` - Navigation items
- `footer.ts` - Footer links and social media
- `settings.ts` - Book creation settings
- `kids.ts` - Kid photo options

## 🎯 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow the existing component structure
- Use Tailwind CSS for styling (avoid inline styles)
- Extract hardcoded data to `lib/data/` files
- Create reusable components for repeated patterns

### Component Guidelines
- Use functional components with TypeScript
- Export components as named exports
- Keep components focused and single-purpose
- Use proper TypeScript interfaces for props
- Add `aria-label` attributes for accessibility

### Styling Guidelines
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Use CSS variables defined in `globals.css` for colors
- Ensure touch targets are at least 44x44px
- Test on multiple screen sizes

### TypeScript Guidelines
- Define types in `lib/types/` directory
- Export types from `lib/types/index.ts`
- Use strict type checking (enabled in `tsconfig.json`)
- Avoid `any` types - use proper interfaces

### Asset Guidelines
- Optimize images before adding to `public/`
- Use SVG for icons and illustrations
- Use Next.js `Image` component for all images
- Organize assets in appropriate subdirectories
- Remove unused assets regularly

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚢 Deployment

The application can be deployed to any platform that supports Next.js:

### Vercel (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build

### Other Platforms
- Ensure Node.js 18+ is available
- Set build command: `npm run build`
- Set start command: `npm run start`
- Set output directory: `.next`

## 🛠️ Technologies Used

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Radix UI** - Accessible UI primitives
- **Iconsax React** - Icon library

## 📦 Key Dependencies

- `next` - Next.js framework
- `react` & `react-dom` - React library
- `tailwindcss` - Utility-first CSS framework
- `@radix-ui/*` - Accessible UI components
- `iconsax-react` - Icon components
- `class-variance-authority` - Component variants
- `tailwind-merge` - Tailwind class merging

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `components.json` - shadcn/ui component configuration

## 📱 Responsive Breakpoints

The project uses the following breakpoints (defined in `tailwind.config.ts`):
- `mobile`: 360px
- `sm`: 640px (small tablets)
- `tablet`/`md`: 768px (tablets)
- `lg`: 1024px (laptops)
- `laptop`: 1200px (wider laptops)
- `xl`: 1280px (large desktops)
- `desktop`: 1440px (full HD desktops)
- `2xl`: 1536px (very large screens)

## 🎨 Design System

### Colors
Colors are defined as CSS variables in `globals.css`:
- Primary: Blue shades (400, 600, 800, 1000)
- Background: White
- Foreground: Blue-1000
- Grey: Various shades for UI elements

### Typography
Typography scales are defined in `globals.css`:
- Display: Large headings
- Heading XL/LG/MD/SM: Section headings
- Body: Regular text
- Body SM: Small text

## 🤝 Contributing

1. Create a feature branch
2. Make your changes following the development guidelines
3. Test your changes thoroughly
4. Submit a pull request

## 📄 License

This project is private and proprietary.

## 📞 Support

For questions or issues, please contact the development team.

---

Built with ❤️ for ChildbookAI
