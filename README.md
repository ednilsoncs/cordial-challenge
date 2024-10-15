# Project Overview

This project is built using modern web development technologies, aiming to deliver a well-structured, modular, and maintainable codebase. Below is an outline of the technologies used, the project structure, and key components.

---

## Technologies Used:

- **TypeScript**: Provides static typing to JavaScript, improving code quality and reducing runtime errors.
- **Vite**: A fast build tool optimized for speed and modern frameworks.
- **Sass Modules**: Enables modular, scoped CSS to avoid conflicts and keep styles maintainable.
- **JavaScript**: Core functionality of the application.
- **Storybook**: Used for developing UI components in isolation, making it easier to test and document.
- **React Testing Library**: Enables testing of React components with a focus on user behavior.
- **ESLint and Prettier**: Ensure code consistency and enforce best practices.
- **Dayjs**: Used for date manipulation and formatting.

---

## Project Structure:

### Components
Components are built with a "compose" strategy for better reuse and scalability.

- **Button**: A customizable button component.
- **Checkbox**: A toggle switch for selecting options.
- **Dropdown**: A customizable dropdown made from 0 using only react and scss
- **Icons**: A set of reusable SVG-based icons.
- **Input**: Text and number input fields with various states.
- **Label**: Labels for form elements with accessible attributes.
- **Table**:  flexible table component that allows you to customize and build your table exactly the way you need.

### Hooks
Custom hooks for managing logic outside of components.

- **useTable**: Handles table-related data, search, sorting, filtering, and pagination logic.

### Pages
Prebuilt pages for example usage and testing.

- **examplePage**: Demonstrates usage of components and hooks together.

### Services

- **ApiService**: A service that mocks data for testing and development purposes.

### Styles

- **Global Styling**: Contains the global styles and theme setup for the application.

### Utilities

- **rowHasData**: A utility helper function to determine if a specific row contains data.
- **dayjs**: A wrapper around the dayjs library, used location and add plugin.

---

This project is designed with scalability and testability in mind, allowing for easy maintenance and feature expansion.
