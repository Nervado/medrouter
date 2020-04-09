export const docDefinition = {
  content: [
    { text: 'Titulo do documento', fontSize: 20 },
    {
      layout: 'lightHorizontalLines', // optional
      table: {
        headerRows: 1,
        widths: ['*', 'auto', 100, '*'],

        body: [
          ['First', 'Second', 'Third', 'The last one'],
          ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
          ['Val 1', 'Val 2', 'Val 3', 'Val 4'],
        ],
      },
    },
    { text: 'google', link: 'http://google.com', pageBreak: 'before' },
    { qr: 'text in QR', foreground: 'green', background: 'white' },
  ],
  defaultStyle: {
    font: 'Helvetica',
  },
};

export const options = {};

export const fonts = {
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  },
};
