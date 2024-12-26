import { test, expect } from '@playwright/test';

test.describe('Blog app', () => {
test.beforeEach(async ({ page, request }) => {
    try {
    const response = await request.post('http://localhost:3003/api/testing/reset');
    const responseBody = await response
        .text()
        .catch(() => 'No response body');
    const statusCode = response.status();
    console.log('Reset DB Response:', {
        status: statusCode,
        ok: response.ok(),
        body: responseBody,
    });

    if (!response.ok()) {
        throw new Error(
          `Failed to reset test DB. Status: ${statusCode}, Body: ${responseBody}`
        );
      }

    const userResponse = await request.post('http://localhost:3003/api/users/', {
    data: { username: 'testuser', password: 'Password123' },
    });
      if (!userResponse.ok()) {
        const userResponseBody = await userResponse
          .text()
          .catch(() => 'No response body');
        throw new Error(
          `Failed to create test user. Status: ${userResponse.status()}, Body: ${userResponseBody}`
        );
      }

      await page.goto('/');
      await page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('Backend setup failed:', error);
      throw error;
    }
  });

  test('Login form is show ', async ({ page }) => {
    const LoginForm = await page.locator('form');
    await expect(LoginForm).toBeVisible();
  });

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
    await page.waitForSelector('input[name="username"]');
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'Password123');
      await page.click('button[type="submit"]');

      await expect(page.locator('text=Welcome, Kevin')).toBeVisible({
        timeout: 10000,
      });
    });

    test('fails with incorrect credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'WrongPassword');
      await page.click('button[type="submit"]');

      const ErrorNotification = await page.getByRole('alert');
      await expect(ErrorNotification).toBeVisible();
      await expect(ErrorNotification).toContainText('Invalid credentials');
    });
  });

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.fill('input[name="username"]', 'testuser');
      await page.fill('input[name="password"]', 'Password123');
      await page.click('button[type="submit"]');
    });

    test('a new blog can be created', async ({ page }) => {
      await page.click('button:has-text("New Blog")'); // Adjust selector.
      await page.fill('input[name="title"]', 'Test Blog');
      await page.fill('input[name="author"]', 'Author Name');
      await page.fill('input[name="url"]', 'http://testblog.com');
      await page.click('button:has-text("Create")');

      const blog = await page.locator('text=Test Blog');
      await expect(blog).toBeVisible();
    });
  });

  test('blog can be liked', async ({ page }) => {
    const likeButton = page.locator('button :has-text("Like")');
    await likeButton.click();
    const likeCount = await page.locator('.like-count');
    await expect(likeCount).toHaveText('1');
  });

  test('user can delete a blog', async ({ page }) => {
    page.once('dialog', (dialog) => dialog.accept());
    await page.click('button :has-text("Delete")');

    const blog = page.locator('text=Test Blog');
    await expect(blog).not.toBeVisible();
  });

  test('only the creator can see the delete button', async ({ page }) => {
    const deleteButton = page.locator('button :has-text("Delete")');
    await expect(deleteButton).toBeVisible();

    await page.click('button :has-text("Logout")');
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'pass123');
    await page.click('button[type="submit"]');

    await expect(deleteButton).not.toBeVisible();
  });

  test('blog are ordered by likes', async ({ page }) => {
    const likeButtons = page.locator('button :has-text("Like")');
    await likeButtons.nth(1).click();
    await likeButtons.nth(1).click();

    const blogs = await page.locator('.blog');
    const firstBlog = await blogs.nth(0).locator('text=Likes: 2');
    await expect(firstBlog).toBeVisible();
  });
});
