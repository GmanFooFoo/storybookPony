# Storybook Pony 

**Automating Design System Documentation from Code**

## Overview

Storybook Pony is a tool that automatically generates and manages design system documentation by analyzing codebases. This helps development teams maintain visual consistency across projects and improve collaboration between designers and developers.

## Mission

To empower development teams with a tool that effortlessly extracts design system information from their code, enabling them to create, maintain, and enforce a consistent visual language across their applications.

## Minimum Viable Product (MVP)

### Scope

* **Supported Languages/Frameworks:**
    * JavaScript with React
* **Core Features:**
    * **Repository Access:**
        * Connect to GitHub repositories (API keys or OAuth).
        * Analyze a single branch (`main` or `master`).
    * **Code Analysis:**
        * Extract from `.js`, `.jsx`, and `.css` files:
            * Colors (hex, RGB, named)
            * Typography (font families, sizes, weights)
        * Identify basic React components (buttons, inputs, divs with specific classes).
    * **Data Storage:**
        * Use SQLite to store design tokens and component information.
    * **Design System Definition:**
        * Web interface for users to:
            * Manually define a standard design system.
            * Upload a JSON representation of their design system.
    * **Comparison and Reporting:**
        * Compare extracted data with the defined standard.
        * Generate reports highlighting:
            * Color palette comparisons (visual).
            * Typography differences.
            * Component usage inconsistencies.

### Exclusions from MVP

* Support for other languages/frameworks.
* Advanced code analysis (complex component properties, icon usage).
* Automated suggestions and code generation.
* Integration with design tools or CI/CD pipelines.

### Success Criteria

* Successful connection to GitHub and extraction of design system information from React projects.
* Easy definition of a standard design system by users.
* Accurate identification of inconsistencies between codebases and the standard.
* Clear, informative, and actionable reports.

### Benefits

* Foundational tool for automating design system documentation.
* Demonstrates core value to potential users.
* Enables early feedback and iteration.
* Reduced initial development time and complexity.

## Technology Stack

* **Frontend:** TypeScript, React, Tailwind CSS
* **Backend:**  Node.js (potentially with a framework like Express.js)
* **Database:** Supabase (PostgreSQL)
* **IDE:** Cursor IDE

## Future Enhancements

* **Expanded Language/Framework Support:**  TypeScript, Vue.js, Angular, etc.
* **Advanced Code Analysis:**  Extract more complex component properties, identify icon usage, and analyze styling patterns.
* **Automated Suggestions:**  Provide concrete code change suggestions to align with the design system.
* **Code Generation:** Generate code snippets to help developers implement design system changes.
* **Design Tool Integration:**  Connect with Figma, Sketch, or Adobe XD to import design systems.
* **CI/CD Integration:**  Incorporate Storybook Pony into CI/CD pipelines to automatically check for design system compliance.
* **Visualization:**  Create visual representations of the design system (color palettes, component libraries).
* **Collaboration:**  Allow team members to comment, discuss, and approve proposed changes.
* **Reporting and Analytics:**  Track design system adoption and consistency over time.

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License

[Choose a license (e.g., MIT License)](LICENSE)
