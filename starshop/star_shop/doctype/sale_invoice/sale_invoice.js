// Copyright (c) 2025, Mohd Owaish Khan and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Sale Invoice", {

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
    item: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn]
        console.log(row.item)
        if (row.item) {
            frappe.db.get_doc("Product", row.item)
                .then(doc => {
                    row.rate = doc.selling_price;
                    console.log(row.rate)
                    frappe.model.set_value(cdt, cdn, "rate", doc.selling_price);
                    row.amount = flt(row.rate) * flt(row.quantity);
                    frappe.model.set_value(cdt, cdn, "amount", row.amount);
                    frm.refresh_field("products");
                    calculate_totals(frm);
                });
        }
    }
});

//calculate total quantity and total amount
function calculate_totals(frm) {
    let total_qty = 0;
    let total_amt = 0;
    frm.doc.products.forEach(p => {
        console.log(p.quantity, p.amount)
        total_qty += p.quantity; 
        total_amt += p.amount;
    });

    frm.set_value("total_quantity", total_qty);
    frm.set_value("total_amount", total_amt);
}
