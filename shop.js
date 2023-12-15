document.addEventListener("DOMContentLoaded", async function () {
  const API_URL =
    "https://7373-172-188-41-15.ngrok-free.app/api/collections/shoes/records";

  let itemList = [];

  const response = await fetch(API_URL);
  const result = await response.json();

  const display = document.querySelector(".item-container");

  for (let i = 0; i < result.items.length; i++) {
    itemList.push(result.items[i]);

    display.innerHTML += `
        <div class="item">
                <div class="item-img">
                    <img class="imgbase" src="${itemList[i].url}" alt="item picture">
                </div>
                <div class="rating"> &#9733; &#9733; &#9733; &#9733; &#9733; </div>
                <div class="item-title"> ${itemList[i].title} </div>
                <div class="item-price"> <strong> $${itemList[i].price} </strong></div>

        </div>
    `;
  }

  ////

  const input = document.querySelectorAll("input");
  const inputName = document.querySelector(".input-name");
  const inputPrice = document.querySelector(".input-price");
  const inputImage = document.querySelector(".input-image");
  const addItem = document.querySelector(".add-btn");

  addItem.addEventListener("click", async () => {
    if (!inputName.value || !inputPrice.value || !inputImage.value) {
      return;
    }

    const newItem = {
      title: inputName.value,
      price: inputPrice.value,
      url: inputImage.value,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    };

    const response = await fetch(
      "https://7373-172-188-41-15.ngrok-free.app/api/collections/shoes/records",
      options
    );

    const result = await response.json();

    display.innerHTML += `
                <div class="item">
                        <div class="item-img">
                            <img class="imgbase" src="${result.url}" alt="item picture">
                        </div>
                        <div class="rating"> &#9733; &#9733; &#9733; &#9733; &#9733; </div>
                        <div class="item-title"> ${result.title} </div>
                        <div class="item-price"> <strong> $${result.price} </strong></div>
        
                </div>
            `;
    input.value = "";
  });
});
