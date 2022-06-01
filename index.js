function main() {
  const input = document.querySelector("input");
  input.addEventListener("change", handleSelectFile);
}

function handleSelectFile(e) {
  const files = e.target.files;
  if (!files.length) {
    alert("No file selected");
  }
  var fr = new FileReader();
  fr.onload = function () {
    const items = Papa.parse(fr.result, { header: true }).data;
    displayItems(items);
  };
  fr.readAsText(files[0]);
}

function processData(data) {
  const lines = data.split("\n");
  const headers = lines[0].split(",");
  const dataRows = lines.slice(1);
  const dataArray = dataRows.map((row) => {
    const values = row.split(",");
    const dataObj = {};
    for (let i = 0; i < headers.length; i++) {
      dataObj[headers[i]] = values[i];
    }
    return dataObj;
  });
  return dataArray;
}

function displayItems(items) {
  const labelsPerPage = 30;
  const labelPages = [];
  for (let i = 0; i < items.length; i += labelsPerPage) {
    const labels = items.slice(i, i + labelsPerPage);
    labelPages.push(labels);
  }
  const pageContainer = document.querySelector("#page-container");
  pageContainer.innerHTML = "";
  labelPages.forEach((labelPage) => {
    let labelHtml = "";
    labelPage.forEach((label) => {
      labelHtml += `
      <div class="label">
        <div class="title">${label.name}</div>
        <div class="bin">${label.bin}</div>
        <div class="description">${label.description}</div>
      </div>
      `;
    });
    pageContainer.innerHTML += `
    <div class="page">
      <div class="grid">${labelHtml}</div>
    </div>
    `;
  });
}

function truncate(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

main();
