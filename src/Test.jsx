import { createSignal } from "solid-js";

export default function Test() {
    const [value, setValue] = createSignal();
    return (
        <>
            <input type="text" onChange={e => setValue(e.target.value)} />
            <h1>{value()}</h1>
        </>
    )
}