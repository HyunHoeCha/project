"use client"

import { useRouter } from "next/navigation";

export default async function Modal({
    params,
    }: {
    params: Promise<{id:string}>
}) {
    const router = useRouter();
    const { id } = await params;

    return (
        <div className={"modal-backdrop"}>
            <div className={"modal-content"}>
                <h3>예약 상세{id}</h3>

                <button onClick={() => router.back()}>
                    X
                </button>
            </div>
        </div>
    )
}
