# Wallet Filter untuk Halaman Entity

**Status**: Implemented  
**Tanggal**: 2024-10-13  
**Author**: System

## Context

Setelah menambahkan filter dompet di halaman Laporan dan Rekap (#62), pengguna perlu cara untuk melihat data entitas (utang/cicilan, langganan, target, dll) per dompet.

## Decision

Tambahkan filter dompet ke 8 halaman entity:

**Client-side filter** (pagination lokal):
- `/debts` - Hutang & Cicilan
- `/subscriptions` - Langganan
- `/goals` - Target Tabungan
- `/recurring` - Transaksi Berulang
- `/budgets` - Budget (+ tambah field `account_id`)
- `/reminders` - Pengingat (computed)

**Server-side pagination** (skip untuk sekarang, perlu perubahan server):
- `/gold` - Tabungan Emas
- `/receivables` - Piutang

## Implementation

Pattern dari `reports.tsx`:
1. Route config: `validateSearch: validateReportSearch`
2. Component: `useNavigate` + `Route.useSearch()`
3. Filter data: `filtered = data.filter(d => !search.account || d.account_id === search.account)`
4. UI: `<WalletFilter>` setelah `PageHeader`
5. Pagination: `useClientPage(filtered, ...)`

Budgets dapat field `account_id` opsional di form (half).

## Consequences

**Positif**:
- Konsistensi dengan Laporan/Rekap
- Mudah melihat entitas per dompet
- Tidak butuh perubahan backend untuk client-side pages

**Negatif**:
- Gold/receivables perlu loaderDeps + server query changes
- Recurring: filter juga `to_account_id` untuk transfer

## Notes

- Reminders: filter `account_id` dari debt/subscription/recurring yang mendasarinya
- Transfer di recurring: cocok jika `account_id` atau `to_account_id` match
