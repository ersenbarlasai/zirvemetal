# Doğrulama Raporu

## Otomatik Scroll Taraması

- Masaüstü: 1440 × 900, 13,3 viewport yüksekliği.
- Mobil: 390 × 844, 14 viewport yüksekliği.
- Azaltılmış hareket: 1440 × 900, statik hero görseli kullanıldı.
- Act dizisi: `pin > flow > pan > flow > flow > pin > flow > pin`.
- Ölü kaydırma bulunmadı.
- Hero statik görseli bütün scroll örneklerinde kararlı kaldı.
- Medya üzerindeki bütün ölçülen metinler en kötü karede 4,5:1 kontrastı geçti.
- Ürün rayı masaüstünde 2020 px gerçek taşma alanına sahipti.
- Instagram iframe'i sayfa açılışında yoktu, oynat düğmesine basıldığında bir kez oluşturuldu.
- Tarayıcı konsolunda site kaynaklı hata veya uyarı bulunmadı.
- JavaScript kapalı mobil kontrolde yedi navigasyon bağlantısı görünür, hero stage normal akışta ve içerik erişilebilir kaldı.

## Design DNA Palet Kontrolü

Ardışık iki hero karesi deterministik olarak ölçüldü. Ortalama renk farkı 0,38 ΔE, en yüksek fark 1,40 ΔE ve kapsama sapması 0,0516 oldu. Kontrol geçti.

## His Kontrolü

| Act | Amaçlanan | Soğuk kaydırmada hissedilen | Sonuç |
|---|---|---|---|
| Hero | Güven ve ölçek | Ölçek | Eşleşti |
| Ürün rayı | Rahatlık | Çeşitlilik | Eşleşti |
| Lojistik | Kontrol | Düzen | Eşleşti |
| Sessizlik | Beklenti | Beklenti | Eşleşti |
| CNC zirvesi | Hayranlık | Hassasiyet | Eşleşti |
| Sektörler | Uygunluk | Kendini konumlandırma | Eşleşti |
| Kapanış | Kararlılık | Doğrudanlık | Eşleşti |

İlk geçişte hero metni parlak bir karede kontrast sınırının altında kaldı ve sayfa 16,5 viewport yüksekliğindeydi. Sol metin kolonuna yerel scrim güçlendirildi, ürün akışı sıkıştırıldı ve CNC bölümü sayfanın en uzun act'i olarak korundu. Son geçişte iki bulgu da giderildi.

## Kapsam Dışı

Gerçek iPhone video kod çözücüsü, Düşük Güç Modu ve fiziksel dokunmatik kaydırma davranışı bu bilgisayardaki başsız Chrome ile doğrulanamaz. Mobil yerleşim ve azaltılmış hareket davranışı Chrome emülasyonunda doğrulandı.

## Hero Görseli ve Scroll Kararlılığı

- Hero görseli `DJI_20260822141027_0217_D.JPG` kaynağından 1920 × 1080 WebP olarak optimize edildi.
- Scroll sırasında video karelerine seek yapan scrub katmanı kaldırıldı; hero sabit pinned fotoğraf olarak çalışıyor.
- Decoder, kare arama ve poster-video geçişi ortadan kalktığı için hero kaynaklı titreşim oluşmuyor.
- Sayfa uzunluğu değiştirilmedi: masaüstü 13,3 ve mobil 14 viewport yüksekliğinde kaldı.
- 1440 x 900 ve 390 x 844 taramalarında ölü kaydırma oluşmadı ve metin kontrastı 4,5:1 sınırını geçti.
