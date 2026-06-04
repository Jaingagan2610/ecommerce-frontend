import { test, expect } from '@playwright/test';

test.describe('ClickCart Storefront E2E Tests', () => {
  
  test('should load homepage and display header branding', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/ClickCart/i);
    const brandLogo = page.locator('header').getByText('CLICKCART');
    await expect(brandLogo).toBeVisible();

    const productCards = page.locator('article.product-card');
    await expect(productCards.first()).toBeVisible({ timeout: 15000 });
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should allow filtering products and quick-adding to cart', async ({ page }) => {
    await page.goto('/');

    const filterSection = page.locator('aside').first();
    await expect(filterSection).toBeVisible();

    const cartBadge = page.locator('header').locator('span').filter({ hasText: /^\d+$/ });
    await expect(cartBadge).not.toBeVisible();

    const firstCard = page.locator('article.product-card').first();
    await expect(firstCard).toBeVisible();
    
    const quickAddBtn = firstCard.locator('button').first();
    await expect(quickAddBtn).toBeVisible();
    await quickAddBtn.click();

    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');
  });

  test('should allow visiting details page, increasing quantity, and viewing in cart', async ({ page }) => {
    await page.goto('/');

    const firstProductLink = page.locator('a[href^="/product/"]').first();
    await expect(firstProductLink).toBeVisible();
    await firstProductLink.click();

    await expect(page).toHaveURL(/\/product\/\d+$/);
    
    const detailsContainer = page.locator('main.container');
    await expect(detailsContainer).toBeVisible();

    const plusBtn = page.getByTestId('quantity-increment');
    const qtyText = page.getByTestId('quantity-value');

    await expect(qtyText).toHaveText('1');

    await plusBtn.click();
    await expect(qtyText).toHaveText('2');

    const addToCartBtn = page.getByTestId('add-to-cart-btn');
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

    const cartNav = page.locator('header').locator('a[href="/cart"]');
    await cartNav.click();

    await expect(page).toHaveURL('/cart');

    const cartItem = page.locator('article');
    await expect(cartItem.first()).toBeVisible();

    const totalSection = page.locator('main').getByText(/Grand Total/i);
    await expect(totalSection).toBeVisible();
  });
});
