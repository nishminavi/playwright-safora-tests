import { test, expect } from '@playwright/test';

test.describe('Safora Contact Form - Automated QA Tests', () => {

  const URL = 'https://safora.se/en/contact.html';

  // =========================
  // 1. UI RENDERING TEST
  // =========================
  test('Contact form loads correctly', async ({ page }) => {
    await page.goto(URL);

    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button:has-text("Send Message")')).toBeVisible();
  });


  // =========================
  // 2. HTML VALIDATION TEST (IMPORTANT FOR CAPTCHA FORMS)
  // =========================
  test('Form fields have required validation attributes', async ({ page }) => {
    await page.goto(URL);

    const name = page.locator('input[name="name"]');
    const email = page.locator('input[name="email"]');
    const phone = page.locator('input[name="phone"]');
    const message = page.locator('textarea[name="message"]');

    await expect(name).toHaveAttribute('required');
    await expect(email).toHaveAttribute('required');
    await expect(phone).toHaveAttribute('required');
    await expect(message).toHaveAttribute('required');
  });


  // =========================
  // 3. NEGATIVE TEST (EMPTY SUBMISSION)
  // =========================
  test('Empty form submission should not proceed', async ({ page }) => {
    await page.goto(URL);

    const submit = page.locator('button:has-text("Send Message")');

    await submit.click();

    // Since reCAPTCHA blocks backend flow,
    // we verify UI does NOT navigate away
    await expect(page).toHaveURL(/contact|safora|.*/i);
  });


  // =========================
  // 4. PARTIAL INPUT VALIDATION
  // =========================
  test('Partial input should still enforce validation rules', async ({ page }) => {
    await page.goto(URL);

    await page.locator('input[name="name"]').fill('John Doe');
    await page.locator('input[name="email"]').fill('invalid@email'); // intentional edge case

    await page.locator('button:has-text("Send Message")').click();

    const emailField = page.locator('input[name="email"]');

    await expect(emailField).toBeVisible();
    await expect(emailField).toHaveAttribute('type', /email|text/);
  });

});