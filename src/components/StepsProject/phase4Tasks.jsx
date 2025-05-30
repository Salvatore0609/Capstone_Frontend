export const phase4Tasks = [
  {
    id: 11,
    title: "Progettazione Esecutiva",
    steps: [
      {
        id: 27,
        label: "Carica disegni esecutivi con misurazioni e dettagli",
        type: ["file"],
        accept: ".pdf,.dwg",
      },
      {
        id: 28,
        label: "Definisci gli schemi per impianti e strutture",
        type: ["file"],
        accept: ".pdf,.dwg",
      },
    ],
  },
  {
    id: 12,
    title: "Preparazione del Computo Metrico Definitivo",
    steps: [
      {
        id: 29,
        label: "Carica computo metrico definitivo",
        type: ["file"],
        accept: ".xls,.xlsx,.pdf",
      },
      {
        id: 30,
        label: "Note sui preventivi ricevuti dalle imprese",
        type: ["textarea", "file"],
        placeholder: "Inserisci considerazioni o allega documenti…",
        accept: ".pdf",
      },
    ],
  },
  {
    id: 13,
    title: "Scelta dell’Impresa Esecutrice",
    steps: [
      {
        id: 31,
        label: "Carica valutazione e schede imprese selezionate",
        type: ["file"],
        accept: ".pdf,.docx",
      },
      {
        id: 32,
        label: "Stipula del contratto d’appalto",
        type: ["file"],
        accept: ".pdf",
      },
    ],
  },
  {
    id: 14,
    title: "Piano di Sicurezza e Coordinamento (PSC)",
    steps: [
      {
        id: 33,
        label: "Carica documento PSC per il cantiere",
        type: ["file"],
        accept: ".pdf",
      },
      {
        id: 34,
        label: "Nomina del Coordinatore per la Sicurezza",
        type: ["file"],
        accept: ".pdf",
      },
    ],
  },
];
