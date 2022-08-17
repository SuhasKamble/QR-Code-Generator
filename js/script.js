const form = document.getElementById("generated-form");
const qr = document.getElementById("qrcode");

const onGenerateForm = (e) => {
  e.preventDefault();
  clearUI();
  let url = document.getElementById("url").value;
  const size = document.getElementById("size").value;
  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        saveUrlBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

const saveUrlBtn = (saveUrl) => {
  const saveLink = document.createElement("a");
  saveLink.id = "save-link";
  saveLink.classList =
    "w-3/4 md:w-96 bg-red-500 rounded py-3 text-white mt-5 text-center";
  saveLink.innerHTML = "Save Image";
  saveLink.href = saveUrl;
  saveLink.download = "qrcode";
  document.getElementById("generated").appendChild(saveLink);
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

form.addEventListener("submit", onGenerateForm);
