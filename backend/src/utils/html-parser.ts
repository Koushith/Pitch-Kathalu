/**
 * This code parses the html from instagram url
 */
import puppeteer from "puppeteer";

import fs from "fs/promises";

// export const htmlParser = async (instagramPostUrl: string) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   try {
//     // Navigate to the Instagram post URL
//     await page.goto(instagramPostUrl);

//     // Get the redirected URL after navigation
//     const redirectedUrl = page.url();

//     // Navigate to the redirected URL
//     await page.goto(redirectedUrl);

//     // Get the content of the redirected URL
//     const redirectedContent = await page.content();

//     // Write the redirectedContent to res.txt file
//     await fs.writeFile("res.html", redirectedContent);

//     //.console.log("Content written to res.txt");

//     return redirectedContent;
//   } catch (error) {
//     console.error("Error:", error);
//   } finally {
//     await browser.close();
//   }
// };

export const htmlParser = async (instagramPostUrl: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the Instagram post URL
    await page.goto(instagramPostUrl);

    // Get the redirected URL after navigation
    const redirectedUrl = page.url();

    // Navigate to the redirected URL
    await page.goto(redirectedUrl);

    // Get the content of the redirected URL
    const instagramResponse = await page.content();

    // Define the regular expression pattern
    const pattern = /(\d+)\s+likes, (\d+)\s+comments - [^-]+ on ([^:]+):/;

    // Find the meta tag containing the description
    const descriptionMetaTag = await page.$('meta[name="description"]');
    const descriptionContent = await descriptionMetaTag?.evaluate((el) =>
      el.getAttribute("content")
    );

    let likes, comments, date;
    if (descriptionContent) {
      const match = descriptionContent.match(pattern);
      if (match) {
        likes = match[1];
        comments = match[2];
        date = match[3];
      } else {
        console.log("Description format does not match.");
      }
    } else {
      console.log("Description meta tag not found.");
    }

    // Write the redirectedContent to res.html file
    await fs.writeFile("res.html", instagramResponse);

    return { instagramResponse, likes, comments, date };
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
};
