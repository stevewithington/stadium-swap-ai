import { test, expect } from '@playwright/test';

test.describe('Stadium Swap AI', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the Gemini API call to avoid using real quota and ensure deterministic tests
    await page.route('**/models/*:generateContent*', async route => {
      const json = {
        candidates: [
          {
            content: {
              parts: [
                {
                  inlineData: {
                    mimeType: "image/png",
                    // A simple 1x1 red pixel base64
                    data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                  }
                }
              ]
            }
          }
        ]
      };
      await route.fulfill({ json });
    });

    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Stadium Swap AI/);
    await expect(page.getByText('Powered by Gemini 3.0 Pro')).toBeVisible();
    await expect(page.getByText('Upload a photo to start the magic')).toBeVisible();
  });

  test('should complete the full image generation flow', async ({ page }) => {
    // 1. Upload Image
    // Create a dummy file buffer
    const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
    
    // Upload the file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test-fan.png',
      mimeType: 'image/png',
      buffer
    });

    // Verify upload UI state
    await expect(page.getByText('Image Uploaded')).toBeVisible();
    await expect(page.getByText('Ready to transform')).toBeVisible();

    // 2. Configure Settings
    // Select a sport (Soccer is default, let's switch to Basketball)
    await page.getByRole('button', { name: 'Basketball' }).click();
    
    // Enter Team Colors (Required field)
    const colorInput = page.getByPlaceholder("e.g. Red and White, or 'Chicago Bulls'");
    await colorInput.fill('Purple and Gold');

    // Select Atmosphere
    await page.getByText('Electric Night Game').click();

    // 3. Generate
    const generateBtn = page.getByRole('button', { name: 'TRANSFORM TO FANS' });
    await expect(generateBtn).toBeEnabled();
    await generateBtn.click();

    // 4. Verify Results
    // The mock response should return quickly. 
    // We check for the success state elements.
    await expect(page.getByText('Generated', { exact: true })).toBeVisible();
    await expect(page.getByAltText('Generated Fan Version')).toBeVisible();
    
    // Verify the "Start Over" button appears
    await expect(page.getByRole('button', { name: 'Start Over' })).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Upload image first
    const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
    await page.locator('input[type="file"]').setInputFiles({
      name: 'test.png',
      mimeType: 'image/png',
      buffer
    });

    // The generate button should be disabled initially (because team colors are empty)
    const generateBtn = page.getByRole('button', { name: 'TRANSFORM TO FANS' });
    await expect(generateBtn).toBeDisabled();
    await expect(page.getByText('* Please enter team colors to continue')).toBeVisible();

    // Fill colors
    await page.getByPlaceholder("e.g. Red and White, or 'Chicago Bulls'").fill('Green');
    
    // Should now be enabled
    await expect(generateBtn).toBeEnabled();
    await expect(page.getByText('* Please enter team colors to continue')).toBeHidden();
  });
});