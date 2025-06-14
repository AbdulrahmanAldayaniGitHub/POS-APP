// // import { post } from "../api";
// // import { message } from "antd";

// // const createInvoice = async (cart) => {
// //   if (cart.length === 0) {
// //     message.warning("Cart is empty!");
// //     return;
// //   }

// //   try {
// //     // Sending cart data to backend for invoice generation
// //     const response = await post("/pos/invoice", cart, { responseType: "blob" });

// //     // Handling the response as a downloadable PDF
// //     const blob = new Blob([response.data], { type: "application/pdf" });
// //     const url = window.URL.createObjectURL(blob);
// //     const link = document.createElement("a");
// //     link.href = url;
// //     link.download = "invoice.pdf";
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);

// //     message.success("Invoice downloaded successfully!");
// //   } catch (error) {
// //     message.error("Error generating invoice!");
// //   }
// // };

// // export default createInvoice;



// import { message } from "antd";

// const createInvoice = async (cart) => {
//     if (cart.length === 0) {
//         message.warning("Cart is empty!");
//         return;
//     }

//     try {
//         const response = await fetch("http://localhost:8080/api/pos/invoice", {
//             method: "POST", // ✅ Using POST instead of GET
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(cart), // ✅ Sending cart data
//         });

//         if (!response.ok) {
//             throw new Error("Failed to generate invoice");
//         }

//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = "invoice.pdf";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);

//         message.success("Invoice downloaded successfully!");
//     } catch (error) {
//         console.error("Invoice generation failed", error);
//         message.error("Failed to generate invoice. Check backend.");
//     }
// };

// export default createInvoice;

























import { message } from "antd";

const createInvoice = async (cart) => {
  if (cart.length === 0) {
    message.warning("Cart is empty!");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/pos/invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart), // Custom & standard products sent
    });

    if (!response.ok) {
      throw new Error("Failed to generate invoice");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.success("Invoice downloaded successfully!");
  } catch (error) {
    console.error("Invoice generation failed", error);
    message.error("Failed to generate invoice. Check backend.");
  }
};

export default createInvoice;
