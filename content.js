(function() {
  const currentUrl = window.location.href;

  // Handle tournament history pages specifically
  if (currentUrl.match(/^https:\/\/www\.uschess\.org\/msa\/MbrDtlTnmtHst\.php.*/)) {
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
})();