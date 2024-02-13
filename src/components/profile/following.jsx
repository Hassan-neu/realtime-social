import { Follows as Following } from "./follows";
export const revalidate = 0;
export async function Followings({ username }) {
    async function getProfile() {
        try {
            const res = await fetch(
                `http://localhost:3000/api/auth/profile?username=${username}`
            );
            if (res.ok) {
                const data = await res.json();
                return data;
            }
        } catch (error) {
            console.log(error);
            throw new Error("Unable to fetch user profile");
        }
    }
    const user = await getProfile();
    async function getFollowing() {
        try {
            const res = await fetch(
                `http://localhost:3000/api/auth/follows?follower_id=${user.id}`
            );
            if (res.ok) {
                const data = await res.json();
                return data;
            }
        } catch (error) {
            console.log(error);
            throw new Error("Unable to fetch user profile");
        }
    }
    const follow = await getFollowing();
    return (
        <div>
            {follow.map((follow) => {
                const { following } = follow;
                return <Following key={follow.id} follows={following} />;
            })}
        </div>
    );
}
