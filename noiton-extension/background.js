
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({

    id: "save-to-notion",

    title: "Save selection to Notion",

    contexts: ["selection"] 


  });


});



chrome.contextMenus.onClicked.addListener((info, tab) => {


  if (info.menuItemId === "save-to-notion") {
    
  


    const textToSave = info.selectionText
    const currentUrl = tab.url




    console.log("Sending to Notion:", textToSave)

    

    fetch("http://localhost:4000/save-highlight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        text: textToSave, 
        url: currentUrl 
      })
    })


    .then(response => response.json())
    .then(data => {
      console.log("Success!", data)
    })


    .catch(error => {
      console.log("Error:", error)
    });

  }

});