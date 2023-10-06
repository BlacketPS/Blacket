import { useEffect, useState } from "react";
import axios from "axios";
import Background from "@components/Background";

export default function Test() {
    const [thing, setThing] = useState("Loading...");

    useEffect(() => {
        axios.get("/api/test2").then(res => setThing(res.data));
    }, []);

    return (
        <>
            <Background color="#4f4f4f" opacity={0.1} />

            {thing}
        </>
    )
}