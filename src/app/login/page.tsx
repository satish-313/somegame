import { Button } from "@/components/ui/button";
import {  login } from "@/lib/crud";
import { redirect } from "next/navigation";

export default async function Login() {
    return (
        <div>
            <form
                className="mt-5"
                action={async (data) => {
                    "use server";
                    await login(data);
                    redirect("/");
                }}
            >
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        className="ml-5"
                        type="text"
                        placeholder="username"
                        name="username"
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        className="ml-5"
                        type="password"
                        placeholder="password"
                        name="password"
                    />
                </div>
                <br />
                <Button type="submit">login</Button>
            </form>
        </div>
    );
}
