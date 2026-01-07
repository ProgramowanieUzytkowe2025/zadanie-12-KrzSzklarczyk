export const STATUS = {
  BRAK: 'Brak – rozruchowy status.',
  MOD_A: 'Zmodyfikowano wartość liczby A.',
  MOD_B: 'Zmodyfikowano wartość liczby B.',
  OBLICZENIA: 'Wykonano obliczenia.',
  PRZYWR: 'Przywrócono historyczny stan.',
};

export const STATUS_ACTIONS = {
  RESET: 'RESET',
  MODIFIED_A: 'MODIFIED_A',
  MODIFIED_B: 'MODIFIED_B',
  CALCULATED: 'CALCULATED',
  RESTORED: 'RESTORED',
};

export function calculatorStatusReducer(state, action) {
  switch (action.type) {
    case STATUS_ACTIONS.RESET:
      return STATUS.BRAK;

    case STATUS_ACTIONS.MODIFIED_A:
      return STATUS.MOD_A;

    case STATUS_ACTIONS.MODIFIED_B:
      return STATUS.MOD_B;

    case STATUS_ACTIONS.CALCULATED:
      return STATUS.OBLICZENIA;

    case STATUS_ACTIONS.RESTORED:
      return STATUS.PRZYWR;

    default:
      return state;
  }
}
