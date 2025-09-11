# Overview

StudyZen is a productivity platform designed for exam-year students, offering science-backed tools to reduce stress and improve focus. The application provides a comprehensive suite of features including Pomodoro timers, breathing exercises, noise generation, and study playlists. Built as a full-stack web application, it combines a React frontend with an Express.js backend and PostgreSQL database integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using **React 18** with TypeScript in a modern single-page application (SPA) architecture. Key design decisions include:

- **UI Framework**: Utilizes shadcn/ui components built on Radix UI primitives for consistent, accessible interface elements
- **Styling**: TailwindCSS for utility-first styling with custom CSS variables for theming support
- **State Management**: React hooks for local state with TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

The application follows a component-based architecture with reusable UI components, custom hooks for business logic, and a clean separation of concerns between presentation and data layers.

## Backend Architecture
The backend implements a **REST API** using Express.js with the following architectural patterns:

- **Modular Structure**: Separation between routes, storage layer, and server setup
- **Storage Abstraction**: Interface-based storage layer (IStorage) with current in-memory implementation, designed to be easily replaceable with database persistence
- **Middleware Pipeline**: Express middleware for JSON parsing, request logging, and error handling
- **Development Integration**: Vite integration for seamless full-stack development experience

## Data Storage Solutions
The application uses a **dual-storage approach**:

- **Development**: In-memory storage (MemStorage class) for rapid development and testing
- **Production Ready**: Drizzle ORM configured for PostgreSQL with Neon Database serverless driver
- **Schema Management**: Type-safe database schema definitions with Zod validation
- **Migration Support**: Drizzle Kit for database migrations and schema management

The database schema includes tables for users, user settings, and study sessions with proper relationships and constraints.

## Authentication and Authorization
Currently implements a **basic user system** with:
- User registration and authentication capabilities in the schema
- Session management structure for tracking user study sessions
- Designed for future enhancement with proper authentication middleware

## Component Design Patterns
The frontend follows several key patterns:
- **Composition Pattern**: Components accept children and use render props for flexibility
- **Hook-based Logic**: Custom hooks (useTimer, useAudio, useTheme) encapsulate complex stateful logic
- **Theme System**: Centralized theme management with CSS custom properties and TypeScript type safety
- **Responsive Design**: Mobile-first approach with breakpoint-aware components

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL provider for production database hosting
- **Drizzle ORM**: Type-safe database toolkit for schema management and queries

## UI and Styling
- **Radix UI**: Headless component library providing accessible primitives
- **shadcn/ui**: Pre-built component system built on Radix UI
- **TailwindCSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Build tool and development server with React plugin
- **TypeScript**: Static type checking and enhanced developer experience
- **TanStack Query**: Server state management and caching library

## Audio Processing
- **Web Audio API**: Native browser API for audio generation and processing (brown/white noise)

## Fonts and Assets
- **Google Fonts**: Inter font family for typography
- **Unsplash**: External image service for background images and playlist artwork

## Build and Deployment
- **esbuild**: Fast JavaScript bundler for server-side code
- **PostCSS**: CSS processing with Autoprefixer for vendor prefixes
- **ESM Modules**: Modern JavaScript module system throughout the application

The architecture prioritizes developer experience, type safety, and scalability while maintaining a clean separation between frontend and backend concerns.