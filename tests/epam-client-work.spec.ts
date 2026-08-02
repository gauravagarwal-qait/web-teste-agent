import { test, expect } from '@playwright/test';

test.describe('EPAM Services -> Client Work navigation', () => {
  test('should open Client Work page from Services menu', async ({ page }) => {
    await page.goto('https://www.epam.com/');

    const servicesMenu = page.getByRole('link', { name: /services/i }).first();
    await expect(servicesMenu).toBeVisible();
    await servicesMenu.hover();

    const exploreClientWork = page.getByRole('link', { name: /explore our client work/i });
    await expect(exploreClientWork).toBeVisible();
    await exploreClientWork.click();

    await expect(page.getByText(/client work/i)).toBeVisible();
  });
});
