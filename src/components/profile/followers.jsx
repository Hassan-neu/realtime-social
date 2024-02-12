import Follower from "./follower";

export default async function Followers({ username }) {
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
    async function getFollowers() {
        try {
            const res = await fetch(
                `http://localhost:3000/api/auth/follows?user_id=${user.id}`
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
    const follow = await getFollowers();
    return (
        <div>
            {follow.map((follow) => {
                const { follower } = follow;
                return <Follower key={follow.id} follower={follower} />;
            })}
        </div>
    );
}
