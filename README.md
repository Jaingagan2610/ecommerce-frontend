# ClickCart Storefront

ClickCart is a modern, responsive, and accessible e-commerce web application built with React, TypeScript, Vite, and MobX. The user interface utilizes a fluid and clean layout inspired by modern design patterns, complete with dynamic category filtering, price sorting, real-time cart status counters, and fluid page transitions.

## Features

- **Responsive Grid Layout**: Multi-column product grid adapting dynamically to mobile, tablet, and desktop screens using native CSS Grid.
- **Dynamic Category Filtering**: Interactive sidebar filter featuring category-specific thumbnails.
- **Sorting Options**: Fast client-side sorting by price (high-to-low / low-to-high).
- **Interactive Shopping Cart**: Simple MobX-backed state management for adding items, adjusting quantities directly in the checkout view, removing products, and monitoring live total costs.
- **Product Details Page**: Dedicated details layout including responsive gallery selection thumbnails, full descriptions, and custom quantity counters.
- **Toast Notifications**: Interactive toast alerts displaying additions, removals, or quantity changes.
- **Accessibility Integration**: Built using semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) to ensure compliance with accessibility requirements.

## Project Structure

```
├── .github/              # CI configurations (if any)
├── src/
│   ├── api/              # API clients (axios methods to Platzi API)
│   ├── components/       # Reusable components (Navbar, Footer, ProductGrid, Filter widgets)
│   ├── context/          # React contexts for MobX stores
│   ├── interfaces/       # TypeScript type definitions (Product, Category, CartItem)
│   ├── pages/            # Page layouts (Home, ProductDetail, Cart)
│   ├── routes/           # Routing configuration
│   ├── store/            # MobX state stores (CartStore)
│   ├── App.tsx           # Entry router layout wrapping navbar & notifications
│   ├── index.css         # Typography, global CSS variables & interactive styling
│   └── main.tsx          # Application bootstrapper
├── tests/                # Playwright E2E tests
├── playwright.config.ts  # Playwright configuration
├── package.json          # Node scripts and dependencies
└── README.md             # Project documentation
```

## Setup Instructions

Ensure you have Node.js and `pnpm` installed.

1. **Clone the repository and navigate into the root directory**:
   ```bash
   cd ecommerce-frontend
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the local development server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

4. **Build the production bundle**:
   ```bash
   pnpm build
   ```

## Running E2E Tests

End-to-End testing is powered by **Playwright**.

1. **Install browser binaries** (run this once after installing packages):
   ```bash
   pnpm playwright install chromium
   ```

2. **Run E2E tests in headless mode**:
   ```bash
   pnpm test:e2e
   ```

3. **Run E2E tests in interactive UI mode**:
   ```bash
   pnpm test:e2e:ui
   ```

## Assumptions & Design Decisions

- **API Endpoint**: Products and categories are fetched from the public Platzi Fake Store API (`https://api.escuelajs.co/api/v1`).
- **Styling Method**: Built entirely using clean, modern Vanilla CSS and CSS variables to maximize control, performance, and cross-browser support without the overhead of external CSS frameworks.
- **State Management**: MobX is used as the global state store for the Cart, with React Context used to inject the store instances into the React tree.
- **Testing Approach**: Selected Playwright for its quick browser execution and integrated test web server. E2E tests are designed to execute clean user journeys: verifying category filters, grid clicks, detailed pages, cart actions, and grand totals.
