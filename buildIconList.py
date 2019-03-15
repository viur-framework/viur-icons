# -*- coding: utf-8 -*-

__author__ = "Sven Eberth"
__email__ = "se@mausbrand.de"

import os
import json


class BuildIconList(object):
	def __init__(self, folder=".", ignoreFiles=[]):
		self.folder = folder
		self.ignoreFiles = ignoreFiles

	def collect(self):
		icons = {}

		for dirname, dirnames, filenames in os.walk(self.folder):
			for filename in filenames:
				if filename in self.ignoreFiles:
					continue

				name, ext = os.path.splitext(filename)

				icons[name] = {
					"filename": filename,
					"ext": ext,
					"dirname": dirname,
					"path": os.path.join(dirname, filename),
				}

		return icons

	def write(self, file, icons):
		target = open(file, "w")
		target.write(json.dumps(
			icons,
			sort_keys=True,
			indent=2,
		))
		target.close()

	def writeHTML(self, file, icons):
		target = open(file, "w")

		for name, meta in icons.items():
			target.write("""
<div class="list-item" data-name="{name}">
	<img src="{path}" class="list-item-icon">
	<span class="list-item-name">{name}</span>
</div>
""".format(name=name, path=meta.get("path"))
			)

		target.close()


if __name__ == "__main__":
	iconlist = BuildIconList(
		folder="./icons/",
		ignoreFiles=[".git"]
	)
	icons = iconlist.collect()
	iconlist.write("icons.json", icons)
	iconlist.writeHTML("icons.html", icons)
