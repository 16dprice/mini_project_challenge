import yaml
import json
from file_name_parser import get_book

class OratureYamlConverter:

    def __init__(self, yaml_file):
        self.manifest = yaml.load(yaml_file, Loader=yaml.FullLoader)

    def get_content(self):
        json_data = {
            "language": self.get_language(),
            "book": self.get_book(),
            "version": self.get_version(),
            "anthology": self.get_anthology(),
            "mode": self.get_mode()
        }

        return json_data

    def get_language(self):
        yaml_language = {
            "slug": self.manifest["dublin_core"]["language"]["identifier"],
            "name": self.manifest["dublin_core"]["language"]["title"]
        }

        return yaml_language

    def get_book(self):
        book = get_book(self.manifest["projects"][0]["identifier"])
        yaml_book = {
            "slug": book["slug"],
            "name": book["name"],
            "number": book["num"]
        }

        return yaml_book

    def get_version(self):
        yaml_version = {
            "slug": self.manifest["dublin_core"]["identifier"],
            "name": self.manifest["dublin_core"]["title"]
        }

        return yaml_version

    def get_anthology(self):
        book = get_book(self.manifest["projects"][0]["identifier"])
        yaml_anthology = {
            "slug": book["anth"],
            "name": "new testament" if book["anth"] == "nt" else "old testament"
        }

        return yaml_anthology

    def get_mode(self):
        return {
            "slug": "verse",
            "name": "verse",
            "type": "SINGLE"
        }

# test_yaml_file = open(r'E:\miscs\exported\vi-ulb-sng-20210122-1027\manifest.yaml')

# orature_yaml_converter = OratureYamlConverter(test_yaml_file)
# print(orature_yaml_converter.get_json())
