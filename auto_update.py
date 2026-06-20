import requests, json, os
from datetime import datetime, timezone

SUMBER = [
  {"url":"https://api.mangadex.org/manga?includedTagsMode=AND&availableTranslatedLanguage[]=id&limit=20","tipe":"MANGA"},
  {"url":"https://api.comick.io/chapter?lang=id&limit=20","tipe":"MANHWA"}
]
PATH = "data/komik.json"
with open(PATH,"r",encoding="utf-8") as f: db = json.load(f)
db["metadata"]["diperbarui"] = datetime.now(timezone.utc).isoformat()
for s in SUMBER:
  try:
    r = requests.get(s["url"], timeout=15).json()
    print(s["tipe"], "=>", len(r.get("data",[])))
  except Exception as e: print("err",e)
with open(PATH,"w",encoding="utf-8") as f:
  json.dump(db,f,ensure_ascii=False,indent=2)
print("✅ Update selesai")