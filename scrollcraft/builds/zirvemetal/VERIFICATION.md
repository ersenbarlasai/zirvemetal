# Doğrulama Raporu

## Otomatik Scroll Taraması

- Masaüstü: 1440 × 900, 13,3 viewport yüksekliği.
- Mobil: 390 × 844, 14 viewport yüksekliği.
- Azaltılmış hareket: 1440 × 900, video indirilmeden poster kullanıldı.
- Act dizisi: `scrub > flow > pan > flow > flow > pin > flow > pin`.
- Ölü kaydırma bulunmadı.
- Hero scrub klibi görünür olduğu her örnekte ilerledi.
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

## Hero Geçiş Yumuşatma Kontrolü

- Hero klibinin playhead takip oranı `0.18` varsayılanından hero'ya özel `0.10` değerine indirildi.
- Orta noktadaki hız farkını belirginleştiren dwell değeri `0.30` değerinden `0.12` değerine indirildi.
- Sayfa uzunluğu değiştirilmedi: masaüstü 13,3 ve mobil 14 viewport yüksekliğinde kaldı.
- 1440 x 900 ve 390 x 844 taramalarında ölü kaydırma oluşmadı, hero klibi görünür olduğu bütün örneklerde ilerledi ve metin kontrastı 4,5:1 sınırını geçti.
