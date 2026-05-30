# Safora Contact Form Automation (Playwright)

## 📌 Project Overview
This project automates testing of the Safora Contact Us form using Playwright.  
It verifies form behavior, field validation, and UI elements.

---

## 🧪 Test Coverage

The automation includes the following test scenarios:

- Contact form UI loading
- Field presence validation
- Required attribute checks
- Empty form submission behavior
- Partial input validation

---

## ⚠️ Important Limitation

The contact form is protected by Google reCAPTCHA.  
Due to this, full end-to-end form submission automation is not possible.

Therefore, tests focus on:
- UI validation
- HTML validation attributes
- Negative test scenarios

---

## 🛠️ Tech Stack

- Playwright
- JavaScript
- Node.js

---

## ▶️ How to Run the Tests

1. Install dependencies:
```bash
npm install
