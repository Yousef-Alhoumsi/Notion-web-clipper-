// Importing the required tools
const express = require("express");
const cors = require("cors");
const { Client } = require("@notionhq/client");
require("dotenv").config();



//Set App
const app = express();
const port = process.env.PORT || 4000;


app.use(cors()); 
app.use(express.json()); 

const notion = new Client({ auth: process.env.NOTION_KEY });

app.post("/save-highlight", async (req, res) => {
  
  // get the text and url sent from the extension
  const { text, url } = req.body; 

  console.log("Received text to save:", text); 

  try {
    // talk to Notion
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        title: {
          title: [{ text: { content: "Saved from Chrome" } }],
        },
        URL: { 
          url: url 
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [{ type: "text", text: { content: text } }],
          },
        },
      ],
    });

    // If successful
    res.json({ message: "success, saved to Notion." });
    
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ error: "Something went wrong saving to Notion." });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});