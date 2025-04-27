// Tangkap lokasi
let currentLocationUrl = '';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formKunjungan');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  // Tangkap lokasi saat form dibuka
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      currentLocationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    }, (error) => {
      console.warn('Gagal mendapatkan lokasi:', error.message);
    });
  } else {
    alert('Geolocation tidak didukung oleh browser Anda.');
  }
});

// Fungsi handleSubmit untuk form
async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  // Validasi lokasi
  if (!currentLocationUrl) {
    alert('Lokasi toko tidak ditemukan.');
    return;
  }

  // Validasi input data
  const data = {
    nama_sales: formData.get('nama_sales'),
    tanggal_kunjungan: formData.get('tanggal_kunjungan'),
    kategori_toko: formData.get('kategori_toko'),
    nama_toko: formData.get('nama_toko'),
    status_toko: formData.get('status_toko'),
    provinsi: formData.get('provinsi'),
    kota_kabupaten: formData.get('kota_kabupaten'),
    kecamatan: formData.get('kecamatan'),
    kelurahan: formData.get('kelurahan'),
    nama_pic: formData.get('nama_pic'),
    no_pic: formData.get('no_pic'),
    kegiatan: formData.get('kegiatan'),
    deskripsi_kegiatan: formData.get('deskripsi_kegiatan'),
    kgberas_penjualanBerasToko: parseFloat(formData.get('kgberas_penjualanBerasToko')) || null,
    produk_pesaing: formData.get('produk_pesaing'),
    kg_produkpesaing: parseFloat(formData.get('kg_produkpesaing')) || null,
    harga_produkpesaing: parseFloat(formData.get('harga_produkpesaing')) || null,
    rincianPO_UnGlu5kg_pack: parseFloat(formData.get('rincianPO_UnGlu5kg_pack')) || null,
    rincianPO_Segowangi5kg_pack: parseFloat(formData.get('rincianPO_Segowangi5kg_pack')) || null,
    rincianPO_Segowangi2_5kg_pack: parseFloat(formData.get('rincianPO_Segowangi2_5kg_pack')) || null,
    rincianPO_CapSego10kg_pack: parseFloat(formData.get('rincianPO_CapSego10kg_pack')) || null,
    rincianPO_Medium25kg_pack: parseFloat(formData.get('rincianPO_Medium25kg_pack')) || null,
    rincianPO_Medium50kg_pack: parseFloat(formData.get('rincianPO_Medium50kg_pack')) || null,
    foto_toko: formData.get('foto_toko') ? formData.get('foto_toko').name : '', // Jika foto diupload
    lokasi_toko: currentLocationUrl,
  };

  try {
    // Kirim data ke Google Apps Script
    const response = await fetch('https://script.google.com/macros/s/AKfycbz6_33MRUc3l9w0can628IxF_xke8ScytuDj4gBabdJDn1YXbpEqNdAiOgkb70UP4q0/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      alert('Data berhasil disimpan!');
      form.reset(); // Reset form setelah submit
    } else {
      alert('Gagal menyimpan data: ' + result.error);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    alert('Terjadi kesalahan saat mengirim data.');
  }
}
