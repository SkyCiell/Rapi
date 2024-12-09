document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formdata");
  const productList = document.getElementById("product-list");
  const confirmDialog = document.getElementById("confirmDialog");
  let products = [];
  let productId = 1;
  let deleteIndex = null;

  // Inisialisasi ID produk pertama
  document.getElementById("id_produk").value = `MD-${productId
    .toString()
    .padStart(3, "0")}`;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Mengambil nilai dari form
    const newProduct = {
      id_produk: document.getElementById("id_produk").value,
      nama_produk: document.getElementById("nama_produk").value,
      harga_produk: parseFloat(
        document.getElementById("harga_produk").value
      ).toFixed(2),
      satuan_produk: document.getElementById("satuan_produk").value,
      kategori_produk: document.getElementById("kategori_produk").value,
      stock_produk: document.getElementById("stock_produk").value,
      gambar_produk: document.getElementById("gambar_produk").value,
      stock_awal: parseInt(document.getElementById("stock_awal").value, 10),
    };

    console.log(`Produk Ditambahkan: ${newProduct.id_produk}`);
    products.push(newProduct);
    productId++;

    // Reset form
    form.reset();
    document.getElementById("id_produk").value = `MD-${productId
      .toString()
      .padStart(3, "0")}`;

    renderProducts();
  });

  function renderProducts() {
    productList.innerHTML = "";
    products.forEach((product, index) => {
      const stockAwalClass = product.stock_awal < 5 ? "red" : ""; // Kelas untuk warna stock awal
      const stockClass = product.stock_produk < 5 ? "red" : ""; // Kelas untuk warna stock

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${product.id_produk}</td>
        <td>${product.nama_produk}</td>
        <td>${product.harga_produk}</td>
        <td>${product.satuan_produk}</td>
        <td>${product.kategori_produk}</td>
        <td class="${stockClass}">${product.stock_produk}</td>
        <td><img src="${product.gambar_produk}" alt="${
        product.nama_produk
      }" style="width: 50px; height: auto;"></td>
        <td class="${stockAwalClass}">${product.stock_awal}</td>
        <td>
          <button onclick="editProduct(${index})">Edit</button>
          <button onclick="showDeleteConfirm(${index})">Hapus</button>
        </td>
      `;
      productList.appendChild(row);
    });
  }

  window.editProduct = function (index) {
    const product = products[index];

    // Mengisi form edit dengan data produk
    document.getElementById("edit_id_produk").value = product.id_produk;
    document.getElementById("edit_nama_produk").value = product.nama_produk;
    document.getElementById("edit_harga_produk").value = product.harga_produk;
    document.getElementById("edit_satuan_produk").value = product.satuan_produk;
    document.getElementById("edit_kategori_produk").value =
      product.kategori_produk;
    document.getElementById("edit_stock_produk").value = product.stock_produk;
    document.getElementById("edit_gambar_produk").value = product.gambar_produk;
    document.getElementById("edit_stock_awal").value = product.stock_awal;

    document.getElementById("editDialog").style.display = "flex";

    document.getElementById("editForm").onsubmit = function (event) {
      event.preventDefault();

      // Memperbarui data produk
      product.nama_produk = document.getElementById("edit_nama_produk").value;
      product.harga_produk = parseFloat(
        document.getElementById("edit_harga_produk").value
      ).toFixed(2);
      product.satuan_produk =
        document.getElementById("edit_satuan_produk").value;
      product.kategori_produk = document.getElementById(
        "edit_kategori_produk"
      ).value;
      product.stock_produk = document.getElementById("edit_stock_produk").value;
      product.gambar_produk =
        document.getElementById("edit_gambar_produk").value;
      product.stock_awal = parseInt(
        document.getElementById("edit_stock_awal").value,
        10
      );
      renderProducts();
      document.getElementById("editDialog").style.display = "none"; // Sembunyikan dialog setelah edit
    };

    document.getElementById("cancelEdit").onclick = function () {
      document.getElementById("editDialog").style.display = "none"; // Sembunyikan dialog jika dibatalkan
    };
  };

  window.showDeleteConfirm = function (index) {
    deleteIndex = index; // Simpan indeks produk yang akan dihapus
    confirmDialog.style.display = "flex"; // Tampilkan dialog konfirmasi
  };

  document.getElementById("confirmYes").addEventListener("click", function () {
    // Hapus produk dari array
    products.splice(deleteIndex, 1);
    renderProducts(); // Render ulang daftar produk
    confirmDialog.style.display = "none"; // Sembunyikan dialog konfirmasi

    // Periksa apakah tidak ada produk yang tersisa
    if (products.length === 0) {
      productId = 1; // Reset productId ke 1
      document.getElementById("id_produk").value = `MD-${productId
        .toString()
        .padStart(3, "0")}`; // Perbarui ID produk di form
    }
  });

  document.getElementById("confirmNo").addEventListener("click", function () {
    confirmDialog.style.display = "none"; // Sembunyikan dialog jika tidak jadi menghapus
  });
});
