# Copyright (c) 2025, Mohd Owaish Khan and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	columns = [
        {"fieldname": "product_name", "label": "Product Name", "fieldtype": "Data"},
        {"fieldname": "stock_quantity", "label": "Quantity", "fieldtype": "Int"},
    ] 
	data = frappe.get_all("Product", filters={"stock_quantity": ["<", 10]}, fields=["product_name", "stock_quantity"])

	return columns, data
