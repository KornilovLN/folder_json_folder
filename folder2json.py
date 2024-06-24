#!/usr/bin/env python3

import os
import json
import argparse
from collections import Counter

class DirectoryAnalyzer:
    def __init__(self, source_dir, include_extensions=None):
        self.source_dir = os.path.abspath(source_dir)
        self.ignore_dirs = ['.git'] 
        self.include_extensions = [ext.lower() for ext in (include_extensions or [])]
        self.structure = {"files": {}, "directories": {}}
        self.stats = Counter()

    def analyze(self):
        print("Analyzing directory: {}".format(self.source_dir))
        print("Including extensions: {}".format(self.include_extensions or 'all'))
        self._analyze_directory(self.source_dir, self.structure)

        
    def _analyze_directory(self, directory, current_structure):
        self.stats['directories'] += 1

        try:
            print("Entering directory: {}".format(directory))
            entries = list(os.scandir(directory))
            print("Found {} entries in {}".format(len(entries), directory))
            
            for entry in entries:
                if entry.is_dir():
                    if entry.name in self.ignore_dirs:
                        print(f"Ignoring directory: {entry.path}")
                        continue
                    print("Found subdirectory: {}".format(entry.path))
                    current_structure["directories"][entry.name] = {"files": {}, "directories": {}}
                    self._analyze_directory(entry.path, current_structure["directories"][entry.name])
                else:
                    print("Found file: {}".format(entry.path))
                    file_info = self._analyze_file(entry)
                    if file_info['include']:
                        current_structure["files"][entry.name] = file_info
                        self.stats['files'] += 1
                        self.stats['files_{}'.format(file_info["extension"])] += 1
            
            print("Processed: {}".format(directory))
        except PermissionError:
            print("Permission denied: {}".format(directory))
        except Exception as e:
            print("Error processing {}: {}".format(directory, str(e)))

        # Нет необходимости возвращать result, так как мы изменяем current_structure напрямую



    def _analyze_file(self, file_entry):
        try:
            name, ext = os.path.splitext(file_entry.name)
            extension = ext[1:].lower()
            return {
                "name": name,
                "extension": extension,
                "include": self._should_include(extension),
                "size": file_entry.stat().st_size
            }
        except Exception as e:
            print(f"Error analyzing file {file_entry.path}: {str(e)}")
            return {
                "name": file_entry.name,
                "extension": "",
                "include": False,
                "size": 0
            }


    def _should_include(self, extension):
        if not self.include_extensions:
            return True
        return extension in self.include_extensions

    def save_json(self):
        parent_dir = os.path.dirname(self.source_dir)
        base_name = os.path.basename(self.source_dir)
        json_filename = "{}_analysis.json".format(base_name)
        json_path = os.path.join(parent_dir, json_filename)

        result = {
            "structure": self.structure,
            "stats": self.stats
        }

        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=4)

        print("\nAnalysis complete:")
        print("JSON structure saved to {}".format(json_path))
        print("Total directories: {}".format(self.stats['directories']))
        print("Total files (matching specified extensions): {}".format(self.stats['files']))
        for ext in self.include_extensions:
            print("Files with .{} extension: {}".format(ext, self.stats['files_{}'.format(ext)]))

def main():
    parser = argparse.ArgumentParser(description="Analyze directory structure and create JSON representation.")
    parser.add_argument("source_dir", help="Path to the source directory")
    parser.add_argument("--include", nargs="*", help="List of file extensions to include (if not specified, all files are included)")
    parser.add_argument("--ignore-dirs", nargs="*", default=['.git'], help="List of directories to ignore")
    
    args = parser.parse_args()

    analyzer = DirectoryAnalyzer(args.source_dir, args.include)
    analyzer.ignore_dirs = args.ignore_dirs  # Устанавливаем игнорируемые директории
    analyzer.analyze()
    analyzer.save_json()
    
if __name__ == "__main__":
    main()

