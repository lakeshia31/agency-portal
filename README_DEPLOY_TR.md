# Deploy hazır proje

Bu ZIP temizlendi: `node_modules`, `.git`, cache klasörleri ve yerel `.env` dosyaları çıkarıldı.

## Proje tipi

- Frontend: React / Create React App / CRACO
- Backend: FastAPI
- Veritabanı: MongoDB

## 1) GitHub'a yükle

Bu ZIP'i bilgisayarında aç. İçindeki dosyaları yeni bir GitHub reposuna yükle.

## 2) MongoDB Atlas oluştur

Render'daki backend için MongoDB gerekir. Ücretsiz MongoDB Atlas hesabı açıp bir cluster oluştur. Connection string şu formatta olacak:

```txt
mongodb+srv://KULLANICI:SIFRE@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## 3) Backend'i Render'a deploy et

Render > New > Web Service > GitHub repo seç.

Ayarlar:

```txt
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: uvicorn server:app --host 0.0.0.0 --port $PORT
```

Environment Variables:

```txt
MONGO_URL = MongoDB Atlas connection string
DB_NAME = agency_portal
CORS_ORIGINS = *
```

Deploy bitince Render sana şöyle bir backend adresi verir:

```txt
https://agency-portal-backend.onrender.com
```

Test için bu adresi aç:

```txt
https://agency-portal-backend.onrender.com/api/
```

## 4) Frontend'i Vercel'e deploy et

Vercel > Add New Project > aynı GitHub repo.

Ayarlar:

```txt
Root Directory: frontend
Framework Preset: Create React App
Build Command: yarn build
Output Directory: build
```

Environment Variables:

```txt
REACT_APP_BACKEND_URL = Render backend URL'in, örnek: https://agency-portal-backend.onrender.com
```

Sonra Deploy'a bas. Vercel sana canlı site linkini verir.

## Not

Frontend içinde eski Emergent preview adresi vardı. Temiz ZIP'te bu `.env` dosyası kaldırıldı. Vercel'de `REACT_APP_BACKEND_URL` değerini mutlaka Render backend adresin yapmalısın.
