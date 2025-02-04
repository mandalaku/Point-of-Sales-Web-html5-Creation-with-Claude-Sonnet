# Aplikasi Point of Sale (POS)

Aplikasi POS web responsif yang dibangun menggunakan HTML, Bootstrap 5, dan JavaScript.

## 🚀 Fitur Utama

- Layout tiga panel responsif (1:3:1)
- Navigasi sidebar dengan ikon intuitif
- Kategori menu horizontal yang dapat di-scroll
- Grid menu dinamis dengan gambar dari Lorem Picsum
- Panel pesanan dengan kalkulasi otomatis
- Manajemen pesanan real-time
- Notifikasi visual untuk aksi pengguna
- Micro-interactions dan animasi
- Mendukung mode responsif (min. 1024x768)

## 📋 Prasyarat

- Browser modern yang mendukung ES6+ (Chrome, Firefox, Safari, Edge)
- Koneksi internet untuk memuat:
  - Bootstrap 5 CSS & JS
  - Font Awesome Icons
  - Lorem Picsum Images

## 🛠️ Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome 6
- Lorem Picsum

## 💻 Cara Penggunaan

1. Clone atau download repository ini
2. Buka file `index.html` di browser

### Struktur Folder

```
pos-web/
├── index.html      # File HTML utama
├── styles.css      # File CSS kustom
├── script.js       # File JavaScript untuk logika aplikasi
└── README.md       # Dokumentasi
```

## 🎯 Fitur Detail

### Panel Kiri (Sidebar)
- Logo aplikasi
- Menu navigasi dengan ikon
- Tombol logout

### Panel Tengah (Menu)
- Bar kategori horizontal scrollable
- Grid menu 4x3
- Gambar menu dengan rasio 1:1
- Tombol "ADD" untuk setiap item

### Panel Kanan (Pesanan)
- Informasi pelanggan
- Pemilihan tipe pesanan
- Nomor pesanan & meja
- Daftar item pesanan
- Ringkasan pembayaran
- Tombol aksi (Cetak, Proses, Bayar)

## 💰 Kalkulasi Harga
- Subtotal: Jumlah harga semua item
- Biaya Layanan: 5% dari subtotal
- Pajak: 10% dari subtotal
- Total: Subtotal + Biaya Layanan + Pajak

## 🎨 Skema Warna
- Primary: Green (#00AA13)
- Secondary: Orange (#FF5C00)
- Background: White (#FFFFFF)
- Text: Black (#000000)
- Disabled: Gray (#808080)

## 📱 Responsivitas
- Minimal: 1024x768
- Optimal: 1440x900
- Sidebar dapat dilipat
- Grid menu adaptif
- Panel pesanan dapat disembunyikan

## ♿ Aksesibilitas
- Navigasi keyboard
- Label ARIA
- Semantic HTML
- Kontras warna yang baik

## 🔄 State Management
- Keranjang belanja
- Status navigasi aktif
- Detail pesanan
- Status loading & error

## 🎉 Fitur Bonus
- Micro-interactions (hover, ripple)
- Transisi halaman yang halus
- Loading skeleton
- Sistem notifikasi

## 📝 Catatan Pengembangan
- Data menu menggunakan data dummy
- Gambar dari Lorem Picsum
- Penyimpanan state menggunakan memori

## 🤝 Kontribusi
Silakan buat issue atau pull request untuk kontribusi.

## 📜 Lisensi
Proyek ini dilisensikan di bawah [MIT License](https://opensource.org/licenses/MIT).