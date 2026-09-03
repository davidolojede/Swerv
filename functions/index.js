/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10, region: "europe-west1"});

const {onCall, HttpsError} = require("firebase-functions/https");
const {defineSecret} = require("firebase-functions/params");
const admin = require("firebase-admin");

admin.initializeApp();
const paystackSecret = defineSecret("PAYSTACK_SECRET_KEY");

exports.verifyPayment = onCall({secrets: [paystackSecret]}, async (request) => {
	const {reference, orderId} = request.data || {};
	if (!reference || !orderId) {
		throw new HttpsError("invalid-argument", "Payment reference and order are required.");
	}

	const orderRef = admin.firestore().collection("orders").doc(orderId);
	const orderSnapshot = await orderRef.get();
	if (!orderSnapshot.exists || orderSnapshot.data().status === "paid") {
		throw new HttpsError("not-found", "Order not found or already paid.");
	}

	const response = await fetch(
			`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
			{headers: {Authorization: `Bearer ${paystackSecret.value()}`}},
	);
	const result = await response.json();
	const order = orderSnapshot.data();

	if (!response.ok || result.data?.status !== "success" ||
			result.data.amount !== order.amount || result.data.currency !== "NGN") {
		return {success: false};
	}

	await orderRef.update({
		status: "paid",
		paystackRef: reference,
		amountPaid: result.data.amount,
		paidAt: admin.firestore.FieldValue.serverTimestamp(),
	});
	return {success: true};
});
