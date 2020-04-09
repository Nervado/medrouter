import produce from 'immer';
import { initialBudget } from '../../helpers/initalStates';

const INITIAL_STATE = {
  loading: false,
  budget: initialBudget,
};

export default function budget(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@budgets/NEW_BUDGET_REQUEST': {
        draft.budget = state.budget;
        draft.loading = true;
        break;
      }
      case '@budgets/NEW_BUDGET_REQUEST_SUCCESS': {
        draft.budget = initialBudget;
        draft.loading = false;
        break;
      }
      case '@budgets/NEW_BUDGET_REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@budgets/NEW_BUDGET_UPDATE': {
        draft.budget = { ...draft.budget, ...action.payload.budget };
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
