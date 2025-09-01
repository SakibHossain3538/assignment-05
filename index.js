
const lifeCountEl = document.getElementById("life-count");
const coinCountEl = document.getElementById("coin-count");
const copyCountEl = document.getElementById("copy-count");
const callHistoryContainerEl = document.getElementById(
  "call-history-container"
);

document.querySelector("main").addEventListener("click", (e) => {

  const target = e.target.closest(
    ".life-one-up, .call-one-up, .copy-one-up, #clear-call-history"
  );

  if (!target) return;

  switch (true) {
 
    case target.classList.contains("life-one-up"):
      lifeCountEl.textContent = parseInt(lifeCountEl.textContent) + 1;
      break;

 
    case target.classList.contains("call-one-up"):
      const coinBalance = parseInt(coinCountEl.textContent);
      const canCall = coinBalance >= 20;

      if (canCall) {
        const serviceData = {
          nameEn: target.parentElement.getAttribute("data-service-name-en"),
          nameBn: target.parentElement.getAttribute("data-service-name-bn"),
          number: target.parentElement.getAttribute("data-service-number"),
        };

        alert(
          `Calling '${serviceData.nameEn} (${serviceData.nameBn})' on (${serviceData.number}) . . .`
        );

        coinCountEl.textContent = coinBalance - 20;

   
        callHistoryContainerEl.innerHTML += generateCallHistory(serviceData);
      } else {
        alert("Not enough coins!");
      }
      break;


    case target.classList.contains("copy-one-up"):
      const serviceData = {
        nameEn: target.parentElement.getAttribute("data-service-name-en"),
        nameBn: target.parentElement.getAttribute("data-service-name-bn"),
        number: target.parentElement.getAttribute("data-service-number"),
      };

  
      alert(
        `Copied '${serviceData.nameEn} (${serviceData.nameBn})'s Hotline Number..`
      );

 
      copyCountEl.textContent = parseInt(copyCountEl.textContent) + 1;

 
      navigator.clipboard.writeText(serviceData.number);
      break;


    case target.id === "clear-call-history":
      callHistoryContainerEl.innerHTML = "";
      break;

    default:
      console.error("We shouldn't be here! 🤔");
      console.error(e);
      break;
  }
});


function generateCallHistory(serviceData) {
  const callTime = new Date().toLocaleTimeString();
  return `
	  <div
            class="flex items-center justify-between p-4 bg-[#f9f9f9] rounded-lg"
          >
            <div class="space-y-2">
              <p>${serviceData.nameBn}</p>
              <p>${serviceData.number}</p>
            </div>
            <p>${callTime}</p>
          </div>
	`;
}
