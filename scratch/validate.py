import json

with open('scratch/parsed_rulebook.json', encoding='utf-8') as f:
    events = json.load(f)

for ev in events:
    coords = [c for c in ev['coordinators'] if 'name' in c]
    print(f"{ev['number']}. {ev['title']} ({ev['date']}) - {len(ev['rules'])} rules, {len(ev['faculty'])} faculty, {len(coords)} coords: {', '.join([c['name'] for c in coords])}")
