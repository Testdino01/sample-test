// @ts-check
import { expect, test } from '@playwright/test';
import AllPages from '../pages/AllPages.js';
import dotenv from 'dotenv';
dotenv.config({ override: true });

let allPages;

test.beforeEach(async ({ page }) => {
  allPages = new AllPages(page);
  await page.goto('/');
});

async function login(page, username = process.env.USERNAME, password = process.env.PASSWORD) {
  await allPages.loginPage.clickOnUserProfileIcon();
  await allPages.loginPage.validateSignInPage();
  await allPages.loginPage.login(username, password);
}

async function login1(username = process.env.USERNAME1, password = process.env.PASSWORD) {
  await allPages.loginPage.clickOnUserProfileIcon();
  await allPages.loginPage.validateSignInPage();
  await allPages.loginPage.login(username, password);
}

async function logout() {
  await allPages.loginPage.clickOnUserProfileIcon();
  await allPages.loginPage.clickOnLogoutButton();
}

test('Verify that user can login and logout successfully', async ({ page }) => {
  await login();
  await logout();
});

test('Verify that User Can Manage Addresses after Logging In', async () => {
    await login();

  await test.step('Verify that user is able to add address successfully', async () => {
    await allPages.userPage.clickOnUserProfileIcon();
    await allPages.userPage.clickOnAddressTab();
  });
});

test('Verify that User Can Complete the Journey from Login to Order Placement', async () => {
  const productName = 'GoPro HERO10 Black';
  await login();
  await allPages.inventoryPage.clickOnShopNowButton();
  await allPages.inventoryPage.clickOnAllProductsLink();
  await allPages.inventoryPage.searchProduct(productName);
  await allPages.inventoryPage.verifyProductTitleVisible(productName);
  await allPages.inventoryPage.clickOnAddToCartIcon();
});

test('Verify user can place and cancel an order', async () => {
  const productName = 'GoPro HERO10 Black';
  const productPriceAndQuantity = '₹49,999 × 1';
  const productQuantity = '1';
  const orderStatusProcessing = 'Processing';
  const orderStatusCanceled = 'Canceled';

  await test.step('Verify that user can login successfully', async () => {
    await login();
    await allPages.inventoryPage.clickOnAllProductsLink();
    await allPages.inventoryPage.searchProduct(productName);
    await allPages.inventoryPage.verifyProductTitleVisible(productName);
    await allPages.inventoryPage.clickOnAddToCartIcon();
  })

  await test.step('Add product to cart and checkout', async () => {
   await allPages.cartPage.clickOnCartIcon();
    await allPages.cartPage.verifyCartItemVisible(productName);
    await allPages.cartPage.clickOnCheckoutButton();
  })
});

test('Verify that a New User Can Successfully Complete the Journey from Registration to a Single Order Placement', async () => {
  // fresh test data
  const email = `test+${Date.now()}@test.com`;
  const firstName = 'Test';
  const lastName = 'User';

  let productName;
  let productPrice;
  let productReviewCount;

  await test.step('Verify that user can register successfully', async () => {
    await allPages.loginPage.clickOnUserProfileIcon();
    await allPages.loginPage.validateSignInPage();
    await allPages.loginPage.clickOnSignupLink();
    await allPages.signupPage.assertSignupPage();
    await allPages.signupPage.signup(firstName, lastName, email, process.env.PASSWORD);
    await allPages.signupPage.verifySuccessSignUp();
  })

  await test.step('Verify that user can login successfully', async () => {
    await allPages.loginPage.validateSignInPage();
    await allPages.loginPage.login(email, process.env.PASSWORD);
  })
});

test('Verify that user can filter products by price range', async () => {
    await login();
    await allPages.homePage.clickOnShopNowButton();
    await allPages.homePage.clickOnFilterButton();
    await allPages.homePage.AdjustPriceRangeSlider('10000', '20000');
    await allPages.homePage.clickOnFilterButton();
});

test('Verify that user is able to fill Contact Us page successfully', async () => {
    await login();
    await allPages.homePage.clickOnContactUsLink();
    await allPages.contactUsPage.assertContactUsTitle();
    await allPages.contactUsPage.fillContactUsForm();
    await allPages.contactUsPage.verifySuccessContactUsFormSubmission();
});

test('Verify that user is able to submit a product review', async () => {
  await test.step('Login as existing user and navigate to a product', async () => {
    await login();
  })

  await test.step('Navigate to all product section and select a product', async () => {
    await allPages.homePage.clickOnShopNowButton();
    await allPages.allProductsPage.assertAllProductsTitle();
    await allPages.allProductsPage.clickNthProduct(1);
  })

  await test.step('Submit a product review and verify submission', async () => {
    await allPages.productDetailsPage.clickOnReviewsTab();
    await allPages.productDetailsPage.assertReviewsTab();
    
    await allPages.productDetailsPage.clickOnWriteAReviewBtn();
    await allPages.productDetailsPage.fillReviewForm();
    await allPages.productDetailsPage.assertSubmittedReview({
        name: 'John Doe',
        title: 'Great Product',
        opinion: 'This product exceeded my expectations. Highly recommend!'
    });
  })
});

test('Verify that user can purchase multiple quantities in a single order', async () => {
    const productName = 'GoPro HERO10 Black';
    await login();
    await allPages.inventoryPage.clickOnShopNowButton();
    await allPages.inventoryPage.clickOnAllProductsLink();
    await allPages.inventoryPage.searchProduct(productName);
    await allPages.inventoryPage.verifyProductTitleVisible(productName);
    await allPages.inventoryPage.clickOnAddToCartIcon();

    await allPages.cartPage.clickOnCartIcon();
    await allPages.cartPage.verifyCartItemVisible(productName);
    await allPages.cartPage.clickIncreaseQuantityButton();
    await allPages.cartPage.verifyIncreasedQuantity('2');
    await allPages.cartPage.clickOnCheckoutButton();
});

test('Verify that all the navbar are working properly', async () => {
    await login();
    await allPages.homePage.clickBackToHomeButton();
    // await allPages.homePage.assertHomePage();
    await allPages.homePage.clickAllProductsNav();
    await allPages.allProductsPage.assertAllProductsTitle();
    await allPages.homePage.clickOnContactUsLink();
    await allPages.contactUsPage.assertContactUsTitle();
    await allPages.homePage.clickAboutUsNav();
    await allPages.homePage.assertAboutUsTitle();
});