import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";

import {
  decrement,
  increment,
  incrementByAmount,
} from "./store/slices/counterSlice";

export default function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
    </div>
  );
}
