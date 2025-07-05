# Copyright (c) 2025, Mohd Owaish Khan and contributors
# For license information, please see license.txt
import frappe
from frappe.model.document import Document

class PurchaseInvoice(Document):
	def validate(self):
		self.calculate_totals()

	def calculate_totals(self):
		total_qty = 0
		total_amt = 0

		for item in self.product:
			item.amount = item.quantity * item.rate
			total_qty += item.quantity
			total_amt += item.amount

		self.total_quantity = total_qty
		self.total_amount = total_amt

	def on_submit(self):
		for item in self.product:
			product = frappe.get_doc("Product", item.item)
			product.purchase_price = item.rate
			product.stock_quantity += item.quantity
			product.save()