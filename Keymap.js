const { uIOhook, UiohookKey } = require('uiohook-napi');

const keyMap = {
  // Letras minúsculas (sin Shift)
  'a': UiohookKey.A, 'b': UiohookKey.B, 'c': UiohookKey.C,
  'd': UiohookKey.D, 'e': UiohookKey.E, 'f': UiohookKey.F,
  'g': UiohookKey.G, 'h': UiohookKey.H, 'i': UiohookKey.I,
  'j': UiohookKey.J, 'k': UiohookKey.K, 'l': UiohookKey.L,
  'm': UiohookKey.M, 'n': UiohookKey.N, 'o': UiohookKey.O,
  'p': UiohookKey.P, 'q': UiohookKey.Q, 'r': UiohookKey.R,
  's': UiohookKey.S, 't': UiohookKey.T, 'u': UiohookKey.U,
  'v': UiohookKey.V, 'w': UiohookKey.W, 'x': UiohookKey.X,
  'y': UiohookKey.Y, 'z': UiohookKey.Z,

  // Letras mayúsculas (con Shift) — mismo código, se presiona Shift aparte
  'A': UiohookKey.A, 'B': UiohookKey.B, 'C': UiohookKey.C,
  'D': UiohookKey.D, 'E': UiohookKey.E, 'F': UiohookKey.F,
  'G': UiohookKey.G, 'H': UiohookKey.H, 'I': UiohookKey.I,
  'J': UiohookKey.J, 'K': UiohookKey.K, 'L': UiohookKey.L,
  'M': UiohookKey.M, 'N': UiohookKey.N, 'O': UiohookKey.O,
  'P': UiohookKey.P, 'Q': UiohookKey.Q, 'R': UiohookKey.R,
  'S': UiohookKey.S, 'T': UiohookKey.T, 'U': UiohookKey.U,
  'V': UiohookKey.V, 'W': UiohookKey.W, 'X': UiohookKey.X,
  'Y': UiohookKey.Y, 'Z': UiohookKey.Z,

  // Números
  '0': UiohookKey['0'], '1': UiohookKey['1'], '2': UiohookKey['2'],
  '3': UiohookKey['3'], '4': UiohookKey['4'], '5': UiohookKey['5'],
  '6': UiohookKey['6'], '7': UiohookKey['7'], '8': UiohookKey['8'],
  '9': UiohookKey['9'],

  // Especiales
  'Enter': UiohookKey.Enter,
  'Escape': UiohookKey.Escape,
  'Backspace': UiohookKey.Backspace,
  'Tab': UiohookKey.Tab,
  ' ': UiohookKey.Space,          // event.key para espacio es " "
  'Delete': UiohookKey.Delete,
  'Insert': UiohookKey.Insert,
  'Home': UiohookKey.Home,
  'End': UiohookKey.End,
  'PageUp': UiohookKey.PageUp,
  'PageDown': UiohookKey.PageDown,

  // Flechas
  'ArrowUp': UiohookKey.Up,
  'ArrowDown': UiohookKey.Down,
  'ArrowLeft': UiohookKey.Left,
  'ArrowRight': UiohookKey.Right,

  // Modificadores
  'Shift': UiohookKey.Shift,
  'Control': UiohookKey.Ctrl,
  'Alt': UiohookKey.Alt,
  'Meta': UiohookKey.Meta,

  // Teclas de función
  'F1': UiohookKey.F1, 'F2': UiohookKey.F2, 'F3': UiohookKey.F3,
  'F4': UiohookKey.F4, 'F5': UiohookKey.F5, 'F6': UiohookKey.F6,
  'F7': UiohookKey.F7, 'F8': UiohookKey.F8, 'F9': UiohookKey.F9,
  'F10': UiohookKey.F10, 'F11': UiohookKey.F11, 'F12': UiohookKey.F12,

  // Signos de puntuación (teclado US)
  '.': UiohookKey.Period,
  ',': UiohookKey.Comma,
  ';': UiohookKey.Semicolon,
  "'": UiohookKey.Quote,
  '/': UiohookKey.Slash,
  '\\': UiohookKey.Backslash,
  '[': UiohookKey.BracketLeft,
  ']': UiohookKey.BracketRight,
  '-': UiohookKey.Minus,
  '=': UiohookKey.Equal,
  '`': UiohookKey.Backquote,
};

module.exports = keyMap;