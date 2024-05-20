import json

def convert_txt_to_json(txt_file_path, json_file_path):
    songs = []

    with open('Music_website/assets/songs/songDB.txt', 'r', encoding='utf-8') as file:
        for line in file:
            # Strip any leading/trailing whitespace and split by comma
            title, artist = line.strip().split(',', 1)
            # Add the song to the list
            songs.append({
                'title': title.strip(),
                'artist': artist.strip()
            })
    
    # Convert the list to JSON format
    with open('Music_website/assets/songs/songDB.json', 'w', encoding='utf-8') as json_file:
        json.dump(songs, json_file, ensure_ascii=False, indent=4)

# Example usage
convert_txt_to_json('musicDB.txt', 'musicDB.json')
