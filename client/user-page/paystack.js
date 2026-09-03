// Replace this with the public key from Paystack Dashboard > Settings > API Keys.
const PAYSTACK_PUBLIC_KEY = "pk_test_b203234ed4a6cb09f84b8c78c6be92f691174884";

export const startPayment = async (items, totalNaira) => {
  if (!window.PaystackPop) {
    alert("Payment service is unavailable. Please try again.");
    return;
  }

  if (PAYSTACK_PUBLIC_KEY.includes("REPLACE_WITH")) {
    alert("Add your Paystack public key in paystack.js before taking payments.");
    return;
  }

  const email = window.prompt("Enter your email address to continue:");
  if (!email || !email.includes("@")) return;

  try {
    const reference = `swerv-${Date.now()}-${crypto.randomUUID()}`;
    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: Math.round(totalNaira * 100),
      currency: "NGN",
      ref: reference,
      callback: (transaction) => {
        console.log("Paystack payment completed", transaction.reference);
        localStorage.removeItem("cart");
        window.location.href = "./shop.html";
      },
      onClose: () => alert("Payment cancelled.")
    });
    handler.openIframe();
  } catch (error) {
    console.error("Could not create order", error);
    alert("Could not start checkout. Please try again.");
  }
};