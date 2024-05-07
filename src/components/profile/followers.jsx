import { toast } from "../ui/use-toast";
import { Follows as Follower } from "./follows";
export const revalidate = 0;
export async function Followers({ username }) {
    async function getProfile() {
        try {
            const res = await fetch(
                `http://localhost:3000/api/auth/profile?username=${username}`
            );
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                throw new Error("Unable to fetch user details");
            }
        } catch (error) {
            console.log(error);
            toast({
                description: error.message,
                variant: "destructive",
            });
        }
    }
    const user = await getProfile();
    async function getFollowers() {
        try {
            const res = await fetch(
                `http://localhost:3000/api/auth/follows?user_id=${user.id}`
            );
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                throw new Error("Unable to fetch user details");
            }
        } catch (error) {
            console.log(error);
            toast({
                description: error.message,
                variant: "destructive",
            });
        }
    }
    const follow = await getFollowers();
    return (
        <div>
            {follow.map((follow) => {
                const { follower } = follow;
                return <Follower key={follow.id} follows={follower} />;
            })}
        </div>
    );
}
