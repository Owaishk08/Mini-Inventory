// Copyright (c) 2025, Mohd Owaish Khan and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Purchase Invoice", {

// });

frappe.ui.form.on("Purchase Invoice Product", {
    quantity: function(frm, cdt, cdn) {
        // calculate_row_amount(frm, cdt, cdn);
        let row = locals[cdt][cdn]
        console.log("qty",row.rate)
        row.amount = row.quantity * row.rate;
        frm.refresh_field("amount")
        calculate_totals(frm)
    },
    rate: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn]
        row.amount = row.quantity * row.rate;
        frm.refresh_field("amount")
        console.log("rate",row.rate)
        calculate_totals(frm)
    }
});

// calculate total quantity and total amount
function calculate_totals(frm) {
    let total_qty = 0;
    let total_amt = 0;
    frm.doc.product.forEach(p => {
        console.log(p.quantity, p.amount)
        total_qty += p.quantity; 
        total_amt += p.amount;
    });

    frm.set_value("total_quantity", total_qty);
    frm.set_value("total_amount", total_amt);
}
