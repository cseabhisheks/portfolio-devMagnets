import { useEffect, useState } from "react";

export default function Log() {
    const [logs, setLogs] = useState([]);

    const fetchlog = async () => {
        try {
            const data = await fetch(`${import.meta.env.VITE_BACKEND}/log`);
            const result = await data.json();
            if (result.success) {
                setLogs(result.data); // <-- store log in state
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchlog();
    }, []);

    return (
        <div className="p-5 text-[antiquewhite]">
            <h1 className="text-2xl font-bold mb-4">Login Logs</h1>

            <table className="border border-gray-500 w-full">
                <thead>
                    <tr className="bg-gray-200 text-black">
                        <th className="border p-2">IP</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Time</th>
                    </tr>
                </thead>

                <tbody>
                    {logs.map((log, i) => (
                        <tr key={i} className="text-center">
                            <td className="border p-2">{log.ip}</td>
                            <td className="border p-2">{log.status}</td>
                            <td className="border p-2">
                                {new Date(log.time).toLocaleString("en-IN")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
