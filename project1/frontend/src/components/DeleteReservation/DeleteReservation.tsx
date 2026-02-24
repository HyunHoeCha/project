"use server"

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export default async function DeleteReservation(formData: FormData) {
    const id = formData.get("id");

    await fetch(`http://localhost:3001/reservations/${id}`, {method: "DELETE"});

    revalidatePath("/reservations");

    redirect("/reservations");
}