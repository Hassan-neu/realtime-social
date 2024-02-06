"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
export const useCreateMedia = () => {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [mediaSrc, setMediaSrc] = useState("");
    const [mediaFile, setMediaFile] = useState("");
    const supabase = createClientComponentClient();
    const mediaInput = useRef();
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });
    function handleChange(e) {
        setContent(e.target.value);
    }
    const onCancel = () => {
        setMediaFile("");
        setMediaSrc("");
        mediaInput.current.value = "";
    };
    const handlePost = async ({ reply_to }) => {
        try {
            setLoading(true);
            if (mediaFile) {
                const fileExt = mediaFile.name.split(".").pop();
                const filePath = `${Math.ceil(
                    Math.random() * 100
                )}-${Date.now()}.${fileExt}`;
                const { error } = await supabase.storage
                    .from("media")
                    .upload(filePath, mediaFile);
                if (error) {
                    throw error;
                }
                const res = await fetch("/api/content/", {
                    method: "POST",
                    body: JSON.stringify({
                        content,
                        reply_to,
                        media_url: filePath,
                    }),
                });
                const post = await res.json();
                console.log(post);
            } else {
                const res = await fetch("/api/content/", {
                    method: "POST",
                    body: JSON.stringify({ content, reply_to }),
                });
                const post = await res.json();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setContent("");
            onCancel();
        }
    };
    const importMedia = (e) => {
        e.preventDefault();
        if (!e.target.files[0] || e.target.files.length === 0) {
            return;
        }
        const file = e.target.files[0];
        setMediaFile(file);
        console.log(file.name);
        setMediaSrc(URL.createObjectURL(file));
    };
    useEffect(() => {
        const setImageSize = (imageUrl) => {
            const img = new window.Image();
            img.src = imageUrl;
            img.onload = () => {
                setSize({ height: img.height, width: img.width });
            };
        };
        if (mediaSrc) setImageSize(mediaSrc);
    }, [mediaSrc]);

    return {
        mediaSrc,
        size,
        content,
        loading,
        mediaFile,
        supabase,
        mediaInput,
        importMedia,
        setMediaFile,
        setMediaSrc,
        handleChange,
        handlePost,
        onCancel,
    };
};
