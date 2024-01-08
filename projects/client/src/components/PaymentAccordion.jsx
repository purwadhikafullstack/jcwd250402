import React from "react";
import { Accordion } from "@mantine/core";

export default function PaymentAccordion() {
  const paymentOptions = [
    {
      title: "ATM BCA",
      content: (
        <div>
          <ol>
            <li>1. Masukkan Kartu ATM & PIN </li>
            <li>
              2. Pilih Menu Transaksi Lainnya &gt; Transfer &gt; ke Rekening BCA
              Virtual Account{" "}
            </li>
            <li>
              3. Masukkan 5 angka kode perusahaan dan nomor HP yang terdaftar di
              akun anda
            </li>
            <li>
              4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai{" "}
            </li>
            <li>5. Masukkan Jumlah Transfer sesuai dengan Total Tagihan </li>
            <li>6. Ikuti transaksi untuk menyelesaikan transaksi </li>
            <li>7. Simpan struk transaksi sebagai bukti pembayaran </li>
          </ol>
        </div>
      ),
    },
    {
      title: "m-BCA (BCA Mobile)",
      content: (
        <div>
          <ol>
            <li>1. Masukkan Kartu ATM & PIN </li>
            <li>
              2. Pilih Menu Transaksi Lainnya &gt; Transfer &gt; ke Rekening BCA
              Virtual Account{" "}
            </li>
            <li>
              3. Masukkan 5 angka kode perusahaan dan nomor HP yang terdaftar di
              akun anda
            </li>
            <li>
              4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai{" "}
            </li>
            <li>5. Masukkan Jumlah Transfer sesuai dengan Total Tagihan </li>
            <li>6. Ikuti transaksi untuk menyelesaikan transaksi </li>
            <li>7. Simpan struk transaksi sebagai bukti pembayaran </li>
          </ol>
        </div>
      ),
    },
    {
      title: "Internet Banking BCA",
      content: (
        <div>
          <ol>
            <li>1. Masukkan Kartu ATM & PIN </li>
            <li>
              2. Pilih Menu Transaksi Lainnya &gt; Transfer &gt; ke Rekening BCA
              Virtual Account{" "}
            </li>
            <li>
              3. Masukkan 5 angka kode perusahaan dan nomor HP yang terdaftar di
              akun anda
            </li>
            <li>
              4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai{" "}
            </li>
            <li>5. Masukkan Jumlah Transfer sesuai dengan Total Tagihan </li>
            <li>6. Ikuti transaksi untuk menyelesaikan transaksi </li>
            <li>7. Simpan struk transaksi sebagai bukti pembayaran </li>
          </ol>
        </div>
      ),
    },
    {
      title: "Kantor Bank BCA",
      content: (
        <div>
          <ol>
            <li>1. Masukkan Kartu ATM & PIN </li>
            <li>
              2. Pilih Menu Transaksi Lainnya &gt; Transfer &gt; ke Rekening BCA
              Virtual Account{" "}
            </li>
            <li>
              3. Masukkan 5 angka kode perusahaan dan nomor HP yang terdaftar di
              akun anda
            </li>
            <li>
              4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai{" "}
            </li>
            <li>5. Masukkan Jumlah Transfer sesuai dengan Total Tagihan </li>
            <li>6. Ikuti transaksi untuk menyelesaikan transaksi </li>
            <li>7. Simpan struk transaksi sebagai bukti pembayaran </li>
          </ol>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Accordion>
        {paymentOptions.map((item) => (
          <Accordion.Item key={item.title} value={item.title}>
            <Accordion.Control>{item.title}</Accordion.Control>
            <Accordion.Panel>{item.content}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
