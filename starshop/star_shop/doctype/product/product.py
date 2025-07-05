# Copyright (c) 2025, Mohd Owaish Khan and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Product(Document):
	def validate(self):
		if self.purchase_price and self.stock_quantity:
			self.stock_value = self.purchase_price * self.stock_quantity