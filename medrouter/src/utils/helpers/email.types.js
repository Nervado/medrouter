export const EmailTypes = ['financial', 'budgets', 'general', 'complaint'];
export const EmailTypesPt = [
  'Financeiro',
  'Orçamentos',
  'Outros',
  'Reclamações',
];

export const getEmailType = type => {
  const search = [];

  EmailTypesPt.filter((el, i) =>
    el === type ? search.push(EmailTypes[i]) : null,
  );

  return search[0];
};
