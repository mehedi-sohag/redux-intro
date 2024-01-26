// Initial state
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// Reducer function
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      if (action.payload < 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - action.payload,
      };

    default:
      return state;
  }
}

export function deposit(amout, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amout };
  return async function (dispatch, getState) {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=10&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedAmount = data.rates.USD;
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export function withdraw(amout) {
  return { type: "account/withdraw", payload: amout };
}

export function requestLoan(amout, purpose) {
  return { type: "account/requestLoan", payload: { amout, purpose } };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
