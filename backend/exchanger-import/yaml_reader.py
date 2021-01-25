import yaml
import json


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

        return json.dumps(json_data)

    def get_json_language(self):
        yaml_language = {
            "slug": self.manifest["dublin_core"]["language"]["identifier"],
            "name": self.manifest["dublin_core"]["language"]["title"]
        }

        return yaml_language

    def get_json_book(self):
        mock_book = {
            "slug": "1th",
            "name": "1 Thessalonians",
            "number": 53
        }

        return mock_book

    def get_json_version(self):
        mock_version = {
            "slug": "ulb",
            "name": "unlocked literal bible"
        }

        return mock_version

    def get_json_anthology(self):
        mock_anthology = {
            "slug": "nt",
            "name": "new testament"
        }

        return mock_anthology

    def get_json_mode(self):
        mock_mode = {
            "slug": "verse",
            "name": "verse",
            "type": "SINGLE"
        }

        return mock_mode


test_yaml_file = open(r'/home/dj/PycharmProjects/exchanger_scratch/manifest.yaml')

orature_yaml_converter = OratureYamlConverter(test_yaml_file)
print(orature_yaml_converter.get_json())
