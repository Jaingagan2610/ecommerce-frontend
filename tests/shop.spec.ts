import { test, expect } from '@playwright/test';

test.describe('ClickCart Storefront E2E Tests', () => {
  
  test('should load homepage and display header branding', async ({ page }) => {
    // Go to the home page
    await page.goto('/');

    // Verify title and header logo branding
    await expect(page).toHaveTitle(/ClickCart/i);
    const brandLogo = page.locator('header').getByText('CLICKCART');
    await expect(brandLogo).toBeVisible();

    // Verify products are loaded in the grid
    const productCards = page.locator('article.product-card');
    await expect(productCards.first()).toBeVisible({ timeout: 15000 });
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should allow filtering products and quick-adding to cart', async ({ page }) => {
    await page.goto('/');

    // Verify category list filter is displayed
    const filterSection = page.locator('aside').first();
    await expect(filterSection).toBeVisible();

    // Verify Navbar Cart count is empty initially
    const cartBadge = page.locator('header').locator('span').filter({ hasText: /^\d+$/ });
    await expect(cartBadge).not.toBeVisible();

    // Get the first product card and click Quick Add
    const firstCard = page.locator('article.product-card').first();
    await expect(firstCard).toBeVisible();
    
    const quickAddBtn = firstCard.locator('button').first();
    await expect(quickAddBtn).toBeVisible();
    await quickAddBtn.click();

    // Verify cart count increments to 1
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');
  });

  test('should allow visiting details page, increasing quantity, and viewing in cart', async ({ page }) => {
    await page.goto('/');

    // Navigate to the first product's details page
    const firstProductLink = page.locator('a[href^="/product/"]').first();
    await expect(firstProductLink).toBeVisible();
    await firstProductLink.click();

    // Verify we are on details page
    await expect(page).toHaveURL(/\/product\/\d+\/details/);
    
    const detailsContainer = page.locator('main.container');
    await expect(detailsContainer).toBeVisible();

    // Get the quantity minus/plus actions
    const plusBtn = page.getByTestId('quantity-increment');
    const qtyText = page.getByTestId('quantity-value');

    // Verify initial qty is 1
    await expect(qtyText).toHaveText('1');

    // Click plus to increase quantity to 2
    await plusBtn.click();
    await expect(qtyText).toHaveText('2');

    // Click Add to Cart
    const addToCartBtn = page.getByTestId('add-to-cart-btn');
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

    // Click on Cart link in the header
    const cartNav = page.locator('header').locator('a[href="/cart"]');
    await cartNav.click();

    // Verify we are on the Cart page
    await expect(page).toHaveURL('/cart');

    // Verify cart page loads with the item
    const cartItem = page.locator('article');
    await expect(cartItem.first()).toBeVisible();

    // Verify checkout section and total display
    const totalSection = page.locator('main').getByText(/Grand Total/i);
    await expect(totalSection).toBeVisible();
  });
});
