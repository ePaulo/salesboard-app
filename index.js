// Product A info
let productA = {
  emoji: "⭐",
  revenue: 200,
  commission: 50,
};

// Product B info
let productB = {
  emoji: "🔥",
  revenue: 300,
  commission: 75,
};

const starProductBtn = document.getElementById("star-product");
const fireProductBtn = document.getElementById("fire-product");

const salesAndIncentivesDomElements = {
  soldProducts: document.getElementById("sold-products"),
  achievements: document.getElementById("achievements"),
  totalRevenue: document.getElementById("total-revenue"),
  totalCommission: document.getElementById("total-commission"),
};

let salesAndIncentivesData = {
  soldProducts: [],
  achievements: [],
  totalRevenue: 0,
  totalCommission: 0,
};

function updateSoldAndAchievementCounts() {
  document.getElementById("num-of-sold-products").textContent =
    salesAndIncentivesData.soldProducts.length;
  document.getElementById("num-of-achievements").textContent =
    salesAndIncentivesData.achievements.length;
}

handleClick();

function handleClick() {
  document.addEventListener("click", (e) => {
    e.preventDefault();
    switch (e.target.dataset.product) {
      case "star":
        updateObjProp("soldProducts", productA.emoji);
        updateObjProp("totalRevenue", productA.revenue);
        updateObjProp("totalCommission", productA.commission);
        break;
      case "fire":
        updateObjProp("soldProducts", productB.emoji);
        updateObjProp("totalRevenue", productB.revenue);
        updateObjProp("totalCommission", productB.commission);
        break;
      default:
        break;
    }
    updateAchievements();
    setLocalStorage();
    renderData();
  });
}

function updateObjProp(property, value) {
  if (Array.isArray(salesAndIncentivesData[property])) {
    salesAndIncentivesData[property].push(value);
  } else {
    salesAndIncentivesData[property] += value;
  }
}

function updateAchievements() {
  addBellIconOnFirstProductSale();
  addCurrencyIconWhenAmountExceedsThreshold(2500);
  addPrizeIconOnFifteenthSale(15);
}

function addBellIconOnFirstProductSale() {
  if (salesAndIncentivesData["soldProducts"].length === 1) {
    updateObjProp("achievements", "🔔");
  }
}

function addCurrencyIconWhenAmountExceedsThreshold(threshold) {
  if (salesAndIncentivesData["totalRevenue"] >= threshold) {
    updateObjProp("achievements", "💰");
  }
}

function addPrizeIconOnFifteenthSale(threshold) {
  if (salesAndIncentivesData["soldProducts"].length === threshold) {
    updateObjProp("achievements", "🏆");
  }
}

function setLocalStorage() {
  localStorage.setItem("salesData", JSON.stringify(salesAndIncentivesData));
}

function getDataFromLocalStorage() {
  return (
    JSON.parse(localStorage.getItem("salesData")) || salesAndIncentivesData
  );
}

window.addEventListener("load", (e) => {
  e.preventDefault();
  renderData();
});

function renderData() {
  salesAndIncentivesData = getDataFromLocalStorage();
  for (const [key, value] of Object.entries(salesAndIncentivesData)) {
    let data = "";
    if (Array.isArray(value)) {
      value.forEach((element) => {
        data += `<span>${element}</span>`;
      });
    } else {
      data = `$ ${value}`;
    }
    salesAndIncentivesDomElements[key].innerHTML = data;
  }
  updateSoldAndAchievementCounts();
}
