import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers.js";
import thunk from "redux-thunk";

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.log(error);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

const saveStore = loadFromLocalStorage();



const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
