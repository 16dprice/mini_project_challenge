import yaml
import json
from file_name_parser import get_book

class OratureYamlConverter:

    def __init__(self, yaml_file):
        self.manifest = yaml.load(yaml_file, Loader=yaml.FullLoader)

    def get_json(self):
        json_data = {
            "language": self.get_json_language(),
            "book": self.get_json_book(),
            "version": self.get_json_version(),
            "anthology": self.get_json_anthology(),
            "mode": self.get_json_mode()
        }

        return json_data

    def get_json_language(self):
        yaml_language = {
            "slug": self.manifest["dublin_core"]["language"]["identifier"],
            "name": self.manifest["dublin_core"]["language"]["title"]
        }

        return yaml_language

    def get_json_book(self):
        book = get_book(self.manifest["projects"][0]["identifier"])
        yaml_book = {
            "slug": book["slug"],
            "name": book["name"],
            "number": book["num"]
        }

        return yaml_book

    def get_json_version(self):
        yaml_version = {
            "slug": self.manifest["dublin_core"]["identifier"],
            "name": self.manifest["dublin_core"]["title"]
        }

        return yaml_version

    def get_json_anthology(self):
        book = get_book(self.manifest["projects"][0]["identifier"])
        yaml_anthology = {
            "slug": book["anth"],
            "name": "new testament" if book["anth"] == "nt" else "old testament"
        }

        return yaml_anthology

    def get_json_mode(self):
        return {
            "slug": "verse",
            "name": "verse",
            "type": "SINGLE"
        }


# test_yaml_file = open(r'E:\miscs\exported\vi-ulb-sng-20210122-1027\manifest.yaml')

# orature_yaml_converter = OratureYamlConverter(test_yaml_file)
# print(orature_yaml_converter.get_json())
