# Invoicing Website

A feature-rich invoicing platform that allows users to efficiently manage customers, items, quotes, invoices, and expenses. The system supports customizable invoice templates and integrates with SSLCOMMERZ for seamless payment handling.

---

## Features

- **User Management:**

  - Register as a user or as a customer's client.
  - Secure authentication.

- **Invoice Customization:**

  - Select from multiple professional invoice templates.
  - Generate and download invoices in PDF format.

- **Quotes and Payments:**

  - Send quotes and invoices directly to customers.
  - Support for SSLCOMMERZ payment integration.

- **Customer and Item Management:**

  - Create, update, and delete customers and items.

- **Expense Tracking:**

  - Record and manage expenses seamlessly.

- **Real-Time Insights:**
  - Interactive charts and analytics powered by Chart.js and React-Chartjs-2.

---

## Tech Stack

### Frontend

- **Framework:** React (v18.3.1)
- **Styling:** Tailwind CSS, DaisyUI, Flowbite
- **Libraries:**
  - State Management: React Query
  - Animation: Framer Motion
  - PDF Generation: html2pdf.js, jsPDF
  - Charts: Chart.js, React-Chartjs-2
  - Forms: React-Hook-Form
  - Notifications: React-Hot-Toast
  - Routing: React-Router-Dom

### Backend

- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** bcrypt
- **Utilities:** dotenv, cors, moment-timezone
- **File Handling:** multer, gridfs-stream

---

## Installation

### Prerequisites

- Node.js (>= v16.x)
- MongoDB
- Firebase (for frontend authentication and storage)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/invoicing-website.git
   cd invoicing-website
   ```
