import json
import os
import argparse

"""
Эта программа делает следующее:

1 Принимает путь к JSON-файлу в качестве аргумента командной строки.
2 Читает JSON-файл и извлекает из него структуру.
3 Создает новую директорию new_structure рядом с JSON-файлом.
4 Рекурсивно создает структуру каталогов и файлов внутри new_structure, основываясь на данных из JSON.
5 В каждой созданной директории создает HTML-файл с именем, соответствующим имени директории.

Чтобы использовать эту программу запустите из командной строки:

python json2folder.py /путь/к/вашему/json_файлу.json

Программа создаст новую структуру каталогов и файлов в директории new_structure,
расположенной рядом с указанным JSON-файлом.
"""

def create_structure(structure, base_path):
    """
    Рекурсивно создает структуру каталогов и файлов.
    
    :param structure: Словарь, описывающий структуру
    :param base_path: Базовый путь для создания структуры
    """
    # Создаем файлы
    for file_name, file_info in structure.get("files", {}).items():
        file_path = os.path.join(base_path, file_name)
        with open(file_path, 'w') as f:
            f.write(f"This is a placeholder for {file_name}")
        print(f"Created file: {file_path}")
    
    # Создаем директории и рекурсивно обрабатываем их содержимое
    for dir_name, dir_structure in structure.get("directories", {}).items():
        dir_path = os.path.join(base_path, dir_name)
        os.makedirs(dir_path, exist_ok=True)
        print(f"Created directory: {dir_path}")
        
        # Создаем HTML-файл в каждой директории
        html_file_path = os.path.join(dir_path, f"{dir_name}.html")
        with open(html_file_path, 'w') as f:
            f.write(f"<html><body><h1>{dir_name}</h1></body></html>")
        print(f"Created HTML file: {html_file_path}")
        
        # Рекурсивно обрабатываем содержимое директории
        create_structure(dir_structure, dir_path)

def main():
    parser = argparse.ArgumentParser(description="Create directory structure from JSON file.")
    parser.add_argument("json_path", help="Path to the JSON file")
    args = parser.parse_args()

    # Получаем путь к JSON-файлу и директорию, где он находится
    json_path = os.path.abspath(args.json_path)
    json_dir = os.path.dirname(json_path)

    # Читаем JSON-файл
    with open(json_path, 'r') as f:
        data = json.load(f)

    # Создаем новую директорию рядом с JSON-файлом
    new_structure_dir = os.path.join(json_dir, "new_folder")
    os.makedirs(new_structure_dir, exist_ok=True)
    print(f"Created base directory: {new_structure_dir}")

    # Создаем структуру на основе данных из JSON
    create_structure(data["structure"], new_structure_dir)

    print("Structure creation completed.")

if __name__ == "__main__":
    main()

