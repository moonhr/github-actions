// create-notion-page.js
const fetch = require("node-fetch");

async function createNotionPage() {
  const notionApiUrl = "https://api.notion.com/v1/pages";
  const databaseId = "14492ced8e5f800b979ac1d7e55e25ca"; // Notion 데이터베이스 ID를 여기에 입력하세요
  const notionToken = process.env.NOTION_API_TOKEN;

  const response = await fetch(notionApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notionToken}`,
      "Content-Type": "application/json",
      "Notion-Version": "2021-08-16",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: "New Entry from GitHub Actions",
              },
            },
          ],
        },
        Description: {
          rich_text: [
            {
              text: {
                content:
                  "This page was created by GitHub Actions using Notion API.",
              },
            },
          ],
        },
      },
    }),
  });

  if (!response.ok) {
    console.error("Failed to create Notion page:", response.statusText);
  } else {
    console.log("Notion page created successfully!");
  }
}

createNotionPage().catch(console.error);
