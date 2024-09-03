import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addUser, } from "@/lib/crud";
import { redirect } from "next/navigation";

export default function DialogCloseButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Player</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Player</DialogTitle>
                </DialogHeader>
                <form
                    action={async (formData) => {
                        "use server";
                        await addUser(formData);
                        redirect("/");
                    }}
                >
                    <div className="flex items-center space-x-3">
                        <div className="grid flex-1 gap-2">
                            <Input
                                type="text"
                                name="username"
                                placeholder="add user"
                            />
                        </div>
                        <Button type="submit" size="sm" className="px-3">
                            <span className="sr-only">Add</span>
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
