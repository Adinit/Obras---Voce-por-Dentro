document.getElementById("fetchButton").addEventListener("click", fetchData);

async function fetchData() {
  try {
    const response = await fetch("https://api.publicapis.org/entries");
    const data = await response.json();
    document.getElementById("dataOutput").innerText = JSON.stringify(data.entries[0], null, 2);
  } catch (error) {
    document.getElementById("dataOutput").innerText = "Error fetching data";
  }
}
