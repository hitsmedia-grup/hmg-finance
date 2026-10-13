# Filter per Dompet

Filter data berdasarkan dompet/akun tertentu.

## Halaman dengan Filter Dompet

### Laporan & Agregasi
- **Laporan** (`/reports`) - Tren kategori bulanan, rekap tahunan
- **Rekap** (`/rekap`) - Transaksi dengan pagination server-side
- Transfer dihitung sebagai uang masuk/keluar dompet yang dipilih

### Entitas
- **Hutang & Cicilan** (`/debts`) - Filter cicilan per dompet pembayaran
- **Langganan** (`/subscriptions`) - Filter langganan per dompet
- **Target Tabungan** (`/goals`) - Filter target per akun tabungan
- **Transaksi Berulang** (`/recurring`) - Filter per dompet (termasuk transfer)
- **Budget** (`/budgets`) - Filter budget per dompet
- **Pengingat** (`/reminders`) - Filter reminder per dompet

## Cara Pakai

1. Klik dropdown "Semua Dompet" di bawah header halaman
2. Pilih dompet
3. Data filter otomatis
4. Filter tersimpan di URL (`?account=<uuid>`)

## Implementasi

**Client-side** (pagination lokal):
- Debts, subscriptions, goals, recurring, budgets, reminders
- Filter array di browser

**Server-side** (pagination database):
- Reports, rekap
- Gold, receivables (pending)

## Catatan

- Filter "Semua Dompet" = tampilkan semua data
- Recurring: transfer cocok jika dompet asal atau tujuan match
- Budget dapat set dompet opsional (field baru)
