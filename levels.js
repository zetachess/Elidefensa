const levels = [
  {
    "id": 1,
    "title": "Ejemplo YouTube 1",
    "fen": "1r3rk1/pp2qpp1/2n1pn2/6N1/3P4/P1N4Q/1P4PP/R4R1K w - - 0 1",
    "firstMove": "Rxf6",
    "pieceName": "caballo de f6",
    "explanation": "El caballo de f6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 2,
    "title": "Elimina la defensa 2",
    "fen": "r2q1rk1/4ppbp/p2p1np1/1p1b4/1P6/P7/1BP1BPPP/1R1QNRK1 w - - 0 15",
    "firstMove": "Bxf6",
    "pieceName": "caballo de f6",
    "explanation": "El caballo de f6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 3,
    "title": "Elimina la defensa 3",
    "fen": "4r1k1/4bppp/1p2p3/8/1n1P4/B3PPP1/2bR3P/R5K1 w - - 0 30",
    "firstMove": "Bxb4",
    "pieceName": "caballo de b4",
    "explanation": "El caballo de b4 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 4,
    "title": "Elimina la defensa 4",
    "fen": "r2qr1k1/pp3ppp/8/1P1p1n2/P1pPb3/2P1PB2/1B4PP/R2Q1RK1 w - - 0 20",
    "firstMove": "Bxe4",
    "pieceName": "alfil de e4",
    "explanation": "El alfil de e4 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 5,
    "title": "Elimina la defensa 5",
    "fen": "r4rk1/1p1bbppp/p3pn2/8/2PB4/2N2P2/PP4PP/1K1R1B1R w - - 0 15",
    "firstMove": "Bxf6",
    "pieceName": "caballo de f6",
    "explanation": "El caballo de f6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 6,
    "title": "Elimina la defensa 6",
    "fen": "r4rk1/p1p2pp1/1p2pb1p/3q1n2/3P4/2P2Q1P/PP4P1/R1B1NRK1 w - - 0 20",
    "firstMove": "Qxd5",
    "pieceName": "dama de d5",
    "explanation": "La dama de d5 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 7,
    "title": "Elimina la defensa 7",
    "fen": "8/4k1pp/4pp2/3p4/pbqP4/4P1P1/2N1QPKP/8 w - - 0 32",
    "firstMove": "Qxc4",
    "pieceName": "dama de c4",
    "explanation": "La dama de c4 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 8,
    "title": "Elimina la defensa 8",
    "fen": "4rrk1/1p1n1ppp/p3b3/2p5/3N4/1PP2N1P/P4KP1/R2R4 w - - 0 21",
    "firstMove": "Nxe6",
    "pieceName": "alfil de e6",
    "explanation": "El alfil de e6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 9,
    "title": "Elimina la defensa 9",
    "fen": "r4rk1/ppp2pp1/2np3p/4p1q1/4P1b1/2NP4/PPPQBPPP/1K1R3R w - - 0 12",
    "firstMove": "Qxg5",
    "pieceName": "dama de g5",
    "explanation": "La dama de g5 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 10,
    "title": "Elimina la defensa 10",
    "fen": "5rk1/5ppp/5n2/6NQ/4N3/8/5PPP/6K1 w - - 0 1",
    "firstMove": "Nxf6+",
    "pieceName": "caballo de f6",
    "explanation": "El caballo de f6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 11,
    "title": "Elimina la defensa 11",
    "fen": "r4rk1/pp2bpp1/2n2n1p/1B3q2/3Q3B/2N5/PPP2PPP/R3R1K1 w - - 0 1",
    "firstMove": "Bxc6",
    "pieceName": "caballo de c6",
    "explanation": "El caballo de c6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 12,
    "title": "Elimina la defensa 12",
    "fen": "1rr3k1/3b1p2/3p1np1/3Pb2p/ppB1P2P/1P1K1N2/P7/3R1R1N w - - 0 31",
    "firstMove": "Nxe5",
    "pieceName": "alfil de e5",
    "explanation": "El alfil de e5 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 13,
    "title": "Elimina la defensa 13",
    "fen": "5rk1/pp3p1p/6p1/5b2/8/4PNP1/Pbq2PBP/1R1Q2K1 w - - 0 19",
    "firstMove": "Qxc2",
    "pieceName": "dama de c2",
    "explanation": "La dama de c2 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 14,
    "title": "Elimina la defensa 14",
    "fen": "1r3rk1/pppn1p1p/3qp1p1/1B6/3P4/2P3QP/P1P2PP1/1R3RK1 w - - 0 17",
    "firstMove": "Qxd6",
    "pieceName": "dama de d6",
    "explanation": "La dama de d6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 15,
    "title": "Elimina la defensa 15",
    "fen": "3r1k2/1R1nbppp/8/B1p5/8/4PP2/5P1P/6K1 w - - 0 26",
    "firstMove": "Bxd8",
    "pieceName": "torre de d8",
    "explanation": "La torre de d8 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 16,
    "title": "Elimina la defensa 16",
    "fen": "r3rk2/pp3pp1/2ppb2p/4p3/3PP1n1/1BP3R1/P1PB1PPP/R5K1 w - - 0 17",
    "firstMove": "Bxe6",
    "pieceName": "alfil de e6",
    "explanation": "El alfil de e6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 17,
    "title": "Elimina la defensa 17",
    "fen": "r5k1/pp2nppp/5q2/3p4/3P4/2P2Q1P/PP3PP1/4R1K1 w - - 0 22",
    "firstMove": "Qxf6",
    "pieceName": "dama de f6",
    "explanation": "La dama de f6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 18,
    "title": "Elimina la defensa 18",
    "fen": "5rk1/1R3pp1/1b3r1p/8/1P5P/5RP1/5P2/6K1 w - - 0 37",
    "firstMove": "Rxf6",
    "pieceName": "torre de f6",
    "explanation": "La torre de f6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 19,
    "title": "Elimina la defensa 19",
    "fen": "5rk1/pp1bp1b1/2p1p1pp/4n3/5B2/2N5/PPP1BPPP/3R2K1 w - - 0 18",
    "firstMove": "Bxe5",
    "pieceName": "caballo de e5",
    "explanation": "El caballo de e5 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 20,
    "title": "Elimina la defensa 20",
    "fen": "1r4rk/5p1p/p2bq1p1/np1Rp3/4P1QP/2P3R1/PP3PP1/2K2B2 w - - 0 23",
    "firstMove": "Qxe6",
    "pieceName": "dama de e6",
    "explanation": "La dama de e6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 21,
    "title": "Elimina la defensa 21",
    "fen": "r2q1r2/2p3bk/pp1p1npp/3b1p2/5P2/1P3N1P/PBPQB1P1/1R3RK1 w - - 0 20",
    "firstMove": "Bxf6",
    "pieceName": "caballo de f6",
    "explanation": "El caballo de f6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 22,
    "title": "Elimina la defensa 22",
    "fen": "r1bqr1k1/ppp2ppp/2n5/8/1b6/5B2/PP1B1PPP/RN1Q1RK1 w - - 0 13",
    "firstMove": "Bxc6",
    "pieceName": "caballo de c6",
    "explanation": "El caballo de c6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 23,
    "title": "Elimina la defensa 23",
    "fen": "1q2kb1r/2p2pp1/4pn2/8/2N2Pr1/1P2P3/PB1P2bP/R2QK1R1 w Qk - 0 19",
    "firstMove": "Bxf6",
    "pieceName": "caballo de f6",
    "explanation": "El caballo de f6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 24,
    "title": "Elimina la defensa 24",
    "fen": "5rk1/pp3pp1/2n1b2p/4p3/1qP5/1Q2P2P/P2rBPP1/3R1RK1 w - - 0 19",
    "firstMove": "Qxb4",
    "pieceName": "dama de b4",
    "explanation": "La dama de b4 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 25,
    "title": "Elimina la defensa 25",
    "fen": "1k1b4/ppp2pp1/2p2n2/4B2b/8/2N2B2/PP3P1P/6K1 w - - 0 20",
    "firstMove": "Bxf6",
    "pieceName": "caballo de f6",
    "explanation": "El caballo de f6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 26,
    "title": "Elimina la defensa 26",
    "fen": "r2q1rk1/1p1nbppp/p2pb3/4p1N1/4P1n1/2N1B3/PPPQBPPP/R4RK1 w - - 0 12",
    "firstMove": "Nxe6",
    "pieceName": "alfil de e6",
    "explanation": "El alfil de e6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 27,
    "title": "Elimina la defensa 27",
    "fen": "2k3r1/3bnp1Q/5q2/p7/1ppP1pp1/2P5/PP3PP1/R3R1K1 w - - 0 29",
    "firstMove": "Rxe7",
    "pieceName": "caballo de e7",
    "explanation": "El caballo de e7 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 28,
    "title": "Elimina la defensa 28",
    "fen": "rn1qk2r/pp3ppp/2pbpn2/6B1/2B3b1/2NP2Q1/PPP2PPP/R3K1NR w KQkq - 0 10",
    "firstMove": "Bxf6",
    "pieceName": "caballo de f6",
    "explanation": "El caballo de f6 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 29,
    "title": "Elimina la defensa 29",
    "fen": "8/5pk1/4b1pp/4p3/3qP3/3n1PNP/6PK/Q4B2 w - - 0 55",
    "firstMove": "Qxd4",
    "pieceName": "dama de d4",
    "explanation": "La dama de d4 es la pieza defensora que debe eliminarse."
  },
  {
    "id": 30,
    "title": "Elimina la defensa 30",
    "fen": "r4rk1/ppp1qpb1/6pp/4n3/4P1bP/2NBQN2/PPP5/2K3RR w - - 0 17",
    "firstMove": "Nxe5",
    "pieceName": "caballo de e5",
    "explanation": "El caballo de e5 es la pieza defensora que debe eliminarse."
  }
];

window.levels = levels;
