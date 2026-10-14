const MORSE = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.",
  H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.",
  Ñ: "--.--", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-",
  5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--",
  ":": "---...", ";": "-.-.-.", "-": "-....-", "(": "-.--.",
  ")": "-.--.-", "@": ".--.-.", "=": "-...-", "'": ".----.", '"': ".-..-."
};

const TEXTO = Object.fromEntries(
  Object.entries(MORSE).map(([letra, codigo]) => [codigo, letra])
);

const textoAMorse = (texto) =>
  texto.toUpperCase().trim().split(/\s+/)
    .map((palabra) => [...palabra].map((c) => MORSE[c]).join(" "))
    .join(" / ");

const morseATexto = (morse) =>
  morse.trim().split(/\s*\/\s*/)
    .map((palabra) => palabra.split(/\s+/).map((c) => TEXTO[c]).join(""))
    .join(" ");

const validarTexto = (texto) => {
  if (!texto.trim()) return "Escribe un texto para convertir.";
  const invalidos = [...new Set(
    [...texto.toUpperCase()].filter((c) => !/\s/.test(c) && !MORSE[c])
  )];
  return invalidos.length
    ? `Caracteres no válidos: ${invalidos.join(" ")}`
    : "";
};

const validarMorse = (morse) => {
  if (!morse.trim()) return "Escribe código morse para convertir.";
  if (/[^.\-/\s]/.test(morse)) {
    return "Solo se permiten puntos, guiones, espacios y / para separar palabras.";
  }
  const malos = [...new Set(
    morse.trim().split(/[\s/]+/).filter((c) => c && !TEXTO[c])
  )];
  return malos.length ? `Códigos no válidos: ${malos.join(" ")}` : "";
};

export { textoAMorse, morseATexto, validarTexto, validarMorse };