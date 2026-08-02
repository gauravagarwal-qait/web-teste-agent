import { test, expect } from '@playwright/test';

test('EPAM client work navigation', async ({ page }) => {
  await test.step('Open EPAM homepage', async () => {
    await page.goto('https://www.epam.com', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/epam\.com/);
  });

  await test.step('Open Services menu', async () => {
    const servicesTriggers = [
      page.getByRole('link', { name: /services/i }),
      page.getByRole('button', { name: /services/i }),
      page.locator('a[href*="services"]').first(),
    ];

    for (const trigger of servicesTriggers) {
      if (await trigger.count().catch(() => 0)) {
        await trigger.first().click({ force: true });
        break;
      }
    }
  });

  await test.step('Open Explore Our Client Work', async () => {
    const clientWorkLinks = [
      page.getByRole('link', { name: /explore our client work/i }),
      page.getByRole('menuitem', { name: /explore our client work/i }),
      page.locator('a:has-text("Explore Our Client Work")'),
    ];

    for (const link of clientWorkLinks) {
      if (await link.count().catch(() => 0)) {
        await link.first().click({ force: true });
        break;
      }
    }
  });

  await test.step('Verify Client Work content is visible', async () => {
    await expect(page).toHaveURL(/client-work|work/i);
    await expect(page.getByText(/client work/i)).toBeVisible();
  });
});
