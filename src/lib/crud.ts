import { resolve } from "path/posix";
import connectDB from "./db";
import gameUser from "./model";
import { cookies } from "next/headers";

export type userData = {
    _id: string;
    username: string;
    score: number;
};

export type Iam = {
    users: userData[];
    admin: boolean;
};
export async function addUser(FormData: FormData) {
    await connectDB();

    const username = FormData.get("username");

    const user = new gameUser({
        username: username,
        score: 0,
    });

    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }
}

export async function allUsers(): Promise<Iam> {
    await connectDB();
    const cookiestore = cookies();
    const value = cookiestore.get("session");

    let res: Iam = { users: [], admin: false };

    if (value?.value === "dlkafkdlakflakdflakd") {
        res.admin = true;
    }
    try {
        let users: userData[] = await gameUser.find();
        res.users = [...users];
    } catch (error) {}

    return res;
}

export async function changeScore(data: FormData) {
    await connectDB();
    const uid = data.get("_id");
    const score = data.get("score");

    try {
        await gameUser.findOneAndUpdate(
            { _id: uid },
            {
                score: score,
            }
        );
    } catch (error) {}
}

export async function deleteUser(data: FormData) {
    await connectDB();
    const uid = data.get("_id");

    try {
        await gameUser.deleteOne({ _id: uid });
    } catch (error) {}
}

export async function login(data: FormData) {
    const username = data.get("username");
    const password = data.get("password");

    if (username === "admin" && password === "12345678") {
        cookies().set({
            name: "session",
            value: "dlkafkdlakflakdflakd",
            httpOnly: true,
            path: "/",
            sameSite: "strict",
        });
    }
}
