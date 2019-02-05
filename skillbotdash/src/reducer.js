const initialState = {
  data: [],
  isFetching: false,
  error: "",
  isToggled: false,
  filtered: "",
  skill_filtered:"",
  skillCountArray:[]
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE":
      {
        return {
          ...state,
          isToggled: !state.isToggled
        };
      }

      break;
      case "LOAD_SKILL_COUNT_ARRAY":
      {
        return {
          ...state,
          skillCountArray: action.payload
        };
      }

      break;
    case "FETCH_DATA":
      {
        return {
          ...state,
          isFetching: true
        };
      }
      break;
      case "FILTER":
      {
        return {
          ...state,
          filtered: action.payload
        };
      }
      break;
      case "SKILL_FILTER":
      {
        return {
          ...state,
          skill_filtered: action.payload
        };
      }
      break;
    case "LOAD_DATA":
      {
        return {
          ...state,
          data: action.payload,
          isFetching: false
        };
      }
      break;
    case "FETCHING_DATA_FAILED":
      {
        console.warn("failed to fetch!");
        return {
          ...state,
          data: [],
          isFetching: false,
          error: action.payload.reason.message
        };
      }
      break;

    default: {
      console.log("Unhandled action", action.type);
      return state;
    }
  }
};
