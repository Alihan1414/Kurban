# TopClean: İnternette Yayına Alma Rehberi (Deployment) 🚀

Sitenizin Google'da çıkması için öncelikle bilgisayarınızdaki bu dosyaları herkesin erişebileceği bir sunucuya (hosting) yüklemeniz gerekir. İşte en hızlı ve kolay 2 yöntem:

## Seçenek 1: Vercel (En Hızlısı)

Vercel, bu tarz projeler için dünyanın en popüler ücretsiz platformudur.

1.  **Siteye Git**: [vercel.com](https://vercel.com) adresine girin ve bir hesap oluşturun.
2.  **Upload (Yükleme)**: Masaüstündeki `web` klasörünü sürükleyip Vercel'in ana sayfasına bırakabilirsiniz (veya GitHub hesabınızı bağlayabilirsiniz).
3.  **İsim Belirle**: Projenize `topclean` ismini verin.
4.  **Bitti!**: Sana `topclean.vercel.app` gibi bir adres verecek. Artık bu adresi herkese gönderebilirsin!

---

## Seçenek 2: Netlify (Daha Sade)

1.  **Siteye Git**: [netlify.com](https://netlify.com) adresine girin.
2.  **Drop Zone**: [app.netlify.com/drop](https://app.netlify.com/drop) sayfasına gidin.
3.  **Sürükle-Bırak**: `web` klasörünü buraya sürükleyin.
4.  **Domain Seç**: Site ayarlarına girerek ismini `topclean-denetim.netlify.app` gibi değiştirebilirsin.

---

## 🔍 Google'da Çıkma (Search Console)

Siten yayına girdikten sonra Google'ın seni daha hızlı bulması için:

1.  [Google Search Console](https://search.google.com/search-console/) adresine girin.
2.  Yayınladığın site adresini (URL) buraya kaydedin.
3.  "URL Denetimi" kısmına sitenin adresini yapıştırıp "Dizine Eklenmesini İste" deyin.

---

### [!] Dikkat Edilmesi Gerekenler
*   **Veriler**: Şu an veriler "LocalStorage"da olduğu için herkes kendi verisini görür. Gerçek zamanlı ortak veri için bir sonraki adımda bir Bulut Veritabanı (Firebase) kurabiliriz.
*   **SSL**: Vercel ve Netlify otomatik olarak `https://` (Güvenli Bağlantı) sağlar, bu Google için çok değerlidir.

Başka bir platformda yayınlamak istersen (kendi sunucun vb.) bana söylemen yeterli!
