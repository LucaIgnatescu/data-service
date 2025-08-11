# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Project Architecture

This is a Next.js 15 application using the App Router architecture with the following structure:

- **App Directory Structure**: Uses Next.js App Router (`app/` directory)
  - `app/layout.tsx` - Root layout with Geist font configuration
  - `app/page.tsx` - Home page component
  - `app/globals.css` - Global styles with Tailwind CSS v4 and custom CSS variables

- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
  - Light/dark mode support via CSS variables and `prefers-color-scheme`
  - Custom color variables: `--background`, `--foreground`
  - Geist font family (sans and mono) loaded via `next/font/google`

- **TypeScript Configuration**: 
  - Strict mode enabled
  - Path alias `@/*` maps to root directory
  - Next.js plugin for enhanced TypeScript support

- **ESLint Configuration**: Uses Next.js core web vitals and TypeScript rules via flat config

## Key Dependencies

- React 19.1.0 and Next.js 15.4.4
- TypeScript with strict configuration
- Tailwind CSS v4 for styling
- ESLint with Next.js configuration
- Radix UI - Use `import { Select } from "radix-ui";` syntax (not the older `@radix-ui/react-select` imports)

## Development Guidelines

- Always make sure your memory is updated with the latest documentation before starting to code. Google it if not. Adhere to this rule strictly.
- When I ask for ideas, do not give me a complete technical overview. Just high level feature discussion. I am interested in functionality, not implementation, unless otherwise specified.

## Git Guidelines

- Write short git commit messages. Do not add the written with claude stuff. Make them as brief as possible.


## Features

- Define custom tabular schemas. 
- Use natural language to define these schemas.
- Ingest data: record by record or as csv.
- Run notebooks to analyze the data.
- Use natural language to write them.
- Present results in a user friendly way. 
- Use double quotes for strings