// Import biblioteki do obsługi plików i kryptografii
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const iconv = require("iconv-lite");
const crypto = require("crypto");

// Konfiguracja folderu docelowego dla pliku
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  // Konfiguracja nazwy pliku z zachowaniem oryginalnej nazwy oraz polskich znaków
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = iconv.encode(path.basename(file.originalname, ext), "utf-8");
    // Wygenerowanie hasha na podstawie oryginalnej nazwy pliku
    const hash = crypto.createHash('sha256').update(fileName).digest('hex');
    const hashedFileName = `${hash}${ext}`;
    cb(null, hashedFileName);
    req.hashedFileName = hashedFileName;
  }
});

// Tworzenie instancji Multer z konfiguracją
const upload = multer({
  // Ustawienie sposobu przechowywania przesyłanego pliku
  storage: storage,
  // Ustawienie funkcji filtrującej, która określa, które pliki są dozwolone
  fileFilter: (req, file, cb) => {
    // Lista dozwolonych typów plików
    const allowedFileTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    // Sprawdzenie, czy przesłany plik jest jednym z dozwolonych typów
    if (allowedFileTypes.includes(file.mimetype) && (file.originalname.endsWith('.pdf') || file.originalname.endsWith('.docx'))) {
      // Przekazanie null jako pierwszy argument oznacza brak błędu, a true oznacza, że przesłany plik jest akceptowalny
      cb(null, true);
    } else {
      // Przekazanie nowego obiektu błędu jako pierwszy argument oznacza błąd, a false oznacza, że przesłany plik nie jest akceptowalny
      cb(null, false);
    }
  },
  // Ustawienie limitu rozmiaru pliku na 10 MB
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB expressed in bytes
  }
});

module.exports = {
  upload: upload
};