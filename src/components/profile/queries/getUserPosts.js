async function getAllPosts(userProfile) {
    try {
        const res = await fetch(
            `http://localhost:3000/api/content?user_id=${userProfile.id}`,
            {
                next: {
                    revalidate: 0,
                },
            }
        );
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Unable to fetch user posts");
        }
    } catch (error) {
        toast({
            description: error.message,
            variant: "destructive",
        });
    }
}

async function getUserMedia(userProfile) {
    try {
        const res = await fetch(
            `http://localhost:3000/api/content?user_id=${
                userProfile.id
            }&media_url=${true}`,
            {
                next: {
                    revalidate: 0,
                },
            }
        );
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Unable to fetch user media");
        }
    } catch (error) {
        console.log(error);
        toast({
            description: error.message,
            variant: "destructive",
        });
    }
}
async function getUserLikes(userProfile) {
    try {
        const res = await fetch(
            `http://localhost:3000/api/like?user_id=${userProfile.id}`,
            {
                next: {
                    revalidate: 0,
                },
            }
        );
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Unable to fetch user posts");
        }
    } catch (error) {
        console.log(error);
        toast({
            description: error.message,
            variant: "destructive",
        });
    }
}

export const getUserPosts = async (username, view) => {
    async function getuserProfile() {
        try {
            const res = await fetch(
                `http://localhost:3000/api/auth/profile?username=${username}`
            );
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                throw new Error("Unable to fetch user posts");
            }
        } catch (error) {
            console.log(error);
            toast({
                description: error.message,
                variant: "destructive",
            });
        }
    }
    const userProfile = await getuserProfile();
    if (view === "likes") {
        return getUserLikes(userProfile);
    } else if (view === "media") {
        return getUserMedia(userProfile);
    } else {
        return getAllPosts(userProfile);
    }
};
