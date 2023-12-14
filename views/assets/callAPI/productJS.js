const base_url = "http://localhost:8080";

const get_all_products = base_url + "/products";
const add_product = base_url + "/products";

const fetchAPI = async (url, method, body = null) => {
    const headers = {};

    if (!(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(body);
    }

    const res = await fetch(url, {
        method,
        headers,
        body: body
    });
    return await res.json();
};


document.getElementById("addProduct").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("submit");
    const name = document.getElementById("name").value;
    const importPrice = document.getElementById("import-price").value;
    const retailPrice = document.getElementById("retail-price").value;
    const quantity = document.getElementById("quantity").value;
    const category = document.getElementById("category").value;
    const image = document.getElementById("customFile").files[0];
    console.log(name, importPrice, retailPrice, quantity, category, image);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("importPrice", importPrice);
    formData.append("retailPrice", retailPrice);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("image", image);
    fetchAPI(add_product, "POST", formData).then((data) => {
        if (data.error) {
            swal({
                title: "Error!",
                text: data.error,
                icon: "error",
                button: "OK",
            });
        } else {
            swal({
                title: "Success!",
                text: "Add product successfully!",
                icon: "success",
                button: "OK",
            });
            window.location.href = "/pages/products";
        }
    });
});