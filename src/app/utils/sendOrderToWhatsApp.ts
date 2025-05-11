import { CartItemInterface } from "@/app/hooks/useCartStore";
import { showConfirm } from "@/app/hooks/useConfirmStore";
import { showPrompt } from "@/app/hooks/usePromptStore"; // Import showPrompt
import { showAlert } from "@/app/hooks/useAlertStore";

export const sendOrderToWhatsApp = (
  items: Array<CartItemInterface>,
  totalCartPrice: number,
  clearCart: () => void
) => {
  showConfirm(
    "Apakah Anda yakin ingin mengirimkan pesanan ini ke **WhatsApp Admin**?",
    () => {
      // onConfirm for showConfirm
      showPrompt(
        "Masukkan **alamat pengiriman**, boleh menggunakan text saja atau link Google Maps yang mengarah ke lokasi anda **(Opsional)** :",
        (address) => {
          // onConfirm for showPrompt (this is where the address is received)
          const phoneNumber = process.env.NEXT_PUBLIC_MERCHANT_PHONE;
          if (!phoneNumber) {
            console.error("Merchant phone number is not defined.");
            // Optionally, show an alert to the user
            showAlert(
              "Nomor telepon penjual tidak tersedia. Pesanan tidak dapat dilanjutkan."
            );
            return;
          }

          const orderDetails = items
            .map((item, index) => {
              const name = item.name.padEnd(20, " ");
              const price = `Rp${item.price.toLocaleString()}`;
              const quantity = item.quantity;
              const subtotal = `Rp${(
                item.price * item.quantity
              ).toLocaleString()}`;

              return (
                `${index + 1}. ${name}\n\n` +
                `   ID Item        : ${item.id}\n` +
                `   Harga          : ${price}\n` +
                `   Jumlah Pesanan : (${quantity})\n` +
                `   Subtotal       : ${subtotal} \n\n\n`
              );
            })
            .join("\n");

          const message = encodeURIComponent(
            [
              "```",
              "🧾 Struk Pemesanan",
              "==============================",
              "",
              orderDetails,
              "",
              "-----------------------------------",
              `Total Biaya Pemesanan : Rp${totalCartPrice.toLocaleString()}`,
              `-----------------------------------${
                address ? `\n\nAlamat Pengiriman :\n${address}\n\n` : ``
              }`,
              "",
              "",
              "Terima kasih 🙏",
              "```",
            ].join("\n")
          );

          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
          window.open(whatsappUrl, "_blank");

          // Clear the cart after sending the order
          clearCart();
        },
        "", // Default value for prompt (optional)
        () => {
          // onCancel for showPrompt (optional)
          showAlert("Batal memasukkan alamat.");
        }
      );
    }
    // onCancel for showConfirm (optional)
    // () => { console.log("Pengguna membatalkan pengiriman pesanan."); }
  );
};
