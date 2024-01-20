"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useState } from "react";

export function Avatar({ url }) {
    const [uploading, setUploading] = useState(false);
    const supabase = createClientComponentClient();

    const handleUpload = async (e) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error("Select an image to upload");
            }
            const file = e.target.files[0];
            const fileExt = file.name.split(".").pop();
            const filePath = `${uid}-${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file);
            if (uploadError) {
                throw uploadError;
            }
        } catch (error) {
            alert(error);
        } finally {
            setUploading(false);
        }

        const file = e.target.files[0];
    };
    return (
        <div>
            {url ? (
                <div className="w-12 h-12 rounded-full border bg-blue-500">
                    <Image
                        src={url}
                        alt="profile-image"
                        width={150}
                        height={150}
                    />
                </div>
            ) : (
                <div className="w-12 h-12 rounded-full border bg-blue-500"></div>
            )}
            <label htmlFor="avatar">
                {uploading ? "Uploading..." : "Upload"}
            </label>
            <input
                type="file"
                id="avatar"
                accept="image/*"
                disabled={uploading}
                onChange={handleUpload}
            />
        </div>
    );
}
