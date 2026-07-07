const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({page, request}) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({page})=> {
        await page.getByRole('link', {name: 'login'}).click()
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({page}) => {
            await loginWith(page, 'mluukkai', 'wrong')
            await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
        })
    })

    describe('when logged in', () => {
        beforeEach(async ({page}) => {
            await loginWith(page, 'mluukkai', 'salainen')
        })

        test('a new blog can be created', async ({page}) => {
            await createBlog(page, 'Playwright test', 'Playwright', 'playwright.org')
            await expect(page.getByRole('link', {name: 'Playwright test'})).toBeVisible()
        })

        test('blog can be liked', async ({page}) => {
            await createBlog(page, 'Playwright test', 'Playwright', 'playwright.org')
            await page.getByRole('link', {name: 'Playwright test'}).click()
            await page.getByRole('button', {name: 'like'}).click()
            await expect(page.getByText('likes: 1')).toBeVisible()
        })

        test('user can remove blog', async ({page}) => {
            await createBlog(page, 'Playwright test', 'Playwright', 'playwright.org')
            await page.getByRole('link', {name: 'Playwright test'}).click()
            page.once('dialog', async dialog => {
                await dialog.accept()
            })
            await page.getByRole('button', {name: 'remove'}).click()
            await expect(page.getByRole('link', {name: 'Playwright test'})).toHaveCount(0)
        })

        test('only the user who created the blog sees the remove button', async ({ page, request }) => {
            await createBlog(page, 'Playwright test', 'Playwright', 'playwright.org')

            await request.post('/api/users', {
                data: {
                    name: 'Another User',
                    username: 'another',
                    password: 'secret'
                }
            })

            await page.getByRole('button', {name: 'logout'}).click()
            await loginWith(page, 'another', 'secret')

            await page.getByRole('link', {name: 'Playwright test'}).click()
            await expect(page.getByRole('button', {name: 'remove'})).toHaveCount(0)
        })

        test('blogs are shown in descending order by likes', async ({ page }) => {
            await createBlog(page, 'Low likes blog', 'Playwright', 'playwright.org')
            await createBlog(page, 'High likes blog', 'Playwright', 'playwright.org')
            await createBlog(page, 'Medium likes blog', 'Playwright', 'playwright.org')

            // Like Low likes blog once
            await page.getByRole('link', {name: 'Low likes blog'}).click()
            await page.getByRole('button', {name: 'like'}).click()
            await page.getByRole('link', {name: 'blogs'}).click()

            // Like High likes blog three times
            await page.getByRole('link', {name: 'High likes blog'}).click()
            await page.getByRole('button', {name: 'like'}).click()
            await page.getByRole('button', {name: 'like'}).click()
            await page.getByRole('button', {name: 'like'}).click()
            await page.getByRole('link', {name: 'blogs'}).click()

            // Like Medium likes blog twice
            await page.getByRole('link', {name: 'Medium likes blog'}).click()
            await page.getByRole('button', {name: 'like'}).click()
            await page.getByRole('button', {name: 'like'}).click()
            await page.getByRole('link', {name: 'blogs'}).click()

            // Get the blog links in order
            const blogLinks = page.getByRole('link').filter({hasText: /Low likes blog|High likes blog|Medium likes blog/})
            const texts = await blogLinks.allTextContents()

            // Find indices of each blog
            const highIndex = texts.findIndex(text => text.includes('High likes blog'))
            const mediumIndex = texts.findIndex(text => text.includes('Medium likes blog'))
            const lowIndex = texts.findIndex(text => text.includes('Low likes blog'))

            // Verify they are in descending order by likes (High > Medium > Low)
            expect(highIndex).toBeGreaterThan(mediumIndex)
            expect(mediumIndex).toBeGreaterThan(lowIndex)
        })
    })
})