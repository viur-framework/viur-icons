#!/usr/bin/python3

__author__ = "Sven Eberth"
__email__ = "se@mausbrand.de"

import json
import os
from collections import OrderedDict
from typing import Dict, List, Union


class BuildIconList(object):
	def __init__(self, folder: str = ".", ignoreFiles: Union[None, List] = None):
		self.folder: str = folder
		self.ignoreFiles: List = ignoreFiles or []
		self.icons: Dict[str, Dict[str, str]] = {}

	def collect(self, clear: bool = True):
		if clear:
			self.icons: Dict[str, Dict[str, str]] = {}

		for dirname, dirnames, filenames in os.walk(self.folder):
			for filename in filenames:
				if filename in self.ignoreFiles:
					continue

				name, ext = os.path.splitext(filename)

				self.icons[name] = {
					"filename": filename,
					"ext": ext,
					"dirname": dirname,
					"path": os.path.join(dirname, filename),
				}

	def generateJSON(self) -> str:
		return json.dumps(
			self.icons,
			sort_keys=True,
			indent=2,
		)

	def generateHTML(self) -> str:
		html: str = ""
		icons = OrderedDict(sorted(self.icons.items()))
		for name, meta in icons.items():
			with open(meta.get("path"), 'rb') as f:
				svg = f.read().decode('utf-8')
				svg = svg.replace("<svg ", """<svg class="icon list-item-icon" """)

			html += """
<div class="list-item is-active" data-name="{name}">
	{svg}
	<span class="list-item-name">{name}</span>
</div>
""".format(name=name, path=meta.get("path"), svg=svg)

		return html


if __name__ == "__main__":
	iconList = BuildIconList(
		folder="./icons/",
		ignoreFiles=[".git", ".gitignore", "README.md", "LICENSE", "deploy.yaml"]
	)
	iconList.collect()

	templateFH = open("index_template.html", "rb")
	template = templateFH.read().decode('utf-8')
	templateFH.close()

	content = template.replace("{{ icons }}", iconList.generateHTML())

	target = open("index.html", "w")
	target.write(content)
	target.close()
