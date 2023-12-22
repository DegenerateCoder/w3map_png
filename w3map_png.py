import os
import sys
from PIL import Image


def get_max_scale_path(path: str) -> str:
    scales_dirs = os.listdir(path)
    max_scale = scales_dirs.pop()
    return os.path.join(path,max_scale)

def get_tiles(y_path: str) -> list[str]:
    paths = [file for file in os.listdir(y_path) if os.path.isfile(os.path.join(y_path, file))]
    paths = sorted(paths, key=lambda x: int(x.split('.')[0]))
    return [os.path.join(y_path, path) for path in paths]

def generate_map(path: str, map_name: str):
    print(f"Generating map: {map_name}")
    max_scale_path = get_max_scale_path(path)
    map_tiles_paths = os.listdir(max_scale_path)
    map_tiles_paths = sorted(map_tiles_paths, key=lambda x: int(x))
    
    tiles_paths: list[list[str]] = []
    for x in map_tiles_paths:
        y_path = os.path.join(max_scale_path,x)
        tiles_paths.append(get_tiles(y_path))

    x_size = len(tiles_paths)
    y_size = len(tiles_paths[0])
    map_image = Image.new('RGB', (0, 0))
    for y in range(y_size-1,0,-1):
        map_image_y = Image.new('RGB', (0, 0))
        for x in range(x_size):
            map_image_y = combine_images_x(map_image_y,tiles_paths[x][y])
        map_image = combine_images_y(map_image,map_image_y)

    map_path = f"{map_name}.png"
    print(f"Saving map to {map_path}")
    map_image.save(map_path)


def combine_images_x(image1: Image.Image, image2_path: str) -> Image.Image:
    image2 = Image.open(image2_path)

    width1, height1 = image1.size
    width2, height2 = image2.size

    total_width = width1 + width2
    max_height = max(height1, height2)

    new_image = Image.new('RGB', (total_width, max_height))
    new_image.paste(image1, (0, 0))
    new_image.paste(image2, (width1, 0))

    return new_image

def combine_images_y(image1: Image.Image, image2: Image.Image) -> Image.Image:
    width1, height1 = image1.size
    width2, height2 = image2.size

    total_height = height1 + height2
    max_width = max(width1,width2)

    new_image = Image.new('RGB', (max_width, total_height))
    new_image.paste(image1, (0, 0))
    new_image.paste(image2, (0, height1))

    return new_image


def main() -> int:
    maps_dirs_path = './witcher3map/files/maps/'
    maps_dirs = os.listdir(maps_dirs_path)
    for map_dir in maps_dirs:
        generate_map(maps_dirs_path+map_dir, map_dir)

    return 0

if __name__ == '__main__':
    sys.exit(main())
