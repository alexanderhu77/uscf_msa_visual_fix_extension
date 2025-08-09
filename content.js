(function() {
  const currentUrl = window.location.href;

  /*
  Don't to do this in case players have "thru" in their names.
  document.querySelectorAll('body *').forEach(el => {
    if (el.children.length === 0) { // only leaf nodes
        el.textContent = el.textContent.replace(/\bthru\b/g, 'through');
    }
  });
  */

  // Handle tournament history pages specifically
  if (currentUrl.match(/^https:\/\/www\.uschess\.org\/msa\/MbrDtlTnmtHst\.php.*/)) {

    tableCaption = document.querySelector("body > table > tbody > tr:nth-child(3) > td > center > table:nth-child(4) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr:nth-child(1) > td > font > b")
    tableCaption.innerHTML = `<strong>${tableCaption.textContent.replace(/\bthru\b/g, 'through')}</strong>`;

    const outerTable = document.querySelector('table[bgcolor="FFFFFF"][width="764"]');
    if (outerTable) {
      const innerTable = outerTable.querySelector('table[bgcolor="FFFF80"]');
      if (innerTable) {
        innerTable.style.tableLayout = 'fixed';
        innerTable.style.borderSpacing = '0';
        innerTable.style.width = '100%';
        innerTable.style.boxSizing = 'border-box';
        const parentTd = innerTable.parentElement;
        if (parentTd) {
          parentTd.style.paddingTop = '5px';
          parentTd.style.padding = '5px 0 0 0';
          parentTd.style.width = '100%';
        }
        const paddingImg = innerTable.querySelector('img[src="Img/tbsPad.gif"][width="230"]');
        if (paddingImg && innerTable) {
          const computedStyle = window.getComputedStyle(innerTable);
          const totalWidth = parseInt(computedStyle.width) || 750; // Fallback to 750
          const otherImages = innerTable.querySelectorAll('img[src^="Img/tbs"]:not([src="Img/tbsPad.gif"])');
          let otherWidth = 0;
          otherImages.forEach(img => {
            otherWidth += img.width ? parseInt(img.width) : 0;
            // Add back margin-right: 2px for each image
            otherWidth += 2;
          });
          const newWidth = Math.max(0, totalWidth - otherWidth);
          paddingImg.style.width = `${newWidth}px`;
          paddingImg.style.display = 'inline';
          paddingImg.style.float = 'left';
          paddingImg.style.margin = '0';
          paddingImg.style.marginRight = '0';
        }
      }
    }
  } else {
    // Default handling for other pages
    const outerTable = document.querySelector('table[bgcolor="FFFFFF"][width="764"]');
    if (outerTable) {
      const innerTable = outerTable.querySelector('table[bgcolor="FFFF80"]');
      if (innerTable) {
        innerTable.style.tableLayout = 'fixed';
        innerTable.style.borderSpacing = '0';
        const parentTd = innerTable.parentElement;
        if (parentTd) {
          parentTd.style.paddingTop = '5px';
          parentTd.style.padding = '5px 0 0 0';
          parentTd.style.width = '100%';
        }
        const paddingImg = innerTable.querySelector('img[src="Img/tbsPad.gif"][width="230"]');
        if (paddingImg && innerTable) {
          const computedStyle = window.getComputedStyle(innerTable);
          const totalWidth = parseInt(computedStyle.width) || 750;
          const otherImages = innerTable.querySelectorAll('img[src^="Img/tbs"]:not([src="Img/tbsPad.gif"])');
          let otherWidth = 0;
          otherImages.forEach(img => {
            otherWidth += img.width ? parseInt(img.width) : 0;
          });
          const newWidth = Math.max(0, totalWidth - otherWidth - 10);
          paddingImg.style.width = `${newWidth}px`;
          paddingImg.style.display = 'inline-block';
          paddingImg.style.float = 'none';
          paddingImg.style.margin = '0';
          paddingImg.style.marginRight = '0';
        }
      }
    }
  }

  if (currentUrl.match(/^https:\/\/www\.uschess\.org\/msa\/MbrDtlTnmtDir\.php.*/)) {


    tableCaption = document.querySelector("body > table > tbody > tr:nth-child(3) > td > center > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > font > b")
    tableCaption.innerHTML = `<strong>${tableCaption.textContent.replace(/\bthru\b/g, 'through')}</strong>`;

    // Remove the certification notice text (uneeded after update)
    const certificationNoticeText = document.querySelector("body > table > tbody > tr:nth-child(3) > td > center > table:nth-child(4) > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)")
    certificationNoticeText.remove();
    // Extract name and USCF ID from the specified DOM path
    const nameElement = document.querySelector("body > table > tbody > tr:nth-child(3) > td > center > table:nth-child(4) > tbody > tr:nth-child(1) > td > font > b");
    if (nameElement) {
      const fullName = nameElement.textContent.trim();
      const nameParts = fullName.split(/\s+/);
      const uscfId = (nameParts[0] || '').slice(0, -1);
      const firstName = nameParts[1] || '';
      const lastName = nameParts.slice(2).join(' '); '';
      const safeSportUrl = `https://new.uschess.org/safesport-certified-tds?first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&uscf_state_22=All&gender_id=All`;
      console.log(`Constructed SafeSport URL: ${safeSportUrl}`);
      
      // Send message to background script to fetch SafeSport data
      chrome.runtime.sendMessage({
        action: 'fetchSafeSport',
        url: safeSportUrl,
        uscfId: uscfId
      }, response => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message to background:', chrome.runtime.lastError);
          return;
        }
        console.log('SafeSport Response:', response);
        if (response.status === 'success' && response.html) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response.html, 'text/html');
          
          // Find the table and get the last row
          const table = doc.querySelector("#block-skvare-custom-theme-content > div > div > table > tbody");
          if (!table) {
            const targetElement = document.querySelector("body > table > tbody > tr:nth-child(3) > td > center > table:nth-child(4) > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)");
            if (targetElement) {
              targetElement.innerHTML = `<strong>Expiration date not found. Please search on <a href="https://new.uschess.org/safesport-certified-tds"> https://new.uschess.org/safesport-certified-tds </a> </strong>`;
              console.log(`Updated DOM with expiration date: N/A`);
            }
            return;
          }
          const rows = table.querySelectorAll('tr');
          const lastRow = rows[rows.length - 1];
          if (!lastRow) {
            console.error('No rows found in SafeSport table');
            return;
          }
          
          // Verify USCF ID
          const uscfIdElement = lastRow.querySelector('td.views-field.views-field-external-identifier');
          if (!uscfIdElement) {
            console.error('USCF ID element not found in last row');
            return;
          }
          const fetchedUscfId = uscfIdElement.textContent.trim();
          if (fetchedUscfId !== response.uscfId) {
            console.error(`USCF ID mismatch: expected ${response.uscfId}, got ${fetchedUscfId}`);
            return;
          }
          
          // Extract expiration date
          const dateElement = lastRow.querySelector('td.views-field.views-field-nothing');
          if (!dateElement) {
            console.error('Expiration date element not found in last row');
            return;
          }
          const expirationDate = dateElement.textContent.trim();
          
          // Update the DOM with the expiration date
          const targetElement = document.querySelector("body > table > tbody > tr:nth-child(3) > td > center > table:nth-child(4) > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)");
          if (targetElement) {
            targetElement.innerHTML = `<strong>Expiration Date: ${expirationDate}</strong>`;
            console.log(`Updated DOM with expiration date: ${expirationDate}`);
          } else {
            console.error('Target element for date update not found');
          }
        } else {
          console.error('No valid HTML received or fetch failed');
        }
      });
    } else {
      console.error('Name element not found at specified DOM path');
    }
  }
  if (currentUrl.match(/^https:\/\/www\.uschess\.org\/msa\/MbrDtlMilestones\.php.*/)) {

    let table = document.querySelector(
      "body > table > tbody > tr:nth-child(3) > td > center > table:nth-child(4) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody"
    );

    if (table) {
      let rows = table.querySelectorAll("tr");

      for (let i = 1; i < rows.length; i++) {
        let dateCell = rows[i].querySelector("td:nth-child(2)");
        let resultCell = rows[i].querySelector("td:nth-child(3)");

        if (dateCell && resultCell) {
          let resultText = resultCell.textContent.trim();
          let words = resultText.split(/\s+/);

          if (words.length > 0 && words[words.length - 1] === "WIns") {
            words[words.length - 1] = "Wins";
            resultCell.textContent = words.join(" ");
          }
        }
      }
    }
  }
  if (currentUrl.match(/^https:\/\/www\.uschess\.org\/msa\/MbrDtlRtgSupp\.php.*/)) {

    let notesText = document.querySelector("body > table > tbody > tr:nth-child(3) > td > center > table:nth-child(4) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(9)");

    if (notesText){
      notesText.innerHTML = `<strong>${notesText.textContent}</strong>`;
    }

    let sourceText = document.querySelector("body > table > tbody > tr:nth-child(3) > td > center > table:nth-child(4) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(2) > b")
    if (sourceText) {
      sourceText.innerHTML = `<strong>Supplement Month</strong>`;
    }
  }

})();