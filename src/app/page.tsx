import { redirect } from "next/navigation";
import { TrashIcon } from "@radix-ui/react-icons";
import DialogCloseButton from "@/component/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { allUsers, changeScore, deleteUser } from "@/lib/crud";

export default async function Home() {
    const user = await allUsers();

    return (
        <div>
            {user.admin && <DialogCloseButton />}

            <table className="mx-auto mt-5 w-[800px] border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th className="border">Player Name</th>
                        <th className="border">Score</th>
                        {user.admin && <th className="border">remove</th>}
                    </tr>
                </thead>
                <tbody>
                    {user.users.map((u) => (
                        <tr key={u._id}>
                            <td className="border">{u.username}</td>
                            <td className="border">
                                {user.admin === false ? (
                                    <p>{u.score}</p>
                                ) : (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline">
                                                {u.score}
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-80">
                                            <form
                                                action={async (data) => {
                                                    "use server";
                                                    await changeScore(data);
                                                    redirect("/");
                                                }}
                                            >
                                                <div className="grid gap-4">
                                                    <div className="space-y-2">
                                                        score change
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <div className="grid grid-cols-3 items-center gap-4">
                                                            <Label htmlFor="width">
                                                                score
                                                            </Label>
                                                            <Input
                                                                className="col-span-2 h-8"
                                                                name="score"
                                                            />
                                                            <Input
                                                                className="hidden"
                                                                name="_id"
                                                                value={u._id.toString()}
                                                            />
                                                            <Button type="submit">
                                                                change
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </PopoverContent>
                                    </Popover>
                                )}
                            </td>
                            {user.admin && (
                                <td className="border flex justify-center">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button className="bg-red-500">
                                                <TrashIcon />
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-80">
                                            <form
                                                action={async (data) => {
                                                    "use server";
                                                    await deleteUser(data);
                                                    redirect("/");
                                                }}
                                            >
                                                <div className="grid gap-4">
                                                    <div className="space-y-2">
                                                        delete user
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <div className="grid grid-cols-3 items-center gap-4">
                                                            <Input
                                                                className="hidden"
                                                                name="_id"
                                                                value={u._id.toString()}
                                                            />
                                                            <Button type="submit">
                                                                remove
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
