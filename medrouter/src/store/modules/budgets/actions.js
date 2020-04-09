export function budgetUpdate(budget) {
  return {
    type: '@budgets/NEW_BUDGET_UPDATE',
    payload: { budget },
  };
}

export function budgetRequest(budget) {
  return {
    type: '@budgets/NEW_BUDGET_REQUEST',
    payload: { budget },
  };
}

export function newBudgetRequestSuccess() {
  return {
    type: '@budgets/NEW_BUDGET_REQUEST_SUCCESS',
  };
}

export function newBudgetRequestFailure() {
  return {
    type: '@budgets/NEW_BUDGET_REQUEST_FAILURE',
  };
}
